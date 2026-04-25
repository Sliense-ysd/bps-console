# 开支看板（/spending/）

BPS 总控台的「成本」分类入口。汇总最近 30 天五大成本类型（ads / api / infra / saas / backlink），首屏总额 + 类型拆分，下方月度归档表。

## 文件结构

```
spending/
├── index.html              # 子页框架（复用 funnels 的 detail-shell 模式）
├── app.js                  # 渲染逻辑：读 window.SPENDING_SNAPSHOTS 输出 hero / 拆分 / 月度 / 明细
├── data.js                 # 数据快照（自动生成，不要手改）
├── manual-entries.json     # 手动开支真源（这里改）
├── .monthly-archive.json   # 月度归档累积（自动生成，会被 collector 滚动维护）
└── README.md               # 本文件
```

## 快速使用

```bash
# 在 bps-console 仓库根目录跑：
HTTPS_PROXY=http://127.0.0.1:7897 HTTP_PROXY=http://127.0.0.1:7897 \
  node scripts/collect-spending.mjs

# 然后刷新本地预览或 push 到 main 让 Dokploy 部署
```

代理变量是 Google Ads API 必需的（你的 MCC 账号在 Google 直连受限的网络上）。其他三个 API（Stripe / OpenRouter / Cloudflare）不依赖代理。

## 数据来源（v1）

| 来源 | 类型 | 自动 / 手动 | 说明 |
|------|------|-------------|------|
| Stripe `balance_transactions` | infra | 自动 | 7 个 live key 全部循环，求和 `type=stripe_fee` 的 \|amount\| |
| OpenRouter `/generation` 或 `/credits` | api | 自动 | 优先 generation list 求和 `total_cost`；失败回退 lifetime `total_usage` |
| Cloudflare R2 GraphQL Analytics | infra | 自动（需 token 权限） | 算 storage GB-month + Class A/B 操作；首 10GB 免 |
| Google Ads API GAQL | ads | 自动 | 枚举 MCC 下的 child customers，对每个 query `metrics.cost_micros`；HKD/USD 自动换算 |
| `manual-entries.json` | 任意 | 手动 | Microsoft Ads / Anthropic / OpenAI / xAI / Google AI Studio / Hostinger / SaaS 订阅 / 域名 / 外链 publisher |

## manual-entries.json 怎么写

```json
{
  "version": 1,
  "lastEdited": "2026-04-25",
  "entries": [
    {
      "id": "anthropic-2026-04",
      "type": "api",
      "platform": "Anthropic",
      "periodStart": "2026-04-01",
      "periodEnd": "2026-04-30",
      "amount": 120.50,
      "currency": "USD",
      "site": null,
      "note": "Anthropic Console > Billing 当月数字"
    }
  ]
}
```

字段说明：

- `id`：唯一 ID，建议格式 `<platform>-<YYYY-MM>`
- `type`：`ads` / `api` / `infra` / `saas` / `backlink` 五选一
- `platform`：账单平台名（前端会直接展示）
- `periodStart` / `periodEnd`：账单覆盖区间（ISO 日期）。collector 会用 `periodEnd >= 窗口起点 AND periodStart <= 窗口终点` 判断是否落入近 30 天
- `amount`：金额数字，**不是字符串**
- `currency`：v1 只支持 USD（其他币种暂按 1:1 当 USD，实测会偏差，看你需要再扩）
- `site`：可选，关联的业务站点；不填就是公共开销
- `note`：自由备注

记得每次跑 collector 前更新 `lastEdited`。

## 各平台手动数据获取步骤

### Microsoft Ads（v1 暂手动；v2 用 SOAP）
1. 登录 https://ads.microsoft.com
2. Reports → Account performance → 选近 30 天
3. 复制 Spend 列总和 → 写到 `microsoft-ads-2026-04` 条目
4. 注意货币（一般是 USD，否则要换算）

### Anthropic
1. https://console.anthropic.com/settings/billing
2. 当月 Usage 数字

### OpenAI
1. https://platform.openai.com/usage
2. "This Month" 总额

### xAI Grok
1. https://console.x.ai
2. Billing → 当月

### Google AI Studio
1. https://console.cloud.google.com/billing
2. 找 Generative Language API 行

