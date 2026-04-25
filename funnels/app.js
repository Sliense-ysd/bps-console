const siteRegistry = [
  {
    id: "songunique",
    name: "SongUnique",
    domain: "songunique.com",
    status: "native",
    keywords: ["story to song", "checkout", "payment", "testimony"],
  },
  {
    id: "musicmake",
    name: "MusicMake",
    domain: "musicmake.ai",
    status: "native",
    keywords: ["music", "generation", "conversion"],
  },
];

const funnelSamples = window.FUNNEL_SNAPSHOTS || {};
const siteConversionOverview = window.SITE_CONVERSION_OVERVIEW || null;
const searchInput = document.querySelector("#funnel-site-search");
const detailToolbar = document.querySelector(".detail-toolbar");
const siteList = document.querySelector("#funnel-site-list");
const siteTotal = document.querySelector("#funnel-site-total");
const nativeCount = document.querySelector("#funnel-native-count");
const matchCount = document.querySelector("#funnel-match-count");
const funnelMain = document.querySelector("#funnel-main");
const funnelView = document.querySelector("#funnel-view");
const siteConversionView = document.querySelector("#site-conversion-view");
const viewTabs = document.querySelectorAll("[data-funnel-view]");

let activeSiteId = window.location.hash === "#musicmake" ? "musicmake" : "songunique";
let activeView =
  window.location.hash === "#site-conversion-overview"
    ? "site-conversion"
    : "funnels";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getToneClass(tone) {
  if (tone === "success") return "detail-chip success";
  if (tone === "warn") return "detail-chip warn";
  if (tone === "info") return "detail-chip info";
  return "detail-chip";
}

function getFilteredSites() {
  const search = searchInput.value.trim().toLowerCase();
  if (!search) return siteRegistry;

  return siteRegistry.filter((site) =>
    [site.name, site.domain, ...site.keywords].join(" ").toLowerCase().includes(search),
  );
}

