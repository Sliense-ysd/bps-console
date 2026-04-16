const mount = document.querySelector("#cron-sections");
const searchInput = document.querySelector("#cron-search");
const taskCount = document.querySelector("#cron-task-count");
const sectionCount = document.querySelector("#cron-section-count");

let state = {
  sections: [],
  fetchedAt: null,
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || `${response.status} ${response.statusText}`);
  }

  return payload;
}

function matches(section, task, search) {
  if (!search) return true;
  return [section.title, section.note, task.label, task.code, task.note, task.repo, task.state]
    .join(" ")
    .toLowerCase()
    .includes(search);
}

function stateLabel(task) {
  if (task.state === "active") return { text: "运行中", tone: "success" };
  if (task.state === "disabled_manually") return { text: "已关闭", tone: "warn" };
  if (task.state === "unavailable") return { text: "未接通", tone: "warn" };
  return { text: task.state || "未知", tone: "neutral" };
}

async function copyText(text, button) {
  try {
    await navigator.clipboard.writeText(text);
    const original = button.textContent;
    button.textContent = "已复制";
    window.setTimeout(() => {
      button.textContent = original;
    }, 1200);
  } catch {
    button.textContent = "复制失败";
  }
}

function buildGhCommand(task, mode) {
  return `gh workflow ${mode} ${task.workflowFile} -R ${task.repo}`;
}

function buildRunCommand(task) {
  return `gh workflow run ${task.workflowFile} -R ${task.repo}`;
}

function renderTaskCard(task) {
  const label = stateLabel(task);
  const canToggle = task.workflowFile && task.repo && task.state !== "unavailable";

  return `
    <article class="task-card" data-task-id="${task.id}">
      <div class="task-card-head">
        <div>
          <span class="tag-code">${escapeHtml(task.code)}</span>
          <strong>${escapeHtml(task.label)}</strong>
        </div>
        <span class="${label.tone === "success" ? "detail-chip success" : label.tone === "warn" ? "detail-chip warn" : "detail-chip"}">${escapeHtml(label.text)}</span>
      </div>
      <p>${escapeHtml(task.note)}</p>
      <p>${escapeHtml(task.repo)}</p>
      ${task.error ? `<div class="task-feedback warn">${escapeHtml(task.error)}</div>` : ""}
      <div class="task-actions">
        <a class="task-link-button" href="${task.workflowUrl}" target="_blank" rel="noreferrer">GitHub 开关 / Runs</a>
        <a class="task-link-button" href="${task.sourceUrl}" target="_blank" rel="noreferrer">查看 YAML</a>
        ${
          canToggle
            ? `
              <button class="task-live-button" data-action="enable" data-task-id="${task.id}" type="button">启用</button>
              <button class="task-live-button" data-action="disable" data-task-id="${task.id}" type="button">停用</button>
              <button class="task-live-button" data-action="run" data-task-id="${task.id}" type="button">立即运行</button>
              <button class="task-command-button" data-copy="${escapeHtml(buildGhCommand(task, "disable"))}" type="button">复制停用命令</button>
              <button class="task-command-button" data-copy="${escapeHtml(buildGhCommand(task, "enable"))}" type="button">复制启用命令</button>
              <button class="task-command-button" data-copy="${escapeHtml(buildRunCommand(task))}" type="button">复制手动运行命令</button>
            `
            : ""
        }
      </div>
      <div class="task-feedback" id="feedback-${task.id}"></div>
    </article>
  `;
}

function render() {
  const search = searchInput.value.trim().toLowerCase();
  const filtered = [];
  let total = 0;

  state.sections.forEach((section) => {
    const tasks = section.tasks.filter((task) => matches(section, task, search));
    if (tasks.length > 0) {
      filtered.push({ ...section, tasks });
      total += tasks.length;
    }
  });

  taskCount.textContent = `${total} 个任务`;
  sectionCount.textContent = `${filtered.length} 个分组`;

  if (filtered.length === 0) {
    mount.innerHTML = `
      <section class="empty-state">
        <h2>没有匹配的任务</h2>
        <p>试试搜 umami、domain、reddit、sitemap、backup。</p>
      </section>
    `;
    return;
  }

  mount.innerHTML = `
    <section class="detail-card control-explainer">
      <div class="card-head">
        <h3>任务开关说明</h3>
        <span>${escapeHtml(state.fetchedAt ? `已同步 ${new Date(state.fetchedAt).toLocaleString("zh-CN")}` : "等待同步")}</span>
      </div>
      <p>
        现在这个页会直接调用站内 API 查询 GitHub Actions workflow 状态，并支持启用、停用和手动触发。
        如果你更习惯终端，右侧仍然保留了一键复制的 <code>gh workflow enable/disable/run</code> 命令。
      </p>
    </section>
    ${filtered
      .map(
        (section) => `
          <section class="tag-group" id="${section.id}">
            <div class="tag-group-head">
              <div>
                <h2>${escapeHtml(section.title)}</h2>
                <p>${escapeHtml(section.note)}</p>
              </div>
              <span class="detail-pill">${section.tasks.length} 个任务</span>
            </div>
            <div class="task-grid">
              ${section.tasks.map((task) => renderTaskCard(task)).join("")}
            </div>
          </section>
        `,
      )
      .join("")}
  `;

  mount.querySelectorAll(".task-command-button").forEach((button) => {
    button.addEventListener("click", () => copyText(button.dataset.copy, button));
  });

  mount.querySelectorAll(".task-live-button").forEach((button) => {
    button.addEventListener("click", () => handleAction(button.dataset.taskId, button.dataset.action, button));
  });
}

function setFeedback(taskId, message, tone = "muted") {
  const node = document.querySelector(`#feedback-${taskId}`);
  if (!node) return;
  node.className = `task-feedback ${tone}`;
  node.textContent = message;
}

async function handleAction(taskId, action, button) {
  const original = button.textContent;
  button.disabled = true;
  button.textContent = "处理中";
  setFeedback(taskId, "");

  try {
    if (action === "run") {
      await requestJson("/api/cron/run", {
        method: "POST",
        body: JSON.stringify({ taskId }),
      });
      setFeedback(taskId, "已触发 workflow_dispatch", "success");
    } else {
      await requestJson("/api/cron/toggle", {
        method: "POST",
        body: JSON.stringify({ taskId, action }),
      });
      setFeedback(taskId, action === "enable" ? "已启用 workflow" : "已停用 workflow", "success");
    }

    await loadTasks();
  } catch (error) {
    setFeedback(taskId, error instanceof Error ? error.message : "请求失败", "warn");
  } finally {
    button.disabled = false;
    button.textContent = original;
  }
}

async function loadTasks() {
  try {
    state = await requestJson("/api/cron/tasks");
    render();
  } catch (error) {
    mount.innerHTML = `
      <section class="empty-state">
        <h2>暂时拿不到任务状态</h2>
        <p>${escapeHtml(error instanceof Error ? error.message : "Unknown error")}</p>
      </section>
    `;
  }
}

searchInput.addEventListener("input", render);
loadTasks();
