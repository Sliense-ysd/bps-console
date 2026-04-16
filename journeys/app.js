const siteRegistry = [
  { id: "musicmake", name: "MusicMake", domain: "musicmake.ai", status: "preview", keywords: ["音乐", "生成", "song"] },
  { id: "songunique", name: "SongUnique", domain: "songunique.com", status: "preview", keywords: ["story to song", "支付", "checkout"] },
  { id: "seedance20", name: "Seedance 2.0", domain: "seedance20.net", status: "preview", keywords: ["video", "chat", "generate"] },
  { id: "seedance30", name: "Seedance 3.0", domain: "seedance30.com", status: "catalog", keywords: ["video", "seedance"] },
  { id: "seedance3video", name: "Seedance 3 Video", domain: "seedance3video.com", status: "catalog", keywords: ["video", "seedance"] },
  { id: "kling3", name: "Kling 3", domain: "kling3.co", status: "catalog", keywords: ["video", "kling"] },
  { id: "kling4pro", name: "Kling 4 Pro", domain: "kling4pro.com", status: "catalog", keywords: ["video", "kling"] },
  { id: "pixversec1", name: "PixVerse C1", domain: "pixversec1.com", status: "catalog", keywords: ["video", "pixverse"] },
  { id: "img2video", name: "Img2Video", domain: "img2video.io", status: "catalog", keywords: ["image to video", "video"] },
  { id: "mimo", name: "Mimo Pro", domain: "mimo-pro.com", status: "catalog", keywords: ["ai", "music", "video"] },
  { id: "qwenimage20", name: "Qwen Image 2.0", domain: "qwenimage20.com", status: "catalog", keywords: ["image", "qwen"] },
  { id: "veo40", name: "Veo 4.0", domain: "veo40.com", status: "catalog", keywords: ["video", "veo"] },
  { id: "wan27pro", name: "Wan 2.7 Pro", domain: "wan27pro.com", status: "catalog", keywords: ["video", "wan"] },
  { id: "wan3pro", name: "Wan 3 Pro", domain: "wan3pro.com", status: "catalog", keywords: ["video", "wan"] },
  { id: "sora30", name: "Sora 3.0", domain: "sora30.com", status: "catalog", keywords: ["video", "sora"] },
  { id: "seedream50", name: "Seedream 5.0", domain: "seedream50.com", status: "catalog", keywords: ["image", "seedream"] },
  { id: "yoursong", name: "YourSong", domain: "yoursong.com", status: "catalog", keywords: ["music", "song"] },
  { id: "nilaio", name: "Nilaio", domain: "nilaio.com", status: "catalog", keywords: ["ai"] },
  { id: "uni1", name: "Uni-1", domain: "uni-1.cc", status: "catalog", keywords: ["ai"] },
  { id: "nadou", name: "Nadou", domain: "nadou.org", status: "catalog", keywords: ["ai"] },
];