function renderSiteList() {
  const filtered = getFilteredSites();
  siteTotal.textContent = `${siteRegistry.length} 个站点`;
  nativeCount.textContent = `${siteRegistry.filter((site) => site.status === "native").length} 个原生漏斗`;
  matchCount.textContent = `${filtered.length} 个结果`;

  if (!filtered.some((site) => site.id === activeSiteId)) {
    activeSiteId = filtered[0]?.id || activeSiteId;
  }

  if (filtered.length === 0) {
    siteList.innerHTML = `
      <section class="empty-state">
        <h2>没有找到站点</h2>
        <p>换个域名、站点名或业务关键词再试。</p>
      </section>
    `;
    funnelMain.innerHTML = `
      <section class="empty-state">
        <h2>右侧没有可展示内容</h2>
        <p>先在左边选中一个站点，再查看它的主链路漏斗。</p>
      </section>
    `;
    return;
  }

  siteList.innerHTML = filtered
    .map(
      (site) => `
        <button class="site-button ${site.id === activeSiteId ? "active" : ""}" data-site-id="${site.id}" type="button">
          <div class="site-button-title">
            <strong>${escapeHtml(site.name)}</strong>
            <span class="site-badge ${site.status === "native" ? "preview" : "catalog"}">
              ${site.status === "native" ? "原生" : "外部"}
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
      renderFunnel();
    });
  });
}

function renderFlow(sample) {
  return sample.stages
    .map(
      (stage, index) => `
        <div class="flow-node">
          <small>${escapeHtml(stage.label)}</small>
          <strong>${escapeHtml(stage.count)}</strong>
        </div>
        ${index === sample.stages.length - 1 ? "" : '<span class="flow-link">→</span>'}
      `,
    )
    .join("");
}

function renderLinkButtons(links) {
  return links
    .map(
      (link) => `
        <a class="lookup-link-button" href="${escapeHtml(link.href)}" target="_blank" rel="noreferrer">
          ${escapeHtml(link.label)}
        </a>
      `,
    )
    .join("");
}

function formatInteger(value) {
  return Number(value || 0).toLocaleString("en-US");
}

function formatRate(value) {
  return `${Number(value || 0).toFixed(1)}%`;
}

function formatUsdCents(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value || 0) / 100);
}

function formatDateTime(value) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function renderNativeSample(sample, site) {
  const summaryStats = sample.summaryStats || [
    { label: "口径", value: sample.window || "当前窗口" },
    {
      label: "主链路成功",
      value: String(sample.totals?.paymentSuccessSessions ?? "-"),
    },
    {
      label: "首页到成功",
      value:
        sample.totals?.overallRate != null
          ? `${sample.totals.overallRate}%`
          : "-",
    },
  ];

  return `
    <section class="journey-hero">
      <div class="hero-copy">
        <div class="detail-pill">原生漏斗</div>
        <h2>${escapeHtml(sample.hero.title)}</h2>
        <p>${escapeHtml(sample.hero.subtitle)}</p>
        <div class="hero-pill-row">
          ${sample.hero.pills
            .map((pill) => `<span class="detail-chip info">${escapeHtml(pill)}</span>`)
            .join("")}
        </div>
      </div>
      ${summaryStats
        .map(
          (item) => `
            <div class="mini-stat">
              <span>${escapeHtml(item.label)}</span>
              <strong>${escapeHtml(item.value)}</strong>
            </div>
          `,
        )
        .join("")}
    </section>

    <section class="journey-grid">
      <article class="detail-card">
        <div class="card-head">
          <div>
            <h3>主链路漏斗</h3>
            <span>${escapeHtml(sample.source)}</span>
          </div>
          <span>${escapeHtml(site.domain)} · 更新于 ${escapeHtml(sample.updatedAt)}</span>
        </div>
        <div class="flow-strip">${renderFlow(sample)}</div>
      </article>

      <article class="detail-card">
        <div class="card-head">
          <div>
            <h3>当前判断</h3>
            <span>先看结构，再决定优化方向</span>
          </div>
        </div>
        <ul class="insight-list">
          ${sample.insights.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </article>
    </section>

    ${
      Array.isArray(sample.subFunnels) && sample.subFunnels.length > 0
        ? sample.subFunnels
            .map(
              (section) => `
                <section class="journey-grid">
                  <article class="detail-card">
                    <div class="card-head">
                      <div>
                        <h3>${escapeHtml(section.title)}</h3>
                        <span>${escapeHtml(section.subtitle)}</span>
                      </div>
                    </div>
                    <div class="flow-strip">${renderFlow(section)}</div>
                  </article>

                  <article class="detail-card">
                    <div class="card-head">
                      <div>
                        <h3>${escapeHtml(section.title)}转化率</h3>
                        <span>拆开看，避免被主漏斗掩盖</span>
                      </div>
                    </div>
                    <div class="session-summary-grid">
                      ${section.conversions
                        .map(
                          (item) => `
                            <div class="summary-panel">
                              <span>${escapeHtml(item.label)}</span>
                              <strong>${escapeHtml(item.rate)}%</strong>
                              <div class="session-chip-row session-chip-row-compact">
                                <span class="${getToneClass(item.tone)}">${escapeHtml(`${item.numerator}/${item.denominator}`)}</span>
                              </div>
                              <div class="detail-note detail-note-muted">${escapeHtml(item.note)}</div>
                            </div>
                          `,
                        )
                        .join("")}
                    </div>
                  </article>
                </section>
              `,
            )
            .join("")
        : ""
    }

    <section class="journey-grid">
      <article class="detail-card">
        <div class="card-head">
          <div>
            <h3>逐步转化率</h3>
            <span>一共有 ${escapeHtml(sample.stages.length)} 个节点，${escapeHtml(Math.max(sample.stages.length - 1, 0))} 个 step conversion rate</span>
          </div>
        </div>
        <div class="session-summary-grid">
          ${sample.conversions
            .map(
              (item) => `
                <div class="summary-panel">
                  <span>${escapeHtml(item.label)}</span>
                  <strong>${escapeHtml(item.rate)}%</strong>
                  <div class="session-chip-row session-chip-row-compact">
                    <span class="${getToneClass(item.tone)}">${escapeHtml(`${item.numerator}/${item.denominator}`)}</span>
                  </div>
                  <div class="detail-note detail-note-muted">${escapeHtml(item.note)}</div>
                </div>
              `,
            )
            .join("")}
        </div>
      </article>

      <article class="detail-card">
        <div class="card-head">
          <div>
            <h3>辅助诊断</h3>
            <span>用于判断问题在入口、表单还是支付阶段</span>
          </div>
        </div>
        <div class="session-summary-grid">
          ${sample.diagnostics
            .map(
              (item) => `
                <div class="summary-panel">
                  <span>${escapeHtml(item.label)}</span>
                  <strong>${escapeHtml(item.value)}</strong>
                  <div class="detail-note detail-note-muted">${escapeHtml(item.note)}</div>
                </div>
              `,
            )
            .join("")}
        </div>
      </article>
    </section>

    <section class="journey-grid">
      <article class="detail-card">
        <div class="card-head">
          <div>
            <h3>建议动作</h3>
            <span>按优先级执行，不要同时改太多变量</span>
          </div>
        </div>
        <ul class="insight-list">
          ${sample.nextActions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </article>

      <article class="detail-card">
        <div class="card-head">
          <div>
            <h3>相关入口</h3>
            <span>漏斗页只做汇总，细看再跳到专门系统</span>
          </div>
        </div>
        <div class="lookup-link-row">
          ${renderLinkButtons(sample.links)}
        </div>
      </article>
    </section>
  `;
}

function renderSiteConversionOverview() {
  if (!siteConversionOverview) {
    siteConversionView.innerHTML = `
      <section class="empty-state">
        <h2>站点转化总览还没有接入</h2>
        <p>当前静态快照不存在，先从 MusicMake 后台查看实时页。</p>
      </section>
    `;
    return;
  }

  const totals = siteConversionOverview.totals || {};
  const rows = siteConversionOverview.siteSummaries || [];
  const risks = siteConversionOverview.risks || [];

  siteConversionView.innerHTML = `
    <section class="journey-hero site-conversion-hero">
      <div class="hero-copy">
        <div class="detail-pill">站点转化总览</div>
        <h2>${escapeHtml(siteConversionOverview.title)}</h2>
        <p>
          ${escapeHtml(siteConversionOverview.window)} · ${escapeHtml(siteConversionOverview.dateRange.startDate)}
          至 ${escapeHtml(siteConversionOverview.dateRange.endDate)}。BPS 只放聚合指标，不写入最近订单和下单人标识。
        </p>
        <div class="hero-pill-row">
          <span class="detail-chip info">${escapeHtml(siteConversionOverview.source)}</span>
          <span class="detail-chip info">更新于 ${escapeHtml(siteConversionOverview.updatedAt)}</span>
        </div>
      </div>
      ${(siteConversionOverview.summaryStats || [])
        .slice(0, 5)
        .map(
          (item) => `
            <div class="mini-stat">
              <span>${escapeHtml(item.label)}</span>
              <strong>${escapeHtml(item.value)}</strong>
            </div>
          `,
        )
        .join("")}
    </section>

    <section class="journey-grid">
      <article class="detail-card">
        <div class="card-head">
          <div>
            <h3>30 天总览</h3>
            <span>访客、checkout、下单人数、订单和收入放在同一个口径里看</span>
          </div>
          <span>${escapeHtml(siteConversionOverview.generatedAt)}</span>
        </div>
        <div class="session-summary-grid site-conversion-summary-grid">
          <div class="summary-panel">
            <span>独立访客</span>
            <strong>${formatInteger(totals.uniqueVisitors)}</strong>
            <div class="detail-note detail-note-muted">来自 tracking_session 与 Umami 访客补充。</div>
          </div>
          <div class="summary-panel">
            <span>Checkout 人数</span>
            <strong>${formatInteger(totals.checkoutActors)}</strong>
            <div class="detail-note detail-note-muted">只计算 payment_attribution 中的 checkout actors。</div>
          </div>
          <div class="summary-panel">
            <span>下单人数</span>
            <strong>${formatInteger(totals.paidOrderUsers)}</strong>
            <div class="detail-note detail-note-muted">同一 actor 多笔订单只算一位买家。</div>
          </div>
          <div class="summary-panel">
            <span>成功订单</span>
            <strong>${formatInteger(totals.paidOrderCount)}</strong>
            <div class="detail-note detail-note-muted">支付成功且订单状态可计入收入。</div>
          </div>
          <div class="summary-panel">
            <span>收入</span>
            <strong>${formatUsdCents(totals.paidRevenueCents)}</strong>
            <div class="detail-note detail-note-muted">只展示汇总金额，不展示单笔订单。</div>
          </div>
          <div class="summary-panel">
            <span>整体转化率</span>
            <strong>${formatRate(totals.overallConversionRate)}</strong>
            <div class="detail-note detail-note-muted">成功下单人数 / 独立访客。</div>
          </div>
        </div>
      </article>

      <article class="detail-card">
        <div class="card-head">
          <div>
            <h3>当前重点</h3>
            <span>先看哪里最值得继续追</span>
          </div>
        </div>
        <div class="session-summary-grid">
          ${(siteConversionOverview.highlights || [])
            .map(
              (item) => `
                <div class="summary-panel">
                  <span>${escapeHtml(item.label)}</span>
                  <strong>${escapeHtml(item.value)}</strong>
                  <div class="session-chip-row session-chip-row-compact">
                    <span class="detail-chip info">${escapeHtml(item.site)}</span>
                  </div>
                  <div class="detail-note detail-note-muted">${escapeHtml(item.note)}</div>
                </div>
              `,
            )
            .join("")}
        </div>
      </article>
    </section>

    <section class="detail-card">
      <div class="card-head">
        <div>
          <h3>站点明细</h3>
          <span>这张表来自 MusicMake 后台总览，但移除了最近订单明细</span>
        </div>
        <span>${escapeHtml(rows.length)} 个有动作的站点</span>
      </div>
      <div class="conversion-table-wrap">
        <table class="conversion-table">
          <thead>
            <tr>
              <th>站点</th>
              <th>数据库</th>
              <th>访客</th>
              <th>Checkout</th>
              <th>下单人数</th>
              <th>订单数</th>
              <th>收入</th>
              <th>访客→Checkout</th>
              <th>转化率</th>
              <th>Checkout→支付</th>
              <th>最近支付</th>
            </tr>
          </thead>
          <tbody>
            ${rows
              .map(
                (row) => `
                  <tr>
                    <td>
                      <strong>${escapeHtml(row.label)}</strong>
                      <span>${escapeHtml(row.note)}</span>
                    </td>
                    <td>${escapeHtml(row.sourceDb)}</td>
                    <td>${formatInteger(row.uniqueVisitors)}</td>
                    <td>${formatInteger(row.checkoutActors)}</td>
                    <td>${formatInteger(row.paidOrderUsers)}</td>
                    <td>${formatInteger(row.paidOrderCount)}</td>
                    <td>${formatUsdCents(row.paidRevenueCents)}</td>
                    <td>${formatRate(row.visitorToCheckoutRate)}</td>
                    <td>${formatRate(row.conversionRate)}</td>
                    <td>${formatRate(row.checkoutCompletionRate)}</td>
                    <td>${formatDateTime(row.latestPaidAt)}</td>
                  </tr>
                `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </section>

    <section class="journey-grid">
      <article class="detail-card">
        <div class="card-head">
          <div>
            <h3>归因提醒</h3>
            <span>影响实际转化率解释的缺口</span>
          </div>
        </div>
        <ul class="insight-list">
          ${risks.map((risk) => `<li>${escapeHtml(risk)}</li>`).join("")}
        </ul>
      </article>

      <article class="detail-card">
        <div class="card-head">
          <div>
            <h3>相关入口</h3>
            <span>需要订单明细时回到管理员后台</span>
          </div>
        </div>
        <div class="lookup-link-row">
          ${renderLinkButtons(siteConversionOverview.links || [])}
        </div>
      </article>
    </section>
  `;
}

function renderFunnel() {
  const site = siteRegistry.find((item) => item.id === activeSiteId);
  const sample = funnelSamples[activeSiteId];

  if (!site || !sample) {
    funnelMain.innerHTML = `
      <section class="empty-state">
        <h2>这个站点还没有漏斗数据</h2>
        <p>可以先保留目录入口，或者后续再把它原生化进 BPS。</p>
      </section>
    `;
    return;
  }

  funnelMain.innerHTML =
    renderNativeSample(sample, site);
}

function setActiveView(view, { updateHash = true } = {}) {
  activeView = view;
  const showSiteConversion = activeView === "site-conversion";

  funnelView.hidden = showSiteConversion;
  siteConversionView.hidden = !showSiteConversion;
  detailToolbar.hidden = showSiteConversion;

  viewTabs.forEach((button) => {
    const active = button.dataset.funnelView === activeView;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });

  if (!updateHash) return;

  const nextHash = showSiteConversion
    ? "#site-conversion-overview"
    : `#${activeSiteId}`;
  if (window.location.hash !== nextHash) {
    history.replaceState(null, "", nextHash);
  }
}

function applyHashState() {
  const hash = window.location.hash.replace(/^#/, "");
  if (hash === "site-conversion-overview") {
    setActiveView("site-conversion", { updateHash: false });
    return;
  }

  if (siteRegistry.some((site) => site.id === hash)) {
    activeSiteId = hash;
  }

  renderSiteList();
  renderFunnel();
  setActiveView("funnels", { updateHash: false });
}

searchInput.addEventListener("input", () => {
  renderSiteList();
  renderFunnel();
});

viewTabs.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveView(button.dataset.funnelView);
  });
});

window.addEventListener("hashchange", applyHashState);

renderSiteConversionOverview();
renderSiteList();
renderFunnel();
setActiveView(activeView, { updateHash: false });
