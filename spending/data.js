// AUTO-GENERATED 2026-04-25T07:31:11.736Z — do not edit by hand. Run scripts/collect-spending.mjs.
window.SPENDING_SNAPSHOTS = {
  "updatedAt": "2026-04-25T07:31:11.736Z",
  "window": {
    "from": "2026-03-26",
    "to": "2026-04-25",
    "label": "最近 30 天"
  },
  "totalsUSD": {
    "last30Days": 704.36,
    "last30DaysByType": {
      "ads": 678.18,
      "api": 21.11,
      "infra": 5.07,
      "saas": 0,
      "backlink": 0
    }
  },
  "byType": {
    "ads": {
      "total": 678.18,
      "items": [
        {
          "id": "google-ads-2026-03-26-2026-04-25",
          "date": "2026-04-25",
          "type": "ads",
          "platform": "Google Ads",
          "site": null,
          "amountUSD": 678.18,
          "currency": "USD",
          "source": "auto:google-ads-search",
          "periodStart": "2026-03-26",
          "periodEnd": "2026-04-25",
          "note": "678.18 USD via v21 (1 child accts)"
        }
      ]
    },
    "api": {
      "total": 21.11,
      "items": [
        {
          "id": "openrouter-lifetime-2026-04-25",
          "date": "2026-04-25",
          "type": "api",
          "platform": "OpenRouter",
          "site": null,
          "amountUSD": 21.11,
          "currency": "USD",
          "source": "auto:openrouter-credits-lifetime",
          "periodStart": "2026-03-26",
          "periodEnd": "2026-04-25",
          "note": "fallback: lifetime total_usage (generation list unavailable)"
        }
      ]
    },
    "infra": {
      "total": 5.07,
      "items": [
        {
          "id": "stripe-fee-musicmake.ai-2026-03-26-2026-04-25",
          "date": "2026-04-25",
          "type": "infra",
          "platform": "Stripe",
          "site": "musicmake.ai",
          "amountUSD": 3.09,
          "currency": "USD",
          "source": "auto:stripe-balance-transactions",
          "periodStart": "2026-03-26",
          "periodEnd": "2026-04-25",
          "note": "11 stripe_fee transactions"
        },
        {
          "id": "stripe-fee-nanobanana-pro.org-2026-03-26-2026-04-25",
          "date": "2026-04-25",
          "type": "infra",
          "platform": "Stripe",
          "site": "nanobanana-pro.org",
          "amountUSD": 1.7,
          "currency": "USD",
          "source": "auto:stripe-balance-transactions",
          "periodStart": "2026-03-26",
          "periodEnd": "2026-04-25",
          "note": "4 stripe_fee transactions"
        },
        {
          "id": "stripe-fee-img2video.io-2026-03-26-2026-04-25",
          "date": "2026-04-25",
          "type": "infra",
          "platform": "Stripe",
          "site": "img2video.io",
          "amountUSD": 0.28,
          "currency": "USD",
          "source": "auto:stripe-balance-transactions",
          "periodStart": "2026-03-26",
          "periodEnd": "2026-04-25",
          "note": "1 stripe_fee transactions"
        }
      ]
    },
    "saas": {
      "total": 0,
      "items": []
    },
    "backlink": {
      "total": 0,
      "items": []
    }
  },
  "records": [
    {
      "id": "google-ads-2026-03-26-2026-04-25",
      "date": "2026-04-25",
      "type": "ads",
      "platform": "Google Ads",
      "site": null,
      "amountUSD": 678.18,
      "currency": "USD",
      "source": "auto:google-ads-search",
      "periodStart": "2026-03-26",
      "periodEnd": "2026-04-25",
      "note": "678.18 USD via v21 (1 child accts)"
    },
    {
      "id": "openrouter-lifetime-2026-04-25",
      "date": "2026-04-25",
      "type": "api",
      "platform": "OpenRouter",
      "site": null,
      "amountUSD": 21.11,
      "currency": "USD",
      "source": "auto:openrouter-credits-lifetime",
      "periodStart": "2026-03-26",
      "periodEnd": "2026-04-25",
      "note": "fallback: lifetime total_usage (generation list unavailable)"
    },
    {
      "id": "stripe-fee-musicmake.ai-2026-03-26-2026-04-25",
      "date": "2026-04-25",
      "type": "infra",
      "platform": "Stripe",
      "site": "musicmake.ai",
      "amountUSD": 3.09,
      "currency": "USD",
      "source": "auto:stripe-balance-transactions",
      "periodStart": "2026-03-26",
      "periodEnd": "2026-04-25",
      "note": "11 stripe_fee transactions"
    },
    {
      "id": "stripe-fee-nanobanana-pro.org-2026-03-26-2026-04-25",
      "date": "2026-04-25",
      "type": "infra",
      "platform": "Stripe",
      "site": "nanobanana-pro.org",
      "amountUSD": 1.7,
      "currency": "USD",
      "source": "auto:stripe-balance-transactions",
      "periodStart": "2026-03-26",
      "periodEnd": "2026-04-25",
      "note": "4 stripe_fee transactions"
    },
    {
      "id": "stripe-fee-img2video.io-2026-03-26-2026-04-25",
      "date": "2026-04-25",
      "type": "infra",
      "platform": "Stripe",
      "site": "img2video.io",
      "amountUSD": 0.28,
      "currency": "USD",
      "source": "auto:stripe-balance-transactions",
      "periodStart": "2026-03-26",
      "periodEnd": "2026-04-25",
      "note": "1 stripe_fee transactions"
    }
  ],
  "collectorStatus": [
    {
      "source": "stripe",
      "ok": true,
      "durationMs": 7539,
      "note": "musicmake.ai: $3.09 / 11tx; nanobanana-pro.org: $1.70 / 4tx; sora30: $0.00 / 0tx; kling4pro.com: $0.00 / 0tx; seedance30.com: $0.00 / 0tx; seedance3video.com: $0.00 / 0tx; img2video.io: $0.28 / 1tx",
      "recordCount": 3
    },
    {
      "source": "openrouter",
      "ok": true,
      "durationMs": 4080,
      "note": "fallback to lifetime credits",
      "recordCount": 1
    },
    {
      "source": "cloudflare-r2",
      "ok": false,
      "durationMs": 4188,
      "note": "musicmake: not authorized for that account; nanobanana: not authorized for that account",
      "recordCount": 0
    },
    {
      "source": "google-ads",
      "ok": true,
      "durationMs": 5459,
      "note": "678.18 USD via v21; songunique.com: 678.18 USD",
      "recordCount": 1
    },
    {
      "source": "manual",
      "ok": true,
      "durationMs": 2,
      "note": "0/13 entries with amount>0 in window",
      "recordCount": 0
    }
  ],
  "monthlyArchive": {
    "2026-04": {
      "totalUSD": 704.36,
      "byType": {
        "ads": 678.18,
        "api": 21.11,
        "infra": 5.07,
        "saas": 0,
        "backlink": 0
      },
      "snapshotAt": "2026-04-25T07:31:11.736Z",
      "windowFrom": "2026-03-26",
      "windowTo": "2026-04-25",
      "note": "rolling 30 days as of windowTo"
    }
  }
};
