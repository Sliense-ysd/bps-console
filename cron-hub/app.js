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
        href: "https://github.com/Sliense-ysd/cron-hub/actions/workflows/umami-report.yml",
        repos: "kling4pro / img2video / nilaio / nanobanana 等",
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
        href: "https://github.com/Sliense-ysd/cron-hub/actions/workflows/aigc-reddit-scan.yml",
        repos: "cron-hub",
      },
      {
        label: "Sitemap Continuous Validation",
        code: "10:00",
        note: "站点地图持续验证（静态分析 + HTTP 检查）。",
        href: "https://github.com/Sliense-ysd/actionfigure-generator/actions/workflows/sitemap-check.yml",
        repos: "actionfigure-generator",
      },
      {
        label: "Anti Abuse Daily Scan",
        code: "11:20",
        note: "每日风控巡检，重点看异常使用模式。",
        href: "https://github.com/Sliense-ysd/cron-hub/actions/workflows/anti-abuse-scan.yml",
        repos: "8 个 repo",
      },
      {
        label: "Domain Auction Monitor",
        code: "19:00",
        note: "每晚扫描多来源过期/拍卖域名并做 authority 评估。",
        href: "https://github.com/Sliense-ysd/cron-hub/actions/workflows/domain-auction-monitor.yml",
        repos: "cron-hub",
      },
      {
        label: "Daily Data Digest",
        code: "21:00",
        note: "生成注册、付费、留存等每日数据汇总。",
        href: "https://github.com/Sliense-ysd/cron-hub/actions/workflows/daily-digest.yml",
        repos: "10 个 repo",
      },
      {
        label: "Trend Keyword Scan",
        code: "22:00",
        note: "监控 Google Trends 暴涨关键词。",
        href: "https://github.com/Sliense-ysd/cron-hub/actions/workflows/trend-scan.yml",
        repos: "cron-hub",
      },
      {
        label: "ai-shared Nutstore Backup",
        code: "02:00 (+1)",
        note: "rclone 同步 ai-shared 到坚果云。",
        href: "https://github.com/Sliense-ysd/cron-hub/actions/workflows/github-cron-backup.yml",
        repos: "ai-shared-backup-private",
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
        href: "https://github.com/Sliense-ysd/cron-hub/actions/workflows/sitemap-monitor.yml",
        repos: "cron-hub",
      },
      {
        label: "Post-Deploy Search Sync",
        code: "workflow_run",
        note: "部署完成后自动提 sitemap 到 Google / Bing / IndexNow。",
        href: "https://github.com/Sliense-ysd/nanobanana-pro-org/actions/workflows/post-deploy-search-sync.yml",
        repos: "wan27pro / wan3pro / uni-1 / nanobanana",
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
        href: "https://github.com/Sliense-ysd/cron-hub",
        repos: "cron-hub",
      },
      {
        label: "registry.yml",
        code: "source of truth",
        note: "当前 cron 清单的单一数据源。",
        href: "https://github.com/Sliense-ysd/cron-hub/blob/main/registry.yml",
        repos: "cron-hub",
      },
      {
        label: "Dashboard README",
        code: "dashboard",
        note: "自动生成的 markdown 仪表盘。",
        href: "https://github.com/Sliense-ysd/cron-hub/blob/main/README.md",
        repos: "cron-hub",
      },
    ],
  },
];

const mount = document.querySelector("#cron-sections");
const searchInput = document.querySelector("#cron-search");
const taskCount = document.querySelector("#cron-task-count");
const sectionCount = document.querySelector("#cron-section-count");

function escapeHtml(value) {
  return value
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

  mount.innerHTML = filtered
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
          <div class="tag-grid">
            ${section.tasks
              .map(
                (task) => `
                  <a class="tag-card" href="${task.href}" target="_blank" rel="noreferrer">
                    <span class="tag-code">${escapeHtml(task.code)}</span>
                    <strong>${escapeHtml(task.label)}</strong>
                    <p>${escapeHtml(task.note)}</p>
                    <p>${escapeHtml(task.repos)}</p>
                    <span class="tag-link">打开 workflow / repo →</span>
                  </a>
                `,
              )
              .join("")}
          </div>
        </section>
      `,
    )
    .join("");
}

searchInput.addEventListener("input", render);
render();
