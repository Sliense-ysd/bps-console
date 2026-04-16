import http from "node:http";
import { URL } from "node:url";
import { cronSections, cronTasks } from "./cron-tasks.mjs";

const PORT = Number(process.env.PORT || 3001);
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "https://brain.seekorigin.ai";
const CACHE_TTL_MS = 30_000;

const cache = new Map();

function json(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(payload));
}

function cors(res, origin) {
  const allowOrigin = !origin || origin === ALLOWED_ORIGIN || origin.startsWith("http://127.0.0.1");
  if (allowOrigin) {
    res.setHeader("Access-Control-Allow-Origin", origin || ALLOWED_ORIGIN);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }
  return allowOrigin;
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  if (chunks.length === 0) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return {};
  }
}

async function githubRequest(path, { method = "GET", body } = {}) {
  if (!GITHUB_TOKEN) {
    throw new Error("Missing GITHUB_TOKEN");
  }

  const response = await fetch(`https://api.github.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub ${response.status}: ${text}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

async function getWorkflowState(task) {
  const cacheKey = `${task.repo}:${task.workflowFile}:state`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return cached.value;
  }

  const workflow = await getWorkflowDefinition(task);
  const value = {
    id: task.id,
    repo: task.repo,
    workflowFile: task.workflowFile,
    workflowId: workflow.id,
    state: workflow.state || "unknown",
    name: workflow.name || task.label,
    badgeUrl: workflow.badge_url || null,
    htmlUrl: task.workflowUrl,
  };
  cache.set(cacheKey, { at: Date.now(), value });
  return value;
}

async function getWorkflowDefinition(task) {
  const cacheKey = `${task.repo}:workflow-list`;
  const cached = cache.get(cacheKey);
  let workflows;

  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    workflows = cached.value;
  } else {
    const response = await githubRequest(`/repos/${task.repo}/actions/workflows?per_page=100`);
    workflows = response.workflows || [];
    cache.set(cacheKey, { at: Date.now(), value: workflows });
  }

  const workflow = workflows.find((item) => item.path === task.workflowFile || item.path.endsWith(task.workflowFile.split("/").pop()));
  if (!workflow) {
    throw new Error(`Workflow not found in ${task.repo}: ${task.workflowFile}`);
  }
  return workflow;
}

async function listCronTasks() {
  const tasksWithState = await Promise.all(
    cronTasks.map(async (task) => {
      try {
        return {
          ...task,
          ...(await getWorkflowState(task)),
        };
      } catch (error) {
        return {
          ...task,
          state: "unavailable",
          name: task.label,
          htmlUrl: task.workflowUrl,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),
  );

  return cronSections.map((section) => ({
    ...section,
    tasks: tasksWithState.filter((task) => section.tasks.some((source) => source.id === task.id)),
  }));
}

function findTask(taskId) {
  return cronTasks.find((task) => task.id === taskId);
}

const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin;
  const okOrigin = cors(res, origin);
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (!okOrigin) {
    json(res, 403, { error: "Origin not allowed" });
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  try {
    if (req.method === "GET" && url.pathname === "/health") {
      json(res, 200, { ok: true, service: "bps-api" });
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/cron/tasks") {
      const sections = await listCronTasks();
      json(res, 200, { sections, fetchedAt: new Date().toISOString() });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/cron/toggle") {
      const body = await readBody(req);
      const task = findTask(body.taskId);
      if (!task) {
        json(res, 404, { error: "Unknown task" });
        return;
      }

      const action = body.action === "enable" ? "enable" : body.action === "disable" ? "disable" : null;
      if (!action) {
        json(res, 400, { error: "action must be enable or disable" });
        return;
      }

      const workflow = await getWorkflowDefinition(task);
      await githubRequest(`/repos/${task.repo}/actions/workflows/${workflow.id}/${action}`, { method: "PUT" });
      cache.delete(`${task.repo}:${task.workflowFile}:state`);
      cache.delete(`${task.repo}:workflow-list`);
      const state = await getWorkflowState(task);
      json(res, 200, { ok: true, taskId: task.id, state: state.state });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/cron/run") {
      const body = await readBody(req);
      const task = findTask(body.taskId);
      if (!task) {
        json(res, 404, { error: "Unknown task" });
        return;
      }

      const workflow = await getWorkflowDefinition(task);
      await githubRequest(`/repos/${task.repo}/actions/workflows/${workflow.id}/dispatches`, {
        method: "POST",
        body: { ref: task.ref || "main" },
      });
      json(res, 200, { ok: true, taskId: task.id, dispatched: true });
      return;
    }

    json(res, 404, { error: "Not found" });
  } catch (error) {
    console.error("[bps-api]", error);
    json(res, 500, { error: error instanceof Error ? error.message : "Unknown error" });
  }
});

server.listen(PORT, () => {
  console.log(`bps api listening on ${PORT}`);
});
