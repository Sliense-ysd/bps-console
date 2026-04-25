#!/usr/bin/env node
// Pulls actual spending from Stripe / OpenRouter / Cloudflare R2 / Google Ads,
// merges with manual-entries.json, writes spending/data.js with rolling-30-day
// totals, byType breakdown, records, monthly archive, and collector status.
//
// Usage:
//   node scripts/collect-spending.mjs
//
// Optional env:
//   HTTPS_PROXY=http://127.0.0.1:7897   # required for Google Ads on most networks
//   SPENDING_DAYS=30                    # override rolling window length

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getHkdPerUsd, hkdToUsd } from "./lib/exchange-rate.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const WINDOW_DAYS = Number(process.env.SPENDING_DAYS || 30);

// ---------- Load secrets from ~/ai-shared/secrets/ (.env + selected .md) ----------
async function loadSecrets() {
  const dir = path.resolve(process.env.HOME, "ai-shared/secrets");
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (!e.isFile() || !e.name.endsWith(".env")) continue;
    try {
      const content = await fs.readFile(path.join(dir, e.name), "utf8");
      for (const raw of content.split("\n")) {
        const line = raw.trim();
        if (!line || line.startsWith("#")) continue;
        const m = line.match(/^(?:export\s+)?([A-Z][A-Z0-9_]*)\s*=\s*(.*)$/);
        if (!m) continue;
        let val = m[2];
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (process.env[m[1]] == null) process.env[m[1]] = val;
      }
    } catch {}
  }
  // Pick up the OpenRouter key from openrouter.md (markdown-stored secret)
  if (!process.env.OPENROUTER_API_KEY) {
    try {
      const md = await fs.readFile(path.join(dir, "openrouter.md"), "utf8");
      const m = md.match(/`(sk-or-v1-[A-Za-z0-9_-]+)`/);
      if (m) process.env.OPENROUTER_API_KEY = m[1];
    } catch {}
  }
}

// ---------- Helpers ----------
const isoDate = (d) => d.toISOString().slice(0, 10);
const round2 = (n) => Math.round(n * 100) / 100;
function daysAgoUtc(n) {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() - n);
  return d;
}

// ---------- Stripe ----------
const STRIPE_KEY_LABELS = [
  ["STRIPE_SECRET_KEY_MUSICMAKE_LIVE", "musicmake.ai"],
  ["STRIPE_SECRET_KEY_NANOBANANA_LIVE", "nanobanana-pro.org"],
  ["STRIPE_SECRET_KEY_SORA30_LIVE", "sora30"],
  ["STRIPE_SECRET_KEY_KLING4PRO_COM_LIVE", "kling4pro.com"],
  ["STRIPE_SECRET_KEY_SEEDANCE30_COM_LIVE", "seedance30.com"],
  ["STRIPE_SECRET_KEY_SEEDANCE3VIDEO_COM_LIVE", "seedance3video.com"],
  ["STRIPE_SECRET_KEY_IMG2VIDEO_IO_LIVE", "img2video.io"],
];

async function fetchStripeFees(fromDate, toDate) {
  const start = Date.now();
  const fromTs = Math.floor(fromDate.getTime() / 1000);
  const toTs = Math.floor((toDate.getTime() + 86400000) / 1000) - 1;
  const records = [];
  const debug = [];

  for (const [envName, site] of STRIPE_KEY_LABELS) {
    const key = process.env[envName];
    if (!key) {
      debug.push(`${site}: key missing`);
      continue;
    }
    let totalCents = 0;
    let count = 0;
    let starting_after = null;
    let pageError = null;
    try {
      while (true) {
        const params = new URLSearchParams({
          type: "stripe_fee",
          "created[gte]": String(fromTs),
          "created[lte]": String(toTs),
          limit: "100",
        });
        if (starting_after) params.set("starting_after", starting_after);
        const res = await fetch(`https://api.stripe.com/v1/balance_transactions?${params}`, {
          headers: { Authorization: `Bearer ${key}` },
        });
        if (!res.ok) {
          pageError = `HTTP ${res.status}`;
          break;
        }
        const json = await res.json();
        for (const tx of json.data || []) {
          totalCents += Math.abs(tx.amount);
          count++;
        }
        if (json.has_more && json.data?.length) {
          starting_after = json.data[json.data.length - 1].id;
        } else break;
      }
    } catch (err) {
      pageError = err.message;
    }
    const usd = totalCents / 100;
    if (usd > 0) {
      records.push({
        id: `stripe-fee-${site}-${isoDate(fromDate)}-${isoDate(toDate)}`,
        date: isoDate(toDate),
        type: "infra",
        platform: "Stripe",
        site,
        amountUSD: round2(usd),
        currency: "USD",
        source: "auto:stripe-balance-transactions",
        periodStart: isoDate(fromDate),
        periodEnd: isoDate(toDate),
        note: `${count} stripe_fee transactions`,
      });
    }
    debug.push(pageError ? `${site}: ${pageError}` : `${site}: $${usd.toFixed(2)} / ${count}tx`);
  }
  return {
    source: "stripe",
    ok: records.length > 0 || debug.every((d) => d.includes("$0.00")),
    records,
    durationMs: Date.now() - start,
    note: debug.join("; "),
  };
}