const journeySamples = {
  musicmake: {
    window: "最近 3 天",
    capturedWith: "$umami-user-journey-investigator",
    totals: { sessions: 456, events: 4818, preview: 3 },
    insights: [
      "核心功能使用很深，用户在生成成功后仍持续播放、暂停和再次生成。",
      "博客内容入口会把一部分人带回中文首页，再触发登录与会员提示链路。",
      "这一批样例里最明显的摩擦点是会员弹窗疲劳和 payment_incomplete。",
    ],
    stages: [
      { id: "entry", label: "入口页" },
      { id: "generate", label: "提交生成" },
      { id: "success", label: "生成成功" },
      { id: "pricing", label: "查看定价" },
      { id: "checkout", label: "发起结账" },
      { id: "blocked", label: "支付中断" },
    ],
    sessions: [
      {
        id: "6cd05039",
        emoji: "✅",
        label: "体验了核心功能",
        country: "US",
        device: "Windows 10 / Edge / laptop",
        source: "(direct)",
        totalEvents: 681,
        note: "直接从首页开始连续生成与试听，生成成功后没有离开，而是继续播放、暂停和二次生成。",
        route: ["首页", "提交生成", "生成成功", "播放/暂停", "再次生成", "展开播放器"],
        stageHits: ["entry", "generate", "success"],
        trail: [
          "page_view · /",
          "music_generate_submit · /",
          "music_generate_success · /",
          "music_player_play · /",
          "music_player_pause · /",
          "music_player_expand · /",
        ],
        anomalies: ["music_player_play 连续 4-7 次"],
      },
      {
        id: "4c05e500",
        emoji: "😰",
        label: "支付挣扎",
        country: "CA",
        device: "Mac / Chrome / desktop",
        source: "博客入口",
        totalEvents: 307,
        note: "先从博客进入，再回到中文首页，打开登录与会员提示后尝试升级，最终在支付链路中断。",
        route: ["博客内页", "中文首页", "登录弹窗", "会员提示 ×12", "checkout_redirect", "payment_incomplete"],
        stageHits: ["entry", "generate", "success", "pricing", "checkout", "blocked"],
        trail: [
          "page_view · /zh/blog/...",
          "lp_view · /zh",
          "auth_login_modal_view · /zh/blog/...",
          "member_hint_modal_view · /zh",
          "checkout_redirect · /pricing",
          "payment_incomplete · /pricing",
        ],
        anomalies: ["会员提示打开 12 次 / 关闭 12 次", "checkout 后出现 payment_incomplete"],
      },
      {
        id: "6c74c581",
        emoji: "✅",
        label: "体验了核心功能",
        country: "FR",
        device: "Windows 10 / Chrome / laptop",
        source: "(direct)",
        totalEvents: 139,
        note: "从封面页进入生成页，多次生成成功后切到我的作品，再回到首页继续使用。",
        route: ["封面页", "生成页", "提交生成", "生成成功", "我的作品", "回到首页"],
        stageHits: ["entry", "generate", "success"],
        trail: [
          "page_view · /fr/cover",
          "music_view · /fr/generate",
          "music_generate_submit · /fr/generate",
          "music_generate_success · /fr/generate",
          "page_my_works_view · /fr/my-works",
          "lp_view · /fr",
        ],
        anomalies: ["music_player_pause 连续 3 次"],
      },
    ],
  },
  songunique: {
    window: "最近 3 天",
    capturedWith: "$umami-user-journey-investigator",
    totals: { sessions: 72, events: 694, preview: 2 },
    insights: [
      "支付链路很短，/complete-order 是最关键的承接页。",
      "付费用户普遍会多次点击 payment_click，说明结账页反馈不够确定。",
      "存在 payment_incomplete 之后需要再次进入 checkout 才恢复的路径。",
    ],
    stages: [
      { id: "entry", label: "首页 / 定价" },
      { id: "create", label: "进入 create" },
      { id: "order", label: "complete-order" },
      { id: "pay", label: "payment_click" },
      { id: "blocked", label: "支付异常" },
      { id: "success", label: "支付成功" },
    ],
    sessions: [
      {
        id: "590b67db",
        emoji: "💰",
        label: "付费用户",
        country: "GB",
        device: "Mac OS / Chrome / desktop",
        source: "(direct)",
        totalEvents: 126,
        note: "从首页反复回到 create 与 checkout，多次 payment_click 后，最终落到 payment-success 并继续看 track。",
        route: ["首页", "create 表单", "complete-order", "payment_click ×4", "payment_success", "track"],
        stageHits: ["entry", "create", "order", "pay", "success"],
        trail: [
          "homepage_view · /",
          "page_view · /create",
          "checkout_page_view · /complete-order",
          "payment_click · /complete-order",
          "payment_success · /song/payment-success",
          "page_view · /track",
        ],
        anomalies: ["payment_click 连续 3-4 次"],
      },
      {
        id: "cd231c7f",
        emoji: "😰",
        label: "支付挣扎",
        country: "US",
        device: "Mac OS / Chrome / desktop",
        source: "(direct)",
        totalEvents: 75,
        note: "从 pricing 进入 create，第一次 redirect 后 incomplete + cancel，改动 addon 后再次尝试才补单成功。",
        route: ["pricing", "create 表单", "complete-order", "checkout_redirect", "payment_incomplete", "补单成功"],
        stageHits: ["entry", "create", "order", "pay", "blocked", "success"],
        trail: [
          "page_view · /pricing",
          "ts_form_complete · /create",
          "checkout_page_view · /complete-order",
          "payment_click · /complete-order",
          "checkout_redirect · /complete-order",
          "payment_incomplete · /complete-order",
          "payment_success · /song/payment-success",
        ],
        anomalies: ["payment_incomplete 后二次 checkout 才成功"],
      },
    ],
  },
  seedance20: {
    window: "最近 3 天",
    capturedWith: "$umami-user-journey-investigator",
    totals: { sessions: 292, events: 1068, preview: 2 },
    insights: [
      "当前预览样例以 page_view 为主，说明大量流量仍停留在浅浏览或后台切页。",
      "用户会在 chat / generate / billing 之间来回，但没有明显深度转化事件。",
      "少量 session 混入 admin 与 auth/error 路径，更像内部或异常流量。",
    ],
    stages: [
      { id: "entry", label: "首页" },
      { id: "generate", label: "进入 generate" },
      { id: "chat", label: "切到 chat" },
      { id: "billing", label: "进入 billing" },
      { id: "admin", label: "后台路径" },
      { id: "error", label: "auth / error" },
    ],
    sessions: [
      {
        id: "20da75b4",
        emoji: "👀",
        label: "浅浏览",
        country: "US",
        device: "Windows 10 / Chrome / desktop",
        source: "seedance20.net",
        totalEvents: 66,
        note: "主要是在首页、聊天页和生成页来回切换，中途还进入 billing 与 admin 页面，像是内部检查流量。",
        route: ["聊天页", "首页", "generate", "billing", "admin/users", "admin/video-works"],
        stageHits: ["entry", "generate", "chat", "billing", "admin"],
        trail: [
          "page_view · /app/chat",
          "page_view · /",
          "page_view · /app/generate",
          "page_view · /settings/billing",
          "page_view · /admin/users",
          "page_view · /admin/video-works",
        ],
        anomalies: [],
      },
      {
        id: "e67e335d",
        emoji: "👀",
        label: "浅浏览",
        country: "US",
        device: "Windows 7 / Firefox / laptop",
        source: "google.com",
        totalEvents: 37,
        note: "从首页和注册成功页切进 generate，又反复落到 credits 与 auth/error，像是注册后找不到稳定的下一步。",
        route: ["首页", "register-success", "generate", "settings/credits", "auth/error", "返回 generate"],
        stageHits: ["entry", "generate", "billing", "error"],
        trail: [
          "page_view · /",
          "page_view · /auth/register-success",
          "page_view · /app/generate",
          "page_view · /settings/credits",
          "page_view · /auth/error",
          "page_view · /app/generate",
        ],
        anomalies: [],
      },
    ],
  },
};

