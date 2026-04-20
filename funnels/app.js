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
const searchInput = document.querySelector("#funnel-site-search");
const siteList = document.querySelector("#funnel-site-list");
const siteTotal = document.querySelector("#funnel-site-total");
const nativeCount = document.querySelector("#funnel-native-count");
const matchCount = document.querySelector("#funnel-match-count");
const funnelMain = document.querySelector("#funnel-main");

let activeSiteId = "songunique";

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

searchInput.addEventListener("input", () => {
  renderSiteList();
  renderFunnel();
});

renderSiteList();
renderFunnel();
