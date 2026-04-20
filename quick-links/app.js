const sections = [
  {
    id: "signals",
    title: "信号入口",
    note: "情报、build in public、趋势信号都先从这里分发。",
    items: [
      { label: "BuilderPulse 仓库", code: "github", note: "看 BuilderPulse 项目本体和更新。", href: "https://github.com/BuilderPulse/BuilderPulse" },
      { label: "推特标签页", code: "bps", note: "站内整理好的 X 标签入口。", href: "/twitter-tags/" },
      { label: "Trend Keyword Scan", code: "22:00", note: "Cron Hub 每晚趋势关键词扫描。", href: "https://github.com/Sliense-ysd/cron-hub/actions/workflows/trend-scan.yml" },
      { label: "AIGC Reddit Scan", code: "09:00", note: "每天抓 8 个 AIGC Reddit 社区。", href: "https://github.com/Sliense-ysd/cron-hub/actions/workflows/aigc-reddit-scan.yml" },
      { label: "Build in Public", code: "#BuildInPublic", note: "直接打开 X 的 build in public 实时搜索。", href: "https://x.com/search?q=%23BuildInPublic&src=typed_query&f=live" },
    ],
  },
  {
    id: "analytics",
    title: "分析入口",
    note: "用户行为、回放、站点分析、告警都先从这里汇总。",
    items: [
      { label: "Umami 仪表盘", code: "analytics.seekorigin.ai", note: "查看全局流量和站点列表。", href: "https://analytics.seekorigin.ai" },
      { label: "用户路径页", code: "bps", note: "站内的 Umami 路径样例页。", href: "/journeys/" },
      { label: "Microsoft Clarity", code: "portal", note: "录屏回放和热图主入口。", href: "https://clarity.microsoft.com/projects" },
      { label: "musicmake 分析仪表盘", code: "admin", note: "musicmake.ai 管理后台的分析页。", href: "https://musicmake.ai/admin/analytics-dashboard" },
      { label: "BPS 转化漏斗", code: "bps", note: "站点级主链路漏斗总入口，优先看 SongUnique。", href: "/funnels/" },
      { label: "Cron Hub", code: "10 tasks", note: "所有定时监控任务的看板。", href: "/cron-hub/" },
    ],
  },
  {
    id: "ops",
    title: "运维入口",
    note: "发布、容器、日志、定时任务和 Cron Hub 聚合页。",
    items: [
      { label: "Dokploy Monitoring", code: "dokploy", note: "监控面板。", href: "http://31.97.143.166:3000/dashboard/monitoring" },
      { label: "Dokploy Deployments", code: "dokploy", note: "部署记录。", href: "http://31.97.143.166:3000/dashboard/deployments" },
      { label: "Dokploy Schedules", code: "dokploy", note: "Dokploy 自身的定时任务。", href: "http://31.97.143.166:3000/dashboard/schedules" },
      { label: "Dokploy Docker", code: "dokploy", note: "容器、镜像和 compose。", href: "http://31.97.143.166:3000/dashboard/docker" },
      { label: "Dokploy Requests", code: "dokploy", note: "请求和 webhook 轨迹。", href: "http://31.97.143.166:3000/dashboard/requests" },
      { label: "Cron Hub 面板", code: "cron-hub", note: "把 GitHub Actions 定时监控也收进来。", href: "/cron-hub/" },
    ],
  },
  {
    id: "growth",
    title: "增长入口",
    note: "关键词、趋势、SEO、广告和过期域名相关工具。",
    items: [
      { label: "trendkeywordcatch", code: "repo", note: "趋势关键词抓取仓库。", href: "https://github.com/Sliense-ysd/trendkeywordcatch" },
      { label: "Google Indexing Script", code: "repo", note: "Google 索引脚本仓库。", href: "https://github.com/goenning/google-indexing-script" },
      { label: "过期域名页", code: "bps", note: "拍卖域名监控和域名工厂入口。", href: "/expired-domains/" },
      { label: "Google Ads", code: "portal", note: "广告后台主入口。", href: "https://ads.google.com/aw/overview" },
      { label: "Search Console", code: "portal", note: "Google Search Console 主入口。", href: "https://search.google.com/search-console" },
      { label: "Sitemap Monitor", code: "workflow", note: "竞对 sitemap 手动监控工作流。", href: "https://github.com/Sliense-ysd/cron-hub/actions/workflows/sitemap-monitor.yml" },
    ],
  },
  {
    id: "revenue",
    title: "收入入口",
    note: "收入、支付、转化、推广码和推荐关系。",
    items: [
      { label: "站点收入", code: "musicmake", note: "站点级收入看板。", href: "https://musicmake.ai/admin/revenue-sites" },
      { label: "音乐订单", code: "musicmake", note: "订单列表和支付状态。", href: "https://musicmake.ai/admin/music-orders" },
      { label: "BPS 转化漏斗", code: "bps", note: "站点 funnel 总入口，SongUnique 已原生化。", href: "/funnels/" },
      { label: "分析仪表盘", code: "musicmake", note: "后台分析总览。", href: "https://musicmake.ai/admin/analytics-dashboard" },
      { label: "推广码管理", code: "musicmake", note: "增长相关优惠码。", href: "https://musicmake.ai/admin/growth/promotion-codes" },
      { label: "推荐关系", code: "musicmake", note: "referral 关系链。", href: "https://musicmake.ai/admin/growth/referrals" },
    ],
  },
  {
    id: "personal",
    title: "个人入口",
    note: "你自己高频会开的控制台、仓库和任务入口。",
    items: [
      { label: "GitHub 主页", code: "@Sliense-ysd", note: "仓库、stars、profile 主入口。", href: "https://github.com/Sliense-ysd" },
      { label: "GitHub Notifications", code: "inbox", note: "GitHub 通知收件箱。", href: "https://github.com/notifications" },
      { label: "Dida365", code: "tasks", note: "滴答清单 webapp。", href: "https://dida365.com/webapp/#q/all/tasks" },
      { label: "BPS 仓库", code: "repo", note: "当前总控台仓库。", href: "https://github.com/Sliense-ysd/bps-console" },
      { label: "Cron Hub 仓库", code: "repo", note: "定时任务注册表和 workflow 仓库。", href: "https://github.com/Sliense-ysd/cron-hub" },
      { label: "Expired Domain Sites", code: "repo", note: "过期域名站点工厂仓库。", href: "https://github.com/Sliense-ysd/expired-domain-sites" },
    ],
  },
];