// ---------- OpenRouter ----------
async function fetchOpenRouterUsage(fromDate, toDate) {
  const start = Date.now();
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) {
    return { source: "openrouter", ok: false, records: [], durationMs: Date.now() - start, note: "OPENROUTER_API_KEY missing" };
  }
  try {
    // Try generation list first (date-filterable client-side)
    const listRes = await fetch("https://openrouter.ai/api/v1/generation?limit=1000", {
      headers: { Authorization: `Bearer ${key}` },
    });
    if (listRes.ok) {
      const json = await listRes.json();
      const list = Array.isArray(json?.data) ? json.data : [];
      const fromMs = fromDate.getTime();
      const toMs = toDate.getTime() + 86400000 - 1;
      const inWindow = list.filter((g) => {
        const t = new Date(g.created_at || 0).getTime();
        return t >= fromMs && t <= toMs;
      });
      const total = inWindow.reduce((s, g) => s + (Number(g.total_cost) || 0), 0);
      const records = total > 0 ? [{
        id: `openrouter-${isoDate(fromDate)}-${isoDate(toDate)}`,
        date: isoDate(toDate),
        type: "api",
        platform: "OpenRouter",
        site: null,
        amountUSD: round2(total),
        currency: "USD",
        source: "auto:openrouter-generation-list",
        periodStart: isoDate(fromDate),
        periodEnd: isoDate(toDate),
        note: `${inWindow.length} generations in window`,
      }] : [];
      return {
        source: "openrouter",
        ok: true,
        records,
        durationMs: Date.now() - start,
        note: `${inWindow.length}/${list.length} generations in window`,
      };
    }
    // Fallback to lifetime credits
    const credRes = await fetch("https://openrouter.ai/api/v1/credits", {
      headers: { Authorization: `Bearer ${key}` },
    });
    if (!credRes.ok) {
      return { source: "openrouter", ok: false, records: [], durationMs: Date.now() - start, note: `generation HTTP ${listRes.status}, credits HTTP ${credRes.status}` };
    }
    const credJson = await credRes.json();
    const usage = Number(credJson?.data?.total_usage ?? 0);
    return {
      source: "openrouter",
      ok: true,
      records: [{
        id: `openrouter-lifetime-${isoDate(toDate)}`,
        date: isoDate(toDate),
        type: "api",
        platform: "OpenRouter",
        site: null,
        amountUSD: round2(usage),
        currency: "USD",
        source: "auto:openrouter-credits-lifetime",
        periodStart: isoDate(fromDate),
        periodEnd: isoDate(toDate),
        note: "fallback: lifetime total_usage (generation list unavailable)",
      }],
      durationMs: Date.now() - start,
      note: "fallback to lifetime credits",
    };
  } catch (err) {
    return { source: "openrouter", ok: false, records: [], durationMs: Date.now() - start, note: err.message };
  }
}

// ---------- Cloudflare R2 ----------
const CLASS_A_OPS = new Set([
  "ListBuckets", "PutObject", "CopyObject", "CompleteMultipartUpload",
  "CreateMultipartUpload", "UploadPart", "ListMultipartUploads",
  "PutBucketCors", "PutBucketLifecycle", "DeleteObject", "ListObjectsV2",
  "PutBucketEncryption", "PutBucketVersioning",
]);

