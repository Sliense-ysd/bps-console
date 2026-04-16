const sections = [
  {
    id: "high-frequency",
    title: "高频任务",
    note: "全天巡航类任务，主要负责流量快报和异常发现。",
    tasks: [
      {
        label: "Umami Monitoring Digest",
        code: "*/30 · 全天每30分钟",
        note: "抓 10 个 repo 的 Umami 数据并发飞书快报。",
        repos: "Sliense-ysd/cron-hub",
        workflowFile: "umami-report.yml",
        workflowUrl: "https://github.com/Sliense-ysd/cron-hub/actions/workflows/umami-report.yml",
        sourceUrl: "https://github.com/Sliense-ysd/cron-hub/blob/main/.github/workflows/umami-report.yml",
      },
    ],
  },
  {
    id: "daily",
    title: "日频任务",
    note: "每天固定时间触发的核心监控。",
    tasks: [
      {
        label: "AIGC Reddit Daily Scan",
        code: "09:00",
        note: "抓 8 个 AIGC Reddit 社区热帖并推送摘要。",
        repos: "Sliense-ysd/cron-hub",
        workflowFile: "aigc-reddit-scan.yml",
        workflowUrl: "https://github.com/Sliense-ysd/cron-hub/actions/workflows/aigc-reddit-scan.yml",
        sourceUrl: "https://github.com/Sliense-ysd/cron-hub/blob/main/.github/workflows/aigc-reddit-scan.yml",
      },
      {
        label: "Sitemap Continuous Validation",
        code: "10:00",
        note: "站点地图持续验证（静态分析 + HTTP 检查）。",
        repos: "Sliense-ysd/actionfigure-generator",
        workflowFile: "sitemap-check.yml",
        workflowUrl: "https://github.com/Sliense-ysd/actionfigure-generator/actions/workflows/sitemap-check.yml",
        sourceUrl: "https://github.com/Sliense-ysd/actionfigure-generator/blob/main/.github/workflows/sitemap-check.yml",
      },
      {
        label: "Anti Abuse Daily Scan",
        code: "11:20",
        note: "每日风控巡检，重点看异常使用模式。",
        repos: "Sliense-ysd/cron-hub",
        workflowFile: "anti-abuse-scan.yml",
        workflowUrl: "https://github.com/Sliense-ysd/cron-hub/actions/workflows/anti-abuse-scan.yml",
        sourceUrl: "https://github.com/Sliense-ysd/cron-hub/blob/main/.github/workflows/anti-abuse-scan.yml",
      },
      {
        label: "Domain Auction Monitor",
        code: "19:00",
        note: "每晚扫描多来源过期/拍卖域名并做 authority 评估。",
        repos: "Sliense-ysd/cron-hub",
        workflowFile: "domain-auction-monitor.yml",
        workflowUrl: "https://github.com/Sliense-ysd/cron-hub/actions/workflows/domain-auction-monitor.yml",
        sourceUrl: "https://github.com/Sliense-ysd/cron-hub/blob/main/.github/workflows/domain-auction-monitor.yml",
      },
      {
        label: "Daily Data Digest",
        code: "21:00",
        note: "生成注册、付费、留存等每日数据汇总。",
        repos: "Sliense-ysd/cron-hub",
        workflowFile: "daily-digest.yml",
        workflowUrl: "https://github.com/Sliense-ysd/cron-hub/actions/workflows/daily-digest.yml",
        sourceUrl: "https://github.com/Sliense-ysd/cron-hub/blob/main/.github/workflows/daily-digest.yml",
      },
      {
        label: "Trend Keyword Scan",
        code: "22:00",
        note: "监控 Google Trends 暴涨关键词。",
        repos: "Sliense-ysd/cron-hub",
        workflowFile: "trend-scan.yml",
        workflowUrl: "https://github.com/Sliense-ysd/cron-hub/actions/workflows/trend-scan.yml",
        sourceUrl: "https://github.com/Sliense-ysd/cron-hub/blob/main/.github/workflows/trend-scan.yml",
      },
      {
        label: "ai-shared Nutstore Backup",
        code: "02:00 (+1)",
        note: "rclone 同步 ai-shared 到坚果云。",
        repos: "Sliense-ysd/cron-hub",
        workflowFile: "github-cron-backup.yml",
        workflowUrl: "https://github.com/Sliense-ysd/cron-hub/actions/workflows/github-cron-backup.yml",
        sourceUrl: "https://github.com/Sliense-ysd/cron-hub/blob/main/.github/workflows/github-cron-backup.yml",
      },
    ],
  },
  {
    id: "event-driven",
    title: "事件驱动任务",
    note: "默认不按 cron 跑，但也是你会频繁回看的监控动作。",
    tasks: [
      {
        label: "Sitemap Competitor Monitor",
        code: "manual",
        note: "竞对 sitemap 手动监控，状态放在 GitHub Release 里。",
        repos: "Sliense-ysd/cron-hub",
        workflowFile: "sitemap-monitor.yml",
        workflowUrl: "https://github.com/Sliense-ysd/cron-hub/actions/workflows/sitemap-monitor.yml",
        sourceUrl: "https://github.com/Sliense-ysd/cron-hub/blob/main/.github/workflows/sitemap-monitor.yml",
      },
      {
        label: "Post-Deploy Search Sync",
        code: "workflow_run",
        note: "部署完成后自动提 sitemap 到 Google / Bing / IndexNow。",
        repos: "Sliense-ysd/nanobanana-pro-org",
        workflowFile: "post-deploy-search-sync.yml",
        workflowUrl: "https://github.com/Sliense-ysd/nanobanana-pro-org/actions/workflows/post-deploy-search-sync.yml",
        sourceUrl: "https://github.com/Sliense-ysd/nanobanana-pro-org/blob/main/.github/workflows/post-deploy-search-sync.yml",
      },
    ],
  },
  {
    id: "repo-links",
    title: "仓库入口",
    note: "需要看注册表、README 或原始 workflow 时，从这里进。",
    tasks: [
      {
        label: "cron-hub 仓库",
        code: "repo",
        note: "总注册表、README dashboard 和 workflow 全在这里。",
        repos: "Sliense-ysd/cron-hub",
        href: "https://github.com/Sliense-ysd/cron-hub",
      },
      {
        label: "registry.yml",
        code: "source of truth",
        note: "当前 cron 清单的单一数据源。",
        repos: "Sliense-ysd/cron-hub",
        href: "https://github.com/Sliense-ysd/cron-hub/blob/main/registry.yml",
      },
      {
        label: "Dashboard README",
        code: "dashboard",
        note: "自动生成的 markdown 仪表盘。",
        repos: "Sliense-ysd/cron-hub",
        href: "https://github.com/Sliense-ysd/cron-hub/blob/main/README.md",
      },
    ],
  },
];