### Hostinger VPS
- 月费固定的话直接填合同价
- 否则在 hpanel.hostinger.com 看最近一笔账单

### Resend / Roxy / IPRoyal / DataForSEO / SE Ranking
- 各家后台 Billing 页面复制当月账单数字

### 域名续费
- Cloudflare / Namecheap / Hostinger 各家后台合计当月续费金额

## 已知问题与排查

### Cloudflare R2 报 "not authorized for that account"

`CLOUDFLARE_API_TOKEN` 没有 R2 账号的 **Account Analytics: Read** 权限。修复：

1. 登录 Cloudflare dashboard → My Profile → API Tokens
2. 编辑现有 token 或创建新 token
3. 添加 Permissions：
   - `Account` → `Account Analytics` → `Read`
   - 同时为 `R2_MUSICMAKE_ACCOUNT_ID` 和 `R2_NANOBANANA_ACCOUNT_ID` 两个账号都授权
4. 保存后更新 `~/ai-shared/secrets/services.env` 的 `CLOUDFLARE_API_TOKEN`
5. 重跑 collector 验证

### Google Ads 返回 INVALID_ARGUMENT
- 大概率是 GAQL query 字段在新版本里改名。Google Ads API 每季度发新版本，旧字段可能 deprecate。改 `gaqlSearch` 里的 query 字符串。

### Google Ads 返回 "developer token not approved"
- 当前是 Explorer Access（2880 ops/day）。如果一天跑超过这个数，会被限流。日常 collector 一天调几次没问题。
- 想升 Basic Access 去 https://ads.google.com/aw/apicenter 申请

### Google Ads OAuth refresh token 失效
- 错误信息会有 `invalid_grant`
- 重新做 OAuth 授权流程，更新 `~/ai-shared/secrets/google-ads-api.md` 的 `refresh_token`

### OpenRouter 一直走 lifetime fallback
- `/api/v1/generation` 实际是按 ID 查单条，不是列表。代码已经做好 fallback 到 `/credits`，显示的是 lifetime `total_usage`
- 如果想要真正的 30 天数字：把当前 lifetime 数减去上次跑 collector 时的 lifetime 数；这个增量就是这段时间的实际开销。可以在 manual-entries.json 里手填覆盖

### Stripe 某个 key 报 401
- key 被 rotate 了，去对应站点 Stripe dashboard 重新拷贝 → 更新 `~/ai-shared/secrets/payments.env`

## 架构说明

`spending/data.js` 是**自动生成的快照**，每次 collector 跑都会重写。它的 schema：

```js
window.SPENDING_SNAPSHOTS = {
  updatedAt,                   // ISO timestamp
  window: { from, to, label },
  totalsUSD: { last30Days, last30DaysByType: {ads,api,infra,saas,backlink} },
  byType: {
    ads: { total, items: [...records of this type] },
    api: { ... },
    infra: { ... },
    saas: { ... },
    backlink: { ... },
  },
  records: [{id,date,type,platform,site,amountUSD,currency,source,periodStart,periodEnd,note}, ...],
  monthlyArchive: { "2026-04": { totalUSD, byType }, "2026-03": {...}, ... },
  collectorStatus: [{source, ok, durationMs, note, recordCount}, ...],
};
```

月度归档由 `.monthly-archive.json` 持久化，collector 每跑一次会刷新当月+上月（避免月度跳变），保留最近 12 个月。这个文件**会随 git 提交**，所以历史月份不会因为重跑 collector 丢失。

## 为什么不用真正的数据库？

BPS 总控台的设计哲学是「先静态、再后端」。当前模式：

- 数据稳定后变化频率低（每天/每周跑一次足够）
- 静态 JSON 文件 + git diff 就是一个免费的版本控制审计
- 不需要后端服务、CORS、auth
- Dokploy 推 main 就部署，零依赖

如果开支条目超过 1000 行（不太可能）、或者需要实时录入界面，再升级到 SQLite + 简单 API。

## v2 路线（不在 v1 范围）

- Microsoft Ads SOAP API 自动拉
- Anthropic / OpenAI / xAI 月账单的 API 接入（多数没公开 API）
- 预算告警（超 $X 推飞书）
- GitHub Actions cron-hub 定时跑 collector，自动开 PR 更新 data.js
- 多币种历史汇率 freeze（v1 仅 HKD→USD 实时）