const R2_ACCOUNTS = [
  ["R2_MUSICMAKE_ACCOUNT_ID", "musicmake"],
  ["R2_NANOBANANA_ACCOUNT_ID", "nanobanana"],
];

async function fetchCloudflareR2Cost(fromDate, toDate) {
  const start = Date.now();
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!token) {
    return { source: "cloudflare-r2", ok: false, records: [], durationMs: Date.now() - start, note: "CLOUDFLARE_API_TOKEN missing" };
  }
  const records = [];
  const debug = [];
  for (const [envName, label] of R2_ACCOUNTS) {
    const accountTag = process.env[envName];
    if (!accountTag) {
      debug.push(`${label}: ${envName} missing`);
      continue;
    }
    const query = `query R2($accountTag: string!, $from: Date!, $to: Date!) {
      viewer { accounts(filter: { accountTag: $accountTag }) {
        r2StorageAdaptiveGroups(limit: 10000, filter: { date_geq: $from, date_leq: $to }, orderBy: [date_ASC]) {
          dimensions { date }
          max { payloadSize }
        }
        r2OperationsAdaptiveGroups(limit: 10000, filter: { date_geq: $from, date_leq: $to }, orderBy: [date_ASC]) {
          dimensions { date actionType }
          sum { requests }
        }
      } }
    }`;
    try {
      const res = await fetch("https://api.cloudflare.com/client/v4/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { accountTag, from: isoDate(fromDate), to: isoDate(toDate) },
        }),
      });
      if (!res.ok) {
        debug.push(`${label}: HTTP ${res.status}`);
        continue;
      }
      const json = await res.json();
      if (json.errors?.length) {
        debug.push(`${label}: ${json.errors[0].message}`);
        continue;
      }
      const acct = json?.data?.viewer?.accounts?.[0];
      if (!acct) {
        debug.push(`${label}: no account match`);
        continue;
      }
      const storageRows = acct.r2StorageAdaptiveGroups || [];
      const opsRows = acct.r2OperationsAdaptiveGroups || [];
      const days = storageRows.length || 1;
      const avgBytes = storageRows.reduce((s, r) => s + (r.max?.payloadSize || 0), 0) / days;
      const avgGB = avgBytes / 1e9;

      let classA = 0, classB = 0;
      for (const row of opsRows) {
        const action = row.dimensions?.actionType || "";
        if (CLASS_A_OPS.has(action)) classA += row.sum?.requests || 0;
        else classB += row.sum?.requests || 0;
      }
      const storageCost = Math.max(0, avgGB - 10) * 0.015;
      const aCost = (classA / 1000) * 0.0045;
      const bCost = (classB / 1000) * 0.00036;
      const total = storageCost + aCost + bCost;

      if (total >= 0.01) {
        records.push({
          id: `r2-${label}-${isoDate(fromDate)}-${isoDate(toDate)}`,
          date: isoDate(toDate),
          type: "infra",
          platform: `Cloudflare R2 (${label})`,
          site: null,
          amountUSD: round2(total),
          currency: "USD",
          source: "auto:cloudflare-r2-graphql",
          periodStart: isoDate(fromDate),
          periodEnd: isoDate(toDate),
          note: `avg ${avgGB.toFixed(2)} GB · ClassA ${classA} · ClassB ${classB}`,
        });
      }
      debug.push(`${label}: $${total.toFixed(4)} (avg ${avgGB.toFixed(2)} GB, A=${classA}, B=${classB})`);
    } catch (err) {
      debug.push(`${label}: ERR ${err.message}`);
    }
  }
  return {
    source: "cloudflare-r2",
    ok: debug.some((d) => d.includes("$")),
    records,
    durationMs: Date.now() - start,
    note: debug.join("; "),
  };
}

