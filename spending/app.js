// Renders BPS spending dashboard from window.SPENDING_SNAPSHOTS.

const TYPE_LABELS = {
  ads: "广告投放",
  api: "API 用量",
  infra: "基础设施",
  saas: "工具订阅",
  backlink: "外链建设",
};

const TYPE_ORDER = ["ads", "api", "infra", "saas", "backlink"];

const data = window.SPENDING_SNAPSHOTS;

const $total = document.querySelector("#spending-total");
const $window = document.querySelector("#spending-window");
const $delta = document.querySelector("#spending-delta");
const $hero = document.querySelector("#spending-hero");
const $byTypeSection = document.querySelector("#spending-by-type");
const $byTypeGrid = document.querySelector("#spending-by-type-grid");
const $byTypeMeta = document.querySelector("#spending-by-type-meta");
const $monthlySection = document.querySelector("#spending-monthly");
const $monthlyRows = document.querySelector("#spending-monthly-rows");
const $monthlyMeta = document.querySelector("#spending-monthly-meta");
const $recordsSection = document.querySelector("#spending-records");
const $recordRows = document.querySelector("#spending-record-rows");
const $recordFilters = document.querySelector("#spending-record-filters");
const $statusSection = document.querySelector("#spending-status");
const $statusRows = document.querySelector("#spending-status-rows");
const $updated = document.querySelector("#spending-updated");
const $empty = document.querySelector("#spending-empty");

let activeTypeFilter = "all";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function fmtUsd(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
}

function fmtDateRange(from, to) {
  return `${from} → ${to}`;
}

function fmtTime(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function showEmpty(message) {
  $empty.hidden = false;
  if (message) {
    const para = $empty.querySelector("p");
    if (para) para.textContent = message;
  }
}

function renderHero(snapshot) {
  if (!snapshot) return;
  const total = snapshot.totalsUSD?.last30Days || 0;
  $total.textContent = fmtUsd(total);
  $window.textContent = fmtDateRange(snapshot.window?.from || "—", snapshot.window?.to || "—");
  if (total === 0) {
    $delta.textContent = "暂无开销记录";
  } else {
    $delta.textContent = `${snapshot.records?.length || 0} 条记录 · ${(snapshot.collectorStatus || []).filter((s) => s.ok).length} 个数据源 OK`;
  }

  $hero.hidden = false;
  const byType = snapshot.totalsUSD?.last30DaysByType || {};
  const summary = TYPE_ORDER.map((t) => ({ type: t, total: byType[t] || 0 })).filter((s) => s.total > 0);
  const top = summary.slice(0, 3);
  $hero.innerHTML = `
    <div class="hero-copy">
      <div class="detail-pill">${escapeHtml(snapshot.window?.label || "最近 30 天")}</div>
      <h2>${fmtUsd(total)}</h2>
      <p>更新于 ${escapeHtml(fmtTime(snapshot.updatedAt))} · ${escapeHtml(snapshot.records?.length || 0)} 条开销记录。</p>
      <div class="hero-pill-row">
        ${top
          .map(
            (s) => `<span class="detail-chip info">${escapeHtml(TYPE_LABELS[s.type] || s.type)} ${fmtUsd(s.total)}</span>`,
          )
          .join("")}
      </div>
    </div>
    ${TYPE_ORDER.slice(0, 4)
      .map((t) => `
        <div class="mini-stat">
          <span>${escapeHtml(TYPE_LABELS[t])}</span>
          <strong>${fmtUsd(byType[t] || 0)}</strong>
        </div>
      `)
      .join("")}
  `;
}

function renderByType(snapshot) {
  const byType = snapshot.byType || {};
  const totals = snapshot.totalsUSD?.last30DaysByType || {};
  const grandTotal = TYPE_ORDER.reduce((s, t) => s + (totals[t] || 0), 0);
  if (grandTotal <= 0) {
    $byTypeSection.hidden = true;
    return;
  }
  $byTypeSection.hidden = false;
  $byTypeMeta.textContent = `合计 ${fmtUsd(grandTotal)}`;

  $byTypeGrid.innerHTML = TYPE_ORDER.map((type) => {
    const bucket = byType[type] || { total: 0, items: [] };
    const ratio = grandTotal > 0 ? (bucket.total / grandTotal) * 100 : 0;
    const topItems = (bucket.items || [])
      .slice()
      .sort((a, b) => (b.amountUSD || 0) - (a.amountUSD || 0))
      .slice(0, 3);
    const chips = topItems
      .map((it) => `<span class="detail-chip info">${escapeHtml(it.platform)} ${fmtUsd(it.amountUSD)}</span>`)
      .join("");
    return `
      <div class="summary-panel">
        <span>${escapeHtml(TYPE_LABELS[type] || type)}</span>
        <strong>${fmtUsd(bucket.total)}</strong>
        <div class="session-chip-row session-chip-row-compact">
          <span class="detail-chip">${ratio.toFixed(1)}% · ${(bucket.items || []).length} 项</span>
        </div>
        ${chips ? `<div class="hero-pill-row" style="margin-top:8px">${chips}</div>` : ""}
      </div>
    `;
  }).join("");
}

function renderMonthly(snapshot) {
  const archive = snapshot.monthlyArchive || {};
  const months = Object.keys(archive).sort().reverse();
  if (months.length === 0) {
    $monthlySection.hidden = true;
    return;
  }
  $monthlySection.hidden = false;
  $monthlyMeta.textContent = `${months.length} 个月`;
  $monthlyRows.innerHTML = months
    .map((m) => {
      const a = archive[m] || {};
      const t = a.byType || {};
      return `
        <tr>
          <td><strong>${escapeHtml(m)}</strong></td>
          <td>${fmtUsd(t.ads || 0)}</td>
          <td>${fmtUsd(t.api || 0)}</td>
          <td>${fmtUsd(t.infra || 0)}</td>
          <td>${fmtUsd(t.saas || 0)}</td>
          <td>${fmtUsd(t.backlink || 0)}</td>
          <td><strong>${fmtUsd(a.totalUSD || 0)}</strong></td>
        </tr>
      `;
    })
    .join("");
}

function renderRecordFilters(snapshot) {
  const types = ["all", ...TYPE_ORDER];
  $recordFilters.innerHTML = types
    .map((t) => {
      const label = t === "all" ? "全部" : TYPE_LABELS[t] || t;
      const active = t === activeTypeFilter ? " success" : " info";
      return `<button class="detail-chip${active}" data-filter="${escapeHtml(t)}" type="button" style="cursor:pointer;border:none">${escapeHtml(label)}</button>`;
    })
    .join("");
  $recordFilters.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeTypeFilter = btn.dataset.filter;
      renderRecordFilters(snapshot);
      renderRecordRows(snapshot);
    });
  });
}