const mount = document.querySelector("#quick-sections");
const searchInput = document.querySelector("#quick-search");
const linkCount = document.querySelector("#quick-link-count");
const sectionCount = document.querySelector("#quick-section-count");

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function matches(section, item, search) {
  if (!search) return true;
  return [section.title, section.note, item.label, item.code, item.note]
    .join(" ")
    .toLowerCase()
    .includes(search);
}

function render() {
  const search = searchInput.value.trim().toLowerCase();
  const filtered = [];
  let total = 0;

  sections.forEach((section) => {
    const items = section.items.filter((item) => matches(section, item, search));
    if (items.length > 0) {
      filtered.push({ ...section, items });
      total += items.length;
    }
  });

  linkCount.textContent = `${total} 个入口`;
  sectionCount.textContent = `${filtered.length} 个分区`;

  if (filtered.length === 0) {
    mount.innerHTML = `
      <section class="empty-state">
        <h2>没有匹配的入口</h2>
        <p>试试搜 cron、growth、analytics、github、dida365。</p>
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
            <span class="detail-pill">${section.items.length} 个入口</span>
          </div>
          <div class="tag-grid">
            ${section.items
              .map(
                (item) => `
                  <a class="tag-card" href="${item.href}" target="_blank" rel="noreferrer">
                    <span class="tag-code">${escapeHtml(item.code)}</span>
                    <strong>${escapeHtml(item.label)}</strong>
                    <p>${escapeHtml(item.note)}</p>
                    <span class="tag-link">打开入口 →</span>
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