// ---------- Google Ads ----------
async function fetchGoogleAdsSpend(fromDate, toDate) {
  const start = Date.now();
  let cfg;
  try {
    const md = await fs.readFile(path.resolve(process.env.HOME, "ai-shared/secrets/google-ads-api.md"), "utf8");
    const block = md.match(/```python\n([\s\S]*?)```/)?.[1];
    if (!block) throw new Error("python block not found");
    cfg = {
      dev: block.match(/"developer_token":\s*"([^"]+)"/)?.[1],
      cid: block.match(/"client_id":\s*"([^"]+)"/)?.[1],
      csec: block.match(/"client_secret":\s*"([^"]+)"/)?.[1],
      rt: block.match(/"refresh_token":\s*"([^"]+)"/)?.[1],
      mcc: block.match(/MCC_CUSTOMER_ID\s*=\s*"([^"]+)"/)?.[1],
    };
    if (!cfg.dev || !cfg.cid || !cfg.csec || !cfg.rt || !cfg.mcc) throw new Error("incomplete config block");
  } catch (err) {
    return { source: "google-ads", ok: false, records: [], durationMs: Date.now() - start, note: `config: ${err.message}` };
  }

  let accessToken;
  try {
    const tRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: cfg.cid,
        client_secret: cfg.csec,
        refresh_token: cfg.rt,
        grant_type: "refresh_token",
      }),
    });
    if (!tRes.ok) {
      return { source: "google-ads", ok: false, records: [], durationMs: Date.now() - start, note: `oauth HTTP ${tRes.status}` };
    }
    accessToken = (await tRes.json()).access_token;
    if (!accessToken) throw new Error("no access_token in response");
  } catch (err) {
    return { source: "google-ads", ok: false, records: [], durationMs: Date.now() - start, note: `oauth ${err.message}` };
  }

  // MCC accounts cannot return metrics directly — must enumerate child customers first.
  const VERSIONS_TO_TRY = ["v21", "v20", "v19", "v18", "v17"];
  let usedVersion = null;
  let totalMicros = 0;
  let currencyCode = "HKD";
  let lastErr = null;

  async function gaqlSearch(ver, customerId, query) {
    const res = await fetch(`https://googleads.googleapis.com/${ver}/customers/${customerId}/googleAds:search`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "developer-token": cfg.dev,
        "login-customer-id": cfg.mcc,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    return res;
  }

  function parseGaqlError(txt) {
    let compact = txt.slice(0, 600);
    try {
      const j = JSON.parse(txt);
      const msgs = j?.error?.details?.[0]?.errors?.map((e) => e.message).filter(Boolean);
      if (msgs?.length) compact = msgs.slice(0, 3).join(" | ");
      else if (j?.error?.message) compact = j.error.message;
    } catch {}
    return compact;
  }

  // Step A: pick a working API version + enumerate non-manager child customers under MCC.
  let childIds = [];
  for (const ver of VERSIONS_TO_TRY) {
    try {
      const enumQuery = `SELECT customer_client.id, customer_client.descriptive_name, customer_client.level, customer_client.manager, customer_client.currency_code FROM customer_client WHERE customer_client.status = 'ENABLED'`;
      const res = await gaqlSearch(ver, cfg.mcc, enumQuery);
      if (res.status === 404) { lastErr = `${ver}: 404`; continue; }
      if (!res.ok) {
        const txt = await res.text();
        return { source: "google-ads", ok: false, records: [], durationMs: Date.now() - start, note: `${ver} enum HTTP ${res.status}: ${parseGaqlError(txt)}` };
      }
      const data = await res.json();
      const clients = data.results || [];
      for (const r of clients) {
        const cc = r.customerClient || {};
        if (cc.manager) continue;
        const id = String(cc.id || "");
        if (!id || id === cfg.mcc) continue;
        childIds.push({ id, name: cc.descriptiveName || id, currency: cc.currencyCode || "HKD" });
      }
      usedVersion = ver;
      break;
    } catch (err) {
      lastErr = `${ver}: ${err.message}`;
    }
  }
  if (!usedVersion) {
    return { source: "google-ads", ok: false, records: [], durationMs: Date.now() - start, note: `all versions failed; last: ${lastErr}` };
  }
  if (childIds.length === 0) {
    return { source: "google-ads", ok: true, records: [], durationMs: Date.now() - start, note: `${usedVersion} OK, but MCC ${cfg.mcc} has no client accounts` };
  }

  // Step B: query metrics for each child customer.
  const perChild = [];
  for (const child of childIds) {
    try {
      const q = `SELECT metrics.cost_micros, customer.currency_code FROM campaign WHERE segments.date BETWEEN '${isoDate(fromDate)}' AND '${isoDate(toDate)}'`;
      const res = await gaqlSearch(usedVersion, child.id, q);
      if (!res.ok) {
        const txt = await res.text();
        perChild.push({ id: child.id, name: child.name, error: parseGaqlError(txt) });
        continue;
      }
      const data = await res.json();
      let micros = 0;
      for (const row of data.results || []) {
        micros += Number(row.metrics?.costMicros || 0);
      }
      if (data.results?.[0]?.customer?.currencyCode) currencyCode = data.results[0].customer.currencyCode;
      else if (child.currency) currencyCode = child.currency;
      totalMicros += micros;
      perChild.push({ id: child.id, name: child.name, micros, currency: currencyCode });
    } catch (err) {
      perChild.push({ id: child.id, name: child.name, error: err.message });
    }
  }

  const totalLocal = totalMicros / 1_000_000;
  let totalUSD = totalLocal;
  let rateNote = "";
  if (currencyCode === "HKD") {
    const r = await getHkdPerUsd();
    totalUSD = hkdToUsd(totalLocal, r.rate);
    rateNote = ` HKD@${r.rate.toFixed(4)}(${r.source})`;
  } else if (currencyCode !== "USD") {
    rateNote = ` ⚠️${currencyCode}→USD 1:1 假设`;
  }

  const childSummary = perChild
    .map((c) => c.error ? `${c.name}: ERR ${c.error.slice(0, 60)}` : `${c.name}: ${(c.micros / 1e6).toFixed(2)} ${c.currency}`)
    .join("; ");

  const records = totalUSD > 0 ? [{
    id: `google-ads-${isoDate(fromDate)}-${isoDate(toDate)}`,
    date: isoDate(toDate),
    type: "ads",
    platform: "Google Ads",
    site: null,
    amountUSD: round2(totalUSD),
    currency: "USD",
    source: "auto:google-ads-search",
    periodStart: isoDate(fromDate),
    periodEnd: isoDate(toDate),
    note: `${totalLocal.toFixed(2)} ${currencyCode}${rateNote} via ${usedVersion} (${childIds.length} child accts)`,
  }] : [];
  return {
    source: "google-ads",
    ok: true,
    records,
    durationMs: Date.now() - start,
    note: `${totalLocal.toFixed(2)} ${currencyCode}${rateNote} via ${usedVersion}; ${childSummary}`,
  };
}

