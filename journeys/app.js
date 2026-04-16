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

const searchInput = document.querySelector("#site-search");
const siteList = document.querySelector("#site-list");
const siteTotal = document.querySelector("#site-total");
const sitePreviewCount = document.querySelector("#site-preview-count");
const siteMatchCount = document.querySelector("#site-match-count");
const journeyMain = document.querySelector("#journey-main");

let activeSiteId = siteRegistry.find((site) => site.status === "preview")?.id || siteRegistry[0].id;
const visibleCountBySite = {};
const selectedSessionBySite = {};

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

  if (!selectedSessionBySite[siteId] || !sample.sessions.some((session) => session.id === selectedSessionBySite[siteId])) {
    selectedSessionBySite[siteId] = sample.sessions[0]?.id || null;
  }
}

function getSelectedSession(sample) {
  return sample.sessions.find((session) => session.id === selectedSessionBySite[activeSiteId]) || sample.sessions[0];
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

function renderSelectedSession(session) {
  return `
    <section class="detail-card selected-session-card">
      <div class="card-head">
        <div>
          <h3>当前选中 session</h3>
          <span>${escapeHtml(`${session.emoji} ${session.label} · session ${session.id}`)}</span>
        </div>
        <span>${escapeHtml(`${session.firstSeen} → ${session.lastSeen}`)}</span>
      </div>

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

      <section class="detail-subcard">
        <div class="card-head">
          <h3>时间线</h3>
          <span>每一步之间都显示停留时长</span>
        </div>
        <div class="timeline-list">
          ${renderTimeline(session)}
        </div>
      </section>
    </section>
  `;
}

function renderSessionCard(session, isActive) {
  return `
    <article class="session-card ${isActive ? "active" : ""}">
      <div class="session-card-head">
        <div>
          <strong>${escapeHtml(`${session.emoji} ${session.label}`)}</strong>
          <span>${escapeHtml(`${session.country} · ${session.browser} · ${session.device} · session ${session.id}`)}</span>
        </div>
        <button class="session-select-button" data-session-id="${session.id}" type="button">
          ${isActive ? "当前查看中" : "查看详情"}
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

      <details class="session-details">
        <summary>展开字段与关键事件</summary>
        <div class="session-detail-grid">
          <div><span>来源</span><strong>${escapeHtml(session.source)}</strong></div>
          <div><span>首个事件</span><strong>${escapeHtml(session.firstSeen)}</strong></div>
          <div><span>最后事件</span><strong>${escapeHtml(session.lastSeen)}</strong></div>
          <div><span>活跃时长</span><strong>${escapeHtml(session.activeWindow)}</strong></div>
          <div><span>总事件</span><strong>${session.totalEvents}</strong></div>
          <div><span>关键事件</span><strong>${session.meaningfulEvents}</strong></div>
        </div>
        <div class="session-trail session-trail-detailed">
          ${session.timeline
            .slice(0, 6)
            .map((event) => `<span class="trail-chip">${escapeHtml(`${event.at} · ${event.label}`)}</span>`)
            .join("")}
        </div>
      </details>
    </article>
  `;
}

function renderSessionLibrary(sample) {
  const visibleCount = visibleCountBySite[activeSiteId] || Math.min(INITIAL_VISIBLE_COUNT, sample.sessions.length);
  const visibleSessions = sample.sessions.slice(0, visibleCount);

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
          .map((session) => renderSessionCard(session, session.id === selectedSessionBySite[activeSiteId]))
          .join("")}
      </div>
    </section>
  `;
}

function renderSample(sample, site) {
  ensureSiteState(activeSiteId);
  const selectedSession = getSelectedSession(sample);

  return `
    <section class="journey-hero">
      <div class="hero-copy">
        <h2>${escapeHtml(site.name)}</h2>
        <p>域名：${escapeHtml(site.domain)} · ${escapeHtml(sample.window)} · 数据由 ${escapeHtml(sample.capturedWith)} 抽样压缩。现在你可以按 session 细看，再继续加载更多。</p>
        <div class="hero-pill-row">
          <span class="detail-pill">真实 Umami 样例</span>
          <span class="detail-pill">站点搜索可切换</span>
          <span class="detail-pill">可加载更多 session</span>
          <span class="detail-pill">支持展开详情</span>
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

    ${renderSelectedSession(selectedSession)}
    ${renderSessionLibrary(sample)}
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

  ensureSiteState(activeSiteId);
  journeyMain.innerHTML = renderSample(sample, site);

  journeyMain.querySelectorAll(".session-select-button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedSessionBySite[activeSiteId] = button.dataset.sessionId;
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
}

searchInput.addEventListener("input", () => {
  renderSiteList();
  renderJourney();
});

renderSiteList();
renderJourney();
