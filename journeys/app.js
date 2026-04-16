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

const journeySamples = window.JOURNEY_SAMPLES || {};
const INITIAL_VISIBLE_COUNT = 2;
const LOAD_MORE_COUNT = 2;

const investigationConfigBySite = {
  musicmake: {
    links: [
      { label: "用户后台", href: "https://musicmake.ai/admin/users" },
      { label: "作品管理", href: "https://musicmake.ai/admin/music-works" },
      { label: "订单页", href: "https://musicmake.ai/admin/music-orders" },
      { label: "分析仪表盘", href: "https://musicmake.ai/admin/analytics-dashboard" },
      { label: "Clarity", href: "https://clarity.microsoft.com/projects" },
    ],
  },
  songunique: {
    links: [
      { label: "Create", href: "https://songunique.com/create" },
      { label: "结账页", href: "https://songunique.com/complete-order" },
      { label: "作品追踪", href: "https://songunique.com/track" },
      { label: "Clarity", href: "https://clarity.microsoft.com/projects" },
    ],
    clarityCandidates: [
      {
        id: "t17ka6/7bt6c7",
        label: "支付失败候选录屏",
        href: "https://clarity.microsoft.com/player/w3ujsk46ve/t17ka6/7bt6c7",
        note: "create → complete-order，录屏里能看到 Payment failed 和重复支付点击。",
      },
      {
        id: "c23jar/aiofoq",
        label: "结账页长停留候选录屏",
        href: "https://clarity.microsoft.com/player/w3ujsk46ve/c23jar/aiofoq",
        note: "在结账页停留 2 分钟以上，能看到 Proceed to Payment 与输入行为。",
      },
      {
        id: "1m2igve/1v5th38",
        label: "结账页短录屏",
        href: "https://clarity.microsoft.com/player/w3ujsk46ve/1m2igve/1v5th38",
        note: "只在 /complete-order 上停留 19 秒，适合快速核对附加项点击。",
      },
    ],
  },
  seedance20: {
    links: [
      { label: "站点首页", href: "https://seedance20.net/" },
      { label: "聊天页", href: "https://seedance20.net/app/chat" },
      { label: "生成页", href: "https://seedance20.net/app/generate" },
      { label: "Clarity", href: "https://clarity.microsoft.com/projects" },
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
const visibleCountBySite = {};
const expandedSessionBySite = {};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getToneClass(tone) {
  if (tone === "info") return "detail-chip info";
  if (tone === "success") return "detail-chip success";
  if (tone === "warn") return "detail-chip warn";
  return "detail-chip";
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

function ensureSiteState(siteId) {
  const sample = journeySamples[siteId];
  if (!sample) {
    return;
  }

  if (!visibleCountBySite[siteId]) {
    visibleCountBySite[siteId] = Math.min(INITIAL_VISIBLE_COUNT, sample.sessions.length);
  }

  if (!(siteId in expandedSessionBySite)) {
    expandedSessionBySite[siteId] = null;
  }
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
        <p>先在左边搜出站点，再点进去看更细的 session 轨迹。</p>
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
      ensureSiteState(activeSiteId);
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

function renderTimeline(session) {
  return session.timeline
    .map(
      (event, index) => `
        ${index === 0 ? "" : `<div class="timeline-gap">停留 ${escapeHtml(event.delay || "立即")}</div>`}
        <div class="timeline-item">
          <div class="timeline-time">${escapeHtml(event.at)}</div>
          <div class="timeline-content">
            <div class="timeline-head">
              <strong>${escapeHtml(event.label)}</strong>
              <span>${escapeHtml(event.path)}</span>
            </div>
            ${
              event.detail
                ? `<pre class="timeline-detail">${escapeHtml(JSON.stringify(event.detail, null, 2))}</pre>`
                : ""
            }
          </div>
        </div>
      `,
    )
    .join("");
}

function renderWebhookTrail(session) {
  if (session.webhookTrail.length === 0) {
    return `
      <div class="detail-note detail-note-muted">
        这条 session 没有记录到更细的 webhook / checkout 回调事件。${session.failureDetail ? escapeHtml(session.failureDetail) : "当前只能按页面与前端事件解释。"}
      </div>
    `;
  }

  return `
    <div class="session-anomalies">
      ${session.webhookTrail
        .map(
          (event) => `
            <span class="anomaly-chip">${escapeHtml(`${event.at} · ${event.label}`)}</span>
          `,
        )
        .join("")}
    </div>
    ${
      session.failureDetail
        ? `<div class="detail-note detail-note-warn">${escapeHtml(session.failureDetail)}</div>`
        : ""
    }
  `;
}

function buildLookupModel(siteId, session) {
  const config = investigationConfigBySite[siteId] || { links: [] };
  const lowerPaths = session.timeline.map((event) => event.path.toLowerCase());
  const lowerNames = session.timeline.map((event) => event.name.toLowerCase());

  const promptSummary = lowerNames.some((name) => name.startsWith("ts_form_step"))
    ? "这条 session 经过多步表单填写流程，但 Umami 没记录具体文本；建议结合候选录屏看 Entered Text。"
    : lowerPaths.some((path) => path.includes("lyrics") || path.includes("generate"))
      ? "能定位到用户在哪个生成页或歌词工具页，但当前 Umami 样例没有保留原始 prompt 文本。"
      : "当前没有看到可直接还原 prompt 的字段。";

  const creditsSummary = lowerNames.some((name) => name.includes("credit"))
    ? "这条路径里出现过积分相关动作，但当前没有精确的积分消耗值。"
    : lowerPaths.some((path) => path.includes("/credits"))
      ? "用户浏览过积分页，但当前样例没有看到实际积分消耗值。"
      : "当前样例里没有明显的积分消费字段。";

  const queryHints = [
    session.id,
    session.country,
    session.browser,
    session.firstSeen,
    session.lastSeen,
    session.timeline[0]?.path,
  ].filter(Boolean);

  return {
    email: session.email || null,
    promptSummary,
    creditsSummary,
    queryHints,
    links: config.links,
    clarityCandidates: config.clarityCandidates || [],
  };
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

function renderLookupPanel(siteId, session) {
  const lookup = buildLookupModel(siteId, session);

  return `
    <section class="detail-subcard">
      <div class="card-head">
        <h3>调查入口</h3>
        <span>把用户、作品、支付和录屏线索串起来</span>
      </div>

      <div class="lookup-grid">
        ${
          lookup.email
            ? `
              <div class="lookup-panel">
                <span>邮箱</span>
                <strong>${escapeHtml(lookup.email)}</strong>
              </div>
            `
            : ""
        }
        <div class="lookup-panel">
          <span>积分线索</span>
          <strong>${escapeHtml(lookup.creditsSummary)}</strong>
        </div>
        <div class="lookup-panel">
          <span>提示词线索</span>
          <strong>${escapeHtml(lookup.promptSummary)}</strong>
        </div>
        <div class="lookup-panel">
          <span>建议搜索键</span>
          <strong>${escapeHtml(lookup.queryHints.join(" · "))}</strong>
        </div>
      </div>

      <div class="lookup-link-row">
        ${lookup.links
          .map(
            (link) => `
              <a class="lookup-link-button" href="${link.href}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>
            `,
          )
          .join("")}
        <button class="lookup-link-button" data-copy="${escapeHtml(lookup.queryHints.join(" | "))}" type="button">复制搜索键</button>
      </div>

      ${
        lookup.clarityCandidates.length > 0
          ? `
            <div class="clarity-candidates">
              ${lookup.clarityCandidates
                .map(
                  (candidate) => `
                    <a class="clarity-card" href="${candidate.href}" target="_blank" rel="noreferrer">
                      <span class="tag-code">${escapeHtml(candidate.id)}</span>
                      <strong>${escapeHtml(candidate.label)}</strong>
                      <p>${escapeHtml(candidate.note)}</p>
                    </a>
                  `,
                )
                .join("")}
            </div>
          `
          : `
            <div class="detail-note detail-note-muted">
              当前没有直接匹配到录屏 id。建议带着上面的搜索键去 Clarity 手动筛选。
            </div>
          `
      }
    </section>
  `;
}

function renderExpandedSession(session) {
  return `
    <div class="session-expanded">
      <div class="session-chip-row">
        ${session.tags.map((tag) => `<span class="${getToneClass(tag.tone)}">${escapeHtml(tag.label)}</span>`).join("")}
        <span class="detail-chip">${escapeHtml(`来源 ${session.source}`)}</span>
      </div>

      <div class="session-summary-grid">
        <div class="summary-panel">
          <span>发生了什么</span>
          <strong>${escapeHtml(session.summary)}</strong>
        </div>
        <div class="summary-panel">
          <span>怎么理解这条路径</span>
          <strong>${escapeHtml(session.why)}</strong>
        </div>
      </div>

      <div class="session-metrics-grid">
        <div class="session-metric">
          <span>总事件</span>
          <strong>${session.totalEvents}</strong>
        </div>
        <div class="session-metric">
          <span>关键事件</span>
          <strong>${session.meaningfulEvents}</strong>
        </div>
        <div class="session-metric">
          <span>页面数</span>
          <strong>${session.uniquePages}</strong>
        </div>
        <div class="session-metric">
          <span>活跃时长</span>
          <strong>${escapeHtml(session.activeWindow)}</strong>
        </div>
        <div class="session-metric">
          <span>心跳折叠</span>
          <strong>${session.heartbeatCount}</strong>
        </div>
      </div>

      <section class="detail-subcard">
        <div class="card-head">
          <h3>支付 / webhook 解释</h3>
          <span>尽量把支付分叉说清楚</span>
        </div>
        ${renderWebhookTrail(session)}
      </section>

      ${renderLookupPanel(activeSiteId, session)}

      <section class="detail-subcard">
        <div class="card-head">
          <h3>时间线</h3>
          <span>每一步都显示停留时长</span>
        </div>
        <div class="timeline-list">
          ${renderTimeline(session)}
        </div>
      </section>
    </div>
  `;
}

function renderSessionCard(session, isExpanded) {
  return `
    <article class="session-card ${isExpanded ? "active" : ""}">
      <div class="session-card-head">
        <div>
          <strong>${escapeHtml(`${session.emoji} ${session.label}`)}</strong>
          <span>${escapeHtml(`${session.country} · ${session.browser} · ${session.device} · session ${session.id}`)}</span>
        </div>
        <button class="session-select-button" data-session-id="${session.id}" type="button">
          ${isExpanded ? "收起详情" : "查看详情"}
        </button>
      </div>

      <p class="session-note">${escapeHtml(session.summary)}</p>

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

      <div class="session-chip-row session-chip-row-compact">
        ${session.tags.slice(0, 5).map((tag) => `<span class="${getToneClass(tag.tone)}">${escapeHtml(tag.label)}</span>`).join("")}
      </div>

      ${
        session.anomalies.length > 0
          ? `
            <div class="session-anomalies">
              ${session.anomalies.map((item) => `<span class="anomaly-chip">${escapeHtml(item)}</span>`).join("")}
            </div>
          `
          : ""
      }

      ${
        isExpanded
          ? renderExpandedSession(session)
          : ""
      }
    </article>
  `;
}

function renderSessionLibrary(sample) {
  const visibleCount = visibleCountBySite[activeSiteId] || Math.min(INITIAL_VISIBLE_COUNT, sample.sessions.length);
  const visibleSessions = sample.sessions.slice(0, visibleCount);
  const expandedSessionId = expandedSessionBySite[activeSiteId];

  return `
    <section class="detail-card">
      <div class="session-library-head">
        <div>
          <h3>session 列表</h3>
          <span>已加载 ${visibleSessions.length} / ${sample.sessions.length} 条预载样例</span>
        </div>
        ${
          visibleCount < sample.sessions.length
            ? `<button class="load-more-button" id="load-more-sessions" type="button">加载更多</button>`
            : `<span class="detail-note detail-note-muted">已经把当前站点的预载样例都展开了</span>`
        }
      </div>
      <div class="session-list">
        ${visibleSessions
          .map((session) => renderSessionCard(session, session.id === expandedSessionId))
          .join("")}
      </div>
    </section>
  `;
}

function renderSample(sample, site) {
  return `
    <section class="journey-hero">
      <div class="hero-copy">
        <h2>${escapeHtml(site.name)}</h2>
        <p>域名：${escapeHtml(site.domain)} · ${escapeHtml(sample.window)} · 数据由 ${escapeHtml(sample.capturedWith)} 抽样压缩。现在你可以按 session 细看，再继续加载更多。</p>
        <div class="hero-pill-row">
          <span class="detail-pill">真实 Umami 样例</span>
          <span class="detail-pill">站点搜索可切换</span>
          <span class="detail-pill">可加载更多 session</span>
          <span class="detail-pill">卡片内展开详情</span>
        </div>
      </div>
      <div class="mini-stat">
        <span>站点总 session</span>
        <strong>${sample.totals.sessions}</strong>
      </div>
      <div class="mini-stat">
        <span>站点总事件</span>
        <strong>${sample.totals.events}</strong>
      </div>
      <div class="mini-stat">
        <span>预载样例</span>
        <strong>${sample.sessions.length}</strong>
      </div>
    </section>

    <section class="journey-grid">
      <section class="detail-card">
        <div class="card-head">
          <h3>站点级路径概览</h3>
          <span>按当前预载样例统计</span>
        </div>
        <div class="flow-strip">${renderFlow(sample)}</div>
      </section>

      <section class="detail-card">
        <div class="card-head">
          <h3>站点级判断</h3>
          <span>帮助你先理解这批 session</span>
        </div>
        <ul class="insight-list">
          ${sample.insights.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </section>
    </section>

    ${renderSessionLibrary(sample)}
  `;
}

function attachJourneyHandlers(sample) {
  journeyMain.querySelectorAll(".session-select-button").forEach((button) => {
    button.addEventListener("click", () => {
      const sessionId = button.dataset.sessionId;
      expandedSessionBySite[activeSiteId] = expandedSessionBySite[activeSiteId] === sessionId ? null : sessionId;
      renderJourney();
    });
  });

  const loadMoreButton = document.querySelector("#load-more-sessions");
  if (loadMoreButton) {
    loadMoreButton.addEventListener("click", () => {
      visibleCountBySite[activeSiteId] = Math.min(
        sample.sessions.length,
        (visibleCountBySite[activeSiteId] || INITIAL_VISIBLE_COUNT) + LOAD_MORE_COUNT,
      );
      renderJourney();
    });
  }

  journeyMain.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", () => {
      copyText(button.dataset.copy, button);
    });
  });
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

  ensureSiteState(activeSiteId);
  journeyMain.innerHTML = renderSample(sample, site);
  attachJourneyHandlers(sample);
}

searchInput.addEventListener("input", () => {
  renderSiteList();
  renderJourney();
});

renderSiteList();
renderJourney();