// ---------- Manual entries ----------
async function loadManualEntries(fromDate, toDate) {
  const start = Date.now();
  try {
    const json = JSON.parse(await fs.readFile(path.join(ROOT, "spending/manual-entries.json"), "utf8"));
    const fromIso = isoDate(fromDate);
    const toIso = isoDate(toDate);
    const records = [];
    let total = 0, kept = 0;
    for (const e of json.entries || []) {
      total++;
      if (!e.periodStart || !e.periodEnd) continue;
      if (e.periodEnd < fromIso) continue;
      if (e.periodStart > toIso) continue;
      const amount = Number(e.amount || 0);
      if (amount <= 0) continue;
      records.push({
        id: e.id,
        date: e.periodEnd,
        type: e.type,
        platform: e.platform,
        site: e.site || null,
        amountUSD: round2(amount),
        currency: "USD",
        source: "manual",
        periodStart: e.periodStart,
        periodEnd: e.periodEnd,
        note: e.note || "",
      });
      kept++;
    }
    return {
      source: "manual",
      ok: true,
      records,
      durationMs: Date.now() - start,
      note: `${kept}/${total} entries with amount>0 in window`,
    };
  } catch (err) {
    return { source: "manual", ok: false, records: [], durationMs: Date.now() - start, note: err.message };
  }
}