const searchInput = document.querySelector("#site-search");
const siteList = document.querySelector("#site-list");
const siteTotal = document.querySelector("#site-total");
const sitePreviewCount = document.querySelector("#site-preview-count");
const siteMatchCount = document.querySelector("#site-match-count");
const journeyMain = document.querySelector("#journey-main");

let activeSiteId = siteRegistry.find((site) => site.status === "preview")?.id || siteRegistry[0].id;

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getFilteredSites() {
  const search = searchInput.value.trim().toLowerCase();
  if (!search) {
    return siteRegistry;
  }

  return siteRegistry.filter((site) =>
    [site.name, site.domain, ...site.keywords].join(" ").toLowerCase().includes(search),
  );
}

function renderSiteList() {
  const filteredSites = getFilteredSites();
  const previewCount = siteRegistry.filter((site) => site.status === "preview").length;

  siteTotal.textContent = `${siteRegistry.length} 个站点`;
  sitePreviewCount.textContent = `${previewCount} 个已预载样例`;
  siteMatchCount.textContent = `${filteredSites.length} 个结果`;

  if (!filteredSites.some((site) => site.id === activeSiteId)) {
    activeSiteId = filteredSites[0]?.id || activeSiteId;
  }

  if (filteredSites.length === 0) {
    siteList.innerHTML = `
      <section class="empty-state">
        <h2>没有找到站点</h2>
        <p>换个域名、产品名或模型关键词再试。</p>
      </section>
    `;
    journeyMain.innerHTML = `
      <section class="empty-state">
        <h2>右侧没有可展示内容</h2>
        <p>先在左边搜出站点，再点进去看路径图。</p>
      </section>
    `;
    return;
  }

  siteList.innerHTML = filteredSites
    .map(
      (site) => `
        <button class="site-button ${site.id === activeSiteId ? "active" : ""}" data-site-id="${site.id}" type="button">
          <div class="site-button-title">
            <strong>${escapeHtml(site.name)}</strong>
            <span class="site-badge ${site.status === "preview" ? "preview" : "catalog"}">
              ${site.status === "preview" ? "已预载" : "目录"}
            </span>
          </div>
          <small>${escapeHtml(site.domain)}</small>
          <small>${escapeHtml(site.keywords.join(" / "))}</small>
        </button>
      `,
    )
    .join("");

  siteList.querySelectorAll(".site-button").forEach((button) => {
    button.addEventListener("click", () => {
      activeSiteId = button.dataset.siteId;
      renderSiteList();
      renderJourney();
    });
  });
}