const mount = document.querySelector("#cron-sections");
const searchInput = document.querySelector("#cron-search");
const taskCount = document.querySelector("#cron-task-count");
const sectionCount = document.querySelector("#cron-section-count");

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function matches(section, task, search) {
  if (!search) return true;
  return [section.title, section.note, task.label, task.code, task.note, task.repos]
    .join(" ")
    .toLowerCase()
    .includes(search);
}

function buildGhCommand(task, mode) {
  return `gh workflow ${mode} ${task.workflowFile} -R ${task.repos}`;
}

function buildRunCommand(task) {
  return `gh workflow run ${task.workflowFile} -R ${task.repos}`;
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

function renderTaskCard(task) {
  if (!task.workflowFile) {
    return `
      <article class="task-card">
        <div class="task-card-head">
          <div>
            <span class="tag-code">${escapeHtml(task.code)}</span>
            <strong>${escapeHtml(task.label)}</strong>
          </div>
          <span class="detail-chip">${escapeHtml(task.repos)}</span>
        </div>
        <p>${escapeHtml(task.note)}</p>
        <div class="task-actions">
          <a class="task-link-button" href="${task.href}" target="_blank" rel="noreferrer">打开入口</a>
        </div>
      </article>
    `;
  }

  return `
    <article class="task-card">
      <div class="task-card-head">
        <div>
          <span class="tag-code">${escapeHtml(task.code)}</span>
          <strong>${escapeHtml(task.label)}</strong>
        </div>
        <span class="detail-chip">${escapeHtml(task.repos)}</span>
      </div>
      <p>${escapeHtml(task.note)}</p>
      <div class="task-actions">
        <a class="task-link-button" href="${task.workflowUrl}" target="_blank" rel="noreferrer">GitHub 开关 / Runs</a>
        <a class="task-link-button" href="${task.sourceUrl}" target="_blank" rel="noreferrer">查看 YAML</a>
        <button class="task-command-button" data-copy="${escapeHtml(buildGhCommand(task, "disable"))}" type="button">复制停用命令</button>
        <button class="task-command-button" data-copy="${escapeHtml(buildGhCommand(task, "enable"))}" type="button">复制启用命令</button>
        <button class="task-command-button" data-copy="${escapeHtml(buildRunCommand(task))}" type="button">复制手动运行命令</button>
      </div>
    </article>
  `;
}

function render() {
  const search = searchInput.value.trim().toLowerCase();
  const filtered = [];
  let total = 0;

  sections.forEach((section) => {
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
        <span>静态站里的安全边界</span>
      </div>
      <p>
        这个站本身是静态页，不能安全内置 GitHub PAT 去直接改 workflow 开关。
        所以这里给你两种最快的控制方式：一是点 <code>GitHub 开关 / Runs</code> 直接去 workflow 页面；
        二是点一下复制 <code>gh workflow enable/disable</code> 命令，在你的终端里直接执行。
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
    button.addEventListener("click", () => {
      copyText(button.dataset.copy, button);
    });
  });
}

searchInput.addEventListener("input", render);
render();