// ---------- Aggregation ----------
function buildSnapshot(allRecords, fromDate, toDate, statuses) {
  const TYPES = ["ads", "api", "infra", "saas", "backlink"];
  const byType = {};
  for (const t of TYPES) byType[t] = { total: 0, items: [] };
  let last30 = 0;
  for (const r of allRecords) {
    last30 += r.amountUSD;
    if (!byType[r.type]) byType[r.type] = { total: 0, items: [] };
    byType[r.type].total += r.amountUSD;
    byType[r.type].items.push(r);
  }
  for (const t of TYPES) byType[t].total = round2(byType[t].total);

  const last30DaysByType = {};
  for (const t of TYPES) last30DaysByType[t] = byType[t].total;

  return {
    updatedAt: new Date().toISOString(),
    window: { from: isoDate(fromDate), to: isoDate(toDate), label: `最近 ${WINDOW_DAYS} 天` },
    totalsUSD: { last30Days: round2(last30), last30DaysByType },
    byType,
    records: allRecords.slice().sort((a, b) => (b.amountUSD || 0) - (a.amountUSD || 0)),
    collectorStatus: statuses.map((s) => ({
      source: s.source,
      ok: s.ok,
      durationMs: s.durationMs,
      note: s.note,
      recordCount: s.records?.length || 0,
    })),
  };
}

async function mergeMonthlyArchive(snapshot) {
  const archivePath = path.join(ROOT, "spending/.monthly-archive.json");
  let archive = {};
  try { archive = JSON.parse(await fs.readFile(archivePath, "utf8")); } catch {}

  // The current run represents "rolling 30 days as of today" — record it under today's month
  // as a snapshot. Each subsequent run on the same month overwrites (rolls forward).
  // Preserves any prior months already on disk for trend-tracking across collector runs.
  const todayMonth = snapshot.window.to.slice(0, 7);
  archive[todayMonth] = {
    totalUSD: snapshot.totalsUSD.last30Days,
    byType: { ...snapshot.totalsUSD.last30DaysByType },
    snapshotAt: snapshot.updatedAt,
    windowFrom: snapshot.window.from,
    windowTo: snapshot.window.to,
    note: "rolling 30 days as of windowTo",
  };

  const sorted = Object.keys(archive).sort();
  const trimmed = {};
  for (const m of sorted.slice(-12)) trimmed[m] = archive[m];
  await fs.writeFile(archivePath, JSON.stringify(trimmed, null, 2));
  return trimmed;
}

// ---------- Main ----------
async function main() {
  await loadSecrets();
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const fromDate = daysAgoUtc(WINDOW_DAYS);
  const toDate = today;

  console.log(`[collect-spending] window ${isoDate(fromDate)} → ${isoDate(toDate)}`);

  const settled = await Promise.allSettled([
    fetchStripeFees(fromDate, toDate),
    fetchOpenRouterUsage(fromDate, toDate),
    fetchCloudflareR2Cost(fromDate, toDate),
    fetchGoogleAdsSpend(fromDate, toDate),
    loadManualEntries(fromDate, toDate),
  ]);
  const labels = ["stripe", "openrouter", "cloudflare-r2", "google-ads", "manual"];
  const statuses = settled.map((s, i) => {
    if (s.status === "fulfilled") return s.value;
    return { source: labels[i], ok: false, records: [], durationMs: 0, note: String(s.reason?.message || s.reason) };
  });

  const allRecords = [];
  for (const s of statuses) for (const r of s.records || []) allRecords.push(r);

  const snapshot = buildSnapshot(allRecords, fromDate, toDate, statuses);
  snapshot.monthlyArchive = await mergeMonthlyArchive(snapshot);

  const out = `// AUTO-GENERATED ${snapshot.updatedAt} — do not edit by hand. Run scripts/collect-spending.mjs.\nwindow.SPENDING_SNAPSHOTS = ${JSON.stringify(snapshot, null, 2)};\n`;
  await fs.writeFile(path.join(ROOT, "spending/data.js"), out);

  console.log("\n=== Collector Status ===");
  for (const s of statuses) {
    console.log(`[${s.ok ? "OK  " : "FAIL"}] ${s.source.padEnd(15)} ${(s.records?.length || 0)} rec  ${String(s.durationMs).padStart(5)}ms  ${s.note || ""}`);
  }
  console.log(`\nTotal last ${WINDOW_DAYS} days: $${snapshot.totalsUSD.last30Days.toFixed(2)}`);
  console.log(`By type:`, snapshot.totalsUSD.last30DaysByType);
  console.log(`Wrote spending/data.js (${out.length} bytes)`);
}

main().catch((err) => {
  console.error("collector failed:", err);
  process.exit(1);
});