function renderFlow(sample) {
  return sample.stages
    .map((stage, index) => {
      const count = sample.sessions.filter((session) => session.stageHits.includes(stage.id)).length;
      return `
        <div class="flow-node">
          <small>${escapeHtml(stage.label)}</small>
          <strong>${count}</strong>
        </div>
        ${index === sample.stages.length - 1 ? "" : '<span class="flow-link">→</span>'}
      `;
    })
    .join("");
}

function renderSample(sample, site) {
  return `
    <section class="journey-hero">
      <div class="hero-copy">
        <h2>${escapeHtml(site.name)}</h2>
        <p>域名：${escapeHtml(site.domain)} · ${escapeHtml(sample.window)} · 数据由 ${escapeHtml(sample.capturedWith)} 抽样压缩。</p>
        <div class="hero-pill-row">
          <span class="detail-pill">真实 Umami 样例</span>
          <span class="detail-pill">站点搜索可切换</span>
          <span class="detail-pill">首版静态展示</span>
        </div>
      </div>
      <div class="mini-stat">
        <span>总 session</span>
        <strong>${sample.totals.sessions}</strong>
      </div>
      <div class="mini-stat">
        <span>总事件</span>
        <strong>${sample.totals.events}</strong>
      </div>
      <div class="mini-stat">
        <span>已展示样例</span>
        <strong>${sample.totals.preview}</strong>
      </div>
    </section>

    <section class="journey-grid">
      <section class="detail-card">
        <div class="card-head">
          <h3>路径图</h3>
          <span>基于当前展示的典型 session</span>
        </div>
        <div class="flow-strip">${renderFlow(sample)}</div>
      </section>

      <section class="detail-card">
        <div class="card-head">
          <h3>关键判断</h3>
          <span>方便你先看结构</span>
        </div>
        <ul class="insight-list">
          ${sample.insights.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </section>
    </section>

    <section class="detail-card">
      <div class="card-head">
        <h3>典型 session</h3>
        <span>按 skill 输出压缩为可读路径</span>
      </div>
      <div class="session-list">
        ${sample.sessions
          .map(
            (session) => `
              <article class="session-card">
                <div class="session-head">
                  <div>
                    <strong>${escapeHtml(`${session.emoji} ${session.label}`)}</strong>
                    <span>${escapeHtml(`${session.country} · ${session.device} · ${session.source} · session ${session.id} · ${session.totalEvents} 事件`)}</span>
                  </div>
                </div>
                <p class="session-note">${escapeHtml(session.note)}</p>
                <div class="session-route">
                  ${session.route
                    .map(
                      (node, index) => `
                        <span class="route-node">${escapeHtml(node)}</span>
                        ${index === session.route.length - 1 ? "" : '<span class="route-arrow">→</span>'}
                      `,
                    )
                    .join("")}
                </div>
                <div class="session-trail">
                  ${session.trail.map((item) => `<span class="trail-chip">${escapeHtml(item)}</span>`).join("")}
                </div>
                ${
                  session.anomalies.length > 0
                    ? `
                      <div class="session-anomalies">
                        ${session.anomalies
                          .map((item) => `<span class="anomaly-chip">${escapeHtml(item)}</span>`)
                          .join("")}
                      </div>
                    `
                    : ""
                }
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderJourney() {
  const site = siteRegistry.find((item) => item.id === activeSiteId);
  const sample = journeySamples[activeSiteId];

  if (!site) {
    journeyMain.innerHTML = "";
    return;
  }

  if (!sample) {
    journeyMain.innerHTML = `
      <section class="empty-state">
        <h2>${escapeHtml(site.name)} 还没有首版路径样例</h2>
        <p>${escapeHtml(site.domain)} 已经在站点目录里，但这版只先预载了 3 个站点的真实 session。下一版把这个页面接到 Umami API 后，这里就能直接切换实时路径。</p>
      </section>
    `;
    return;
  }

  journeyMain.innerHTML = renderSample(sample, site);
}

searchInput.addEventListener("input", () => {
  renderSiteList();
  renderJourney();
});

renderSiteList();
renderJourney();