function renderRecordRows(snapshot) {
  const rows = (snapshot.records || []).filter((r) => activeTypeFilter === "all" || r.type === activeTypeFilter);
  if (rows.length === 0) {
    $recordRows.innerHTML = `<tr><td colspan="6" class="detail-note detail-note-muted">该类型还没有记录。</td></tr>`;
    return;
  }
  $recordRows.innerHTML = rows
    .map(
      (r) => `
        <tr>
          <td><strong>${escapeHtml(r.platform)}</strong></td>
          <td>${escapeHtml(TYPE_LABELS[r.type] || r.type)}</td>
          <td>${escapeHtml(r.site || "—")}</td>
          <td>${escapeHtml(r.periodStart)} → ${escapeHtml(r.periodEnd)}</td>
          <td><span class="detail-chip ${r.source?.startsWith("auto") ? "success" : "info"}">${escapeHtml(r.source)}</span></td>
          <td><strong>${fmtUsd(r.amountUSD)}</strong></td>
        </tr>
      `,
    )
    .join("");
}

function renderRecords(snapshot) {
  if (!snapshot.records?.length) {
    $recordsSection.hidden = true;
    return;
  }
  $recordsSection.hidden = false;
  renderRecordFilters(snapshot);
  renderRecordRows(snapshot);
}

function renderStatus(snapshot) {
  const list = snapshot.collectorStatus || [];
  if (!list.length) {
    $statusSection.hidden = true;
    return;
  }
  $statusSection.hidden = false;
  $updated.textContent = `更新于 ${fmtTime(snapshot.updatedAt)}`;
  $statusRows.innerHTML = list
    .map((s) => {
      const tone = s.ok ? "success" : "warn";
      return `
        <div class="summary-panel">
          <span>${escapeHtml(s.source)}</span>
          <strong>${fmtUsd((s.recordCount || 0) ? (snapshot.records?.filter((r) => r.source?.includes(s.source)).reduce((sum, r) => sum + (r.amountUSD || 0), 0) || 0) : 0)}</strong>
          <div class="session-chip-row session-chip-row-compact">
            <span class="detail-chip ${tone}">${s.ok ? "OK" : "FAIL"} · ${s.recordCount || 0} 条</span>
            <span class="detail-chip">${s.durationMs}ms</span>
          </div>
          <div class="detail-note detail-note-muted">${escapeHtml(s.note || "")}</div>
        </div>
      `;
    })
    .join("");
}

function render() {
  if (!data || typeof data !== "object") {
    showEmpty();
    return;
  }
  if ((data.records || []).length === 0 && Object.keys(data.monthlyArchive || {}).length === 0) {
    showEmpty("当前快照里没有任何开销记录。先在 manual-entries.json 填几条手动数据，或检查 collector 日志。");
    renderHero(data);
    renderStatus(data);
    return;
  }
  $empty.hidden = true;
  renderHero(data);
  renderByType(data);
  renderMonthly(data);
  renderRecords(data);
  renderStatus(data);
}

render();
