window.JOURNEY_SAMPLES = {
  "musicmake": {
    "window": "最近 3 天",
    "capturedWith": "$umami-user-journey-investigator",
    "totals": {
      "sessions": 443,
      "events": 4828,
      "preview": 6
    },
    "insights": [
      "更像内容和功能混合站，用户既会从首页直接生成，也会从博客回流到产品。",
      "高意向与支付挣扎会混在同一个 session 里，所以必须支持单个 session 细看。",
      "前端事件足够看到 payment_incomplete，但仍缺少更细的失败原因字段。"
    ],
    "stages": [
      {
        "id": "entry",
        "label": "入口页"
      },
      {
        "id": "generate",
        "label": "提交生成"
      },
      {
        "id": "success",
        "label": "生成成功"
      },
      {
        "id": "pricing",
        "label": "查看定价"
      },
      {
        "id": "checkout",
        "label": "进入支付"
      },
      {
        "id": "blocked",
        "label": "支付中断"
      }
    ],
    "sessions": [
      {
        "id": "6cd05039",
        "emoji": "✅",
        "label": "体验了核心功能",
        "country": "US",
        "source": "(direct)",
        "browser": "edge-chromium",
        "os": "Windows 10",
        "device": "laptop",
        "totalEvents": 681,
        "meaningfulEvents": 597,
        "uniquePages": 3,
        "activeWindow": "27h29m",
        "firstSeen": "04-13 22:55",
        "lastSeen": "04-15 02:25",
        "heartbeatCount": 6,
        "tags": [
          {
            "tone": "info",
            "label": "US"
          },
          {
            "tone": "neutral",
            "label": "edge-chromium"
          },
          {
            "tone": "neutral",
            "label": "Windows 10"
          },
          {
            "tone": "neutral",
            "label": "laptop"
          },
          {
            "tone": "neutral",
            "label": "3 页面"
          },
          {
            "tone": "neutral",
            "label": "597 关键事件"
          },
          {
            "tone": "neutral",
            "label": "活跃 27h29m"
          }
        ],
        "summary": "多次生成成功并继续回放，说明用户在核心功能里获得了正反馈。",
        "why": "多次生成成功并继续回放，说明用户在核心功能里获得了正反馈。",
        "failureDetail": null,
        "route": [
          "查看 首页",
          "提交生成",
          "生成成功",
          "提交生成",
          "暂停播放",
          "开始播放"
        ],
        "stageHits": [
          "entry",
          "generate",
          "success"
        ],
        "anomalies": [
          "重试风暴: music_player_play 连续 4 次",
          "重试风暴: music_player_play 连续 7 次",
          "重试风暴: music_player_play 连续 3 次",
          "重试风暴: music_player_play 连续 3 次"
        ],
        "timeline": [
          {
            "name": "page_view",
            "path": "/",
            "label": "查看 首页",
            "at": "04-13 22:55",
            "delay": null,
            "detail": null
          },
          {
            "name": "music_generate_submit",
            "path": "/",
            "label": "提交生成",
            "at": "04-13 22:55",
            "delay": "35s",
            "detail": null
          },
          {
            "name": "music_generate_success",
            "path": "/",
            "label": "生成成功",
            "at": "04-13 22:57",
            "delay": "1m26s",
            "detail": null
          },
          {
            "name": "music_generate_submit",
            "path": "/",
            "label": "提交生成",
            "at": "04-13 22:58",
            "delay": "47s",
            "detail": null
          },
          {
            "name": "music_player_pause",
            "path": "/",
            "label": "暂停播放",
            "at": "04-13 22:58",
            "delay": "7s",
            "detail": null
          },
          {
            "name": "music_player_play",
            "path": "/",
            "label": "开始播放",
            "at": "04-13 22:58",
            "delay": "18s",
            "detail": null
          },
          {
            "name": "music_generate_success",
            "path": "/",
            "label": "生成成功",
            "at": "04-13 22:59",
            "delay": "1m11s",
            "detail": null
          },
          {
            "name": "music_generate_submit",
            "path": "/",
            "label": "提交生成",
            "at": "04-13 22:59",
            "delay": "14s",
            "detail": null
          },
          {
            "name": "music_player_expand",
            "path": "/",
            "label": "展开播放器",
            "at": "04-13 23:01",
            "delay": "1m49s",
            "detail": null
          },
          {
            "name": "music_generate_success",
            "path": "/",
            "label": "生成成功",
            "at": "04-13 23:01",
            "delay": "12s",
            "detail": null
          },
          {
            "name": "music_generate_submit",
            "path": "/",
            "label": "提交生成",
            "at": "04-13 23:05",
            "delay": "3m42s",
            "detail": null
          },
          {
            "name": "music_player_pause",
            "path": "/",
            "label": "暂停播放",
            "at": "04-13 23:05",
            "delay": "2s",
            "detail": null
          }
        ],
        "webhookTrail": []
      },
      {
        "id": "4c05e500",
        "emoji": "😰",
        "label": "支付挣扎",
        "country": "CA",
        "source": "(direct)",
        "browser": "safari",
        "os": "Mac OS",
        "device": "laptop",
        "totalEvents": 307,
        "meaningfulEvents": 252,
        "uniquePages": 29,
        "activeWindow": "29h14m",
        "firstSeen": "04-14 15:29",
        "lastSeen": "04-15 20:44",
        "heartbeatCount": 1,
        "tags": [
          {
            "tone": "info",
            "label": "CA"
          },
          {
            "tone": "neutral",
            "label": "safari"
          },
          {
            "tone": "neutral",
            "label": "Mac OS"
          },
          {
            "tone": "neutral",
            "label": "laptop"
          },
          {
            "tone": "neutral",
            "label": "29 页面"
          },
          {
            "tone": "neutral",
            "label": "252 关键事件"
          },
          {
            "tone": "neutral",
            "label": "活跃 29h14m"
          }
        ],
        "summary": "支付链路在 payment_incomplete 终止，当前没有看到更细的失败原因字段。",
        "why": "支付链路在 payment_incomplete 终止，当前没有看到更细的失败原因字段。",
        "failureDetail": "当前只记录到 payment_incomplete / checkout_cancel，未携带更细 webhook 失败原因。",
        "route": [
          "查看 博客页",
          "查看 博客页",
          "看到落地页",
          "看到生成器",
          "查看 /zh",
          "开始播放"
        ],
        "stageHits": [
          "entry"
        ],
        "anomalies": [
          "弹窗疲劳: 会员提示被打开 12 次、关闭 12 次",
          "支付挣扎: 跳转支付后出现 payment_incomplete"
        ],
        "timeline": [
          {
            "name": "page_view",
            "path": "/blog/ai-music-generation-platforms-2026",
            "label": "查看 博客页",
            "at": "04-14 15:29",
            "delay": null,
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/zh/blog/ai-music-generation-platforms-2026",
            "label": "查看 博客页",
            "at": "04-14 15:29",
            "delay": "5s",
            "detail": null
          },
          {
            "name": "lp_view",
            "path": "/zh",
            "label": "看到落地页",
            "at": "04-14 15:29",
            "delay": "8s",
            "detail": null
          },
          {
            "name": "generator_section_view",
            "path": "/zh",
            "label": "看到生成器",
            "at": "04-14 15:29",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/zh",
            "label": "查看 /zh",
            "at": "04-14 15:29",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "music_player_play",
            "path": "/zh",
            "label": "开始播放",
            "at": "04-14 15:30",
            "delay": "10s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/blog/ai-music-generation-platforms-2026",
            "label": "查看 博客页",
            "at": "04-14 18:52",
            "delay": "3h22m",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/zh/blog/ai-music-generation-platforms-2026",
            "label": "查看 博客页",
            "at": "04-14 18:52",
            "delay": "1s",
            "detail": null
          },
          {
            "name": "auth_login_modal_view",
            "path": "/zh/blog/ai-music-generation-platforms-2026",
            "label": "打开登录弹窗",
            "at": "04-14 18:52",
            "delay": "7s",
            "detail": null
          },
          {
            "name": "auth_login_attempt",
            "path": "/zh/blog/ai-music-generation-platforms-2026",
            "label": "尝试登录",
            "at": "04-14 18:52",
            "delay": "5s",
            "detail": null
          },
          {
            "name": "auth_login_result",
            "path": "/zh/blog/ai-music-generation-platforms-2026",
            "label": "登录结果返回",
            "at": "04-14 18:52",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/zh",
            "label": "查看 /zh",
            "at": "04-14 18:52",
            "delay": "19s",
            "detail": null
          }
        ],
        "webhookTrail": []
      },
      {
        "id": "6c74c581",
        "emoji": "✅",
        "label": "体验了核心功能",
        "country": "FR",
        "source": "(direct)",
        "browser": "chrome",
        "os": "Windows 10",
        "device": "laptop",
        "totalEvents": 139,
        "meaningfulEvents": 104,
        "uniquePages": 4,
        "activeWindow": "24h51m",
        "firstSeen": "04-15 05:25",
        "lastSeen": "04-16 06:17",
        "heartbeatCount": 13,
        "tags": [
          {
            "tone": "info",
            "label": "FR"
          },
          {
            "tone": "neutral",
            "label": "chrome"
          },
          {
            "tone": "neutral",
            "label": "Windows 10"
          },
          {
            "tone": "neutral",
            "label": "laptop"
          },
          {
            "tone": "neutral",
            "label": "4 页面"
          },
          {
            "tone": "neutral",
            "label": "104 关键事件"
          },
          {
            "tone": "neutral",
            "label": "活跃 24h51m"
          }
        ],
        "summary": "多次生成成功并继续回放，说明用户在核心功能里获得了正反馈。",
        "why": "多次生成成功并继续回放，说明用户在核心功能里获得了正反馈。",
        "failureDetail": null,
        "route": [
          "查看 法语页",
          "进入生成页",
          "查看 法语页",
          "提交生成",
          "生成成功",
          "开始播放"
        ],
        "stageHits": [
          "generate",
          "success"
        ],
        "anomalies": [
          "重试风暴: music_player_pause 连续 3 次"
        ],
        "timeline": [
          {
            "name": "page_view",
            "path": "/fr/cover",
            "label": "查看 法语页",
            "at": "04-15 05:25",
            "delay": null,
            "detail": null
          },
          {
            "name": "music_view",
            "path": "/fr/generate",
            "label": "进入生成页",
            "at": "04-15 05:25",
            "delay": "13s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/fr/generate",
            "label": "查看 法语页",
            "at": "04-15 05:25",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "music_generate_submit",
            "path": "/fr/generate",
            "label": "提交生成",
            "at": "04-15 05:26",
            "delay": "50s",
            "detail": null
          },
          {
            "name": "music_generate_success",
            "path": "/fr/generate",
            "label": "生成成功",
            "at": "04-15 05:28",
            "delay": "1m29s",
            "detail": null
          },
          {
            "name": "music_player_play",
            "path": "/fr/generate",
            "label": "开始播放",
            "at": "04-15 05:30",
            "delay": "2m18s",
            "detail": null
          },
          {
            "name": "music_generate_submit",
            "path": "/fr/generate",
            "label": "提交生成",
            "at": "04-15 05:34",
            "delay": "3m58s",
            "detail": null
          },
          {
            "name": "music_generate_success",
            "path": "/fr/generate",
            "label": "生成成功",
            "at": "04-15 05:35",
            "delay": "1m28s",
            "detail": null
          },
          {
            "name": "music_player_play",
            "path": "/fr/generate",
            "label": "开始播放",
            "at": "04-15 05:36",
            "delay": "57s",
            "detail": null
          },
          {
            "name": "music_generate_submit",
            "path": "/fr/generate",
            "label": "提交生成",
            "at": "04-15 05:40",
            "delay": "3m47s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/fr/my-works",
            "label": "查看 法语页",
            "at": "04-15 05:40",
            "delay": "5s",
            "detail": null
          },
          {
            "name": "page_my_works_view",
            "path": "/fr/my-works",
            "label": "查看我的作品",
            "at": "04-15 05:40",
            "delay": "立即",
            "detail": null
          }
        ],
        "webhookTrail": []
      },
      {
        "id": "e0f27dd6",
        "emoji": "🔥",
        "label": "高意向潜客(看了定价)",
        "country": "US",
        "source": "chatgpt.com",
        "browser": "chrome",
        "os": "Windows 10",
        "device": "laptop",
        "totalEvents": 89,
        "meaningfulEvents": 86,
        "uniquePages": 12,
        "activeWindow": "32m52s",
        "firstSeen": "04-14 15:20",
        "lastSeen": "04-14 15:52",
        "heartbeatCount": 1,
        "tags": [
          {
            "tone": "info",
            "label": "US"
          },
          {
            "tone": "neutral",
            "label": "chrome"
          },
          {
            "tone": "neutral",
            "label": "Windows 10"
          },
          {
            "tone": "neutral",
            "label": "laptop"
          },
          {
            "tone": "neutral",
            "label": "12 页面"
          },
          {
            "tone": "neutral",
            "label": "86 关键事件"
          },
          {
            "tone": "neutral",
            "label": "活跃 32m52s"
          }
        ],
        "summary": "当前样例更像浅浏览或导航切换，需要更多自定义事件才能解释得更细。",
        "why": "当前样例更像浅浏览或导航切换，需要更多自定义事件才能解释得更细。",
        "failureDetail": null,
        "route": [
          "尝试登录",
          "查看 博客页",
          "登录结果返回",
          "查看 首页",
          "进入生成页",
          "查看 /generate"
        ],
        "stageHits": [
          "entry"
        ],
        "anomalies": [
          "弹窗疲劳: 会员提示被打开 11 次、关闭 11 次"
        ],
        "timeline": [
          {
            "name": "auth_login_attempt",
            "path": "/blog/ai-music-generation-platforms-2026",
            "label": "尝试登录",
            "at": "04-14 15:20",
            "delay": null,
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/blog/ai-music-generation-platforms-2026",
            "label": "查看 博客页",
            "at": "04-14 15:20",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "auth_login_result",
            "path": "/blog/ai-music-generation-platforms-2026",
            "label": "登录结果返回",
            "at": "04-14 15:20",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/",
            "label": "查看 首页",
            "at": "04-14 15:20",
            "delay": "24s",
            "detail": null
          },
          {
            "name": "music_view",
            "path": "/generate",
            "label": "进入生成页",
            "at": "04-14 15:20",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/generate",
            "label": "查看 /generate",
            "at": "04-14 15:20",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "music_view",
            "path": "/extend",
            "label": "进入生成页",
            "at": "04-14 15:21",
            "delay": "1m20s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/extend",
            "label": "查看 /extend",
            "at": "04-14 15:21",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "music_view",
            "path": "/cover",
            "label": "进入生成页",
            "at": "04-14 15:22",
            "delay": "9s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/cover",
            "label": "查看 /cover",
            "at": "04-14 15:22",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/generate",
            "label": "查看 /generate",
            "at": "04-14 15:22",
            "delay": "5s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/cover",
            "label": "查看 /cover",
            "at": "04-14 15:24",
            "delay": "2m27s",
            "detail": null
          }
        ],
        "webhookTrail": []
      },
      {
        "id": "0b45235e",
        "emoji": "✅",
        "label": "体验了核心功能",
        "country": "US",
        "source": "(direct)",
        "browser": "edge-chromium",
        "os": "Windows 10",
        "device": "laptop",
        "totalEvents": 103,
        "meaningfulEvents": 61,
        "uniquePages": 2,
        "activeWindow": "51m56s",
        "firstSeen": "04-16 10:57",
        "lastSeen": "04-16 11:49",
        "heartbeatCount": 5,
        "tags": [
          {
            "tone": "info",
            "label": "US"
          },
          {
            "tone": "neutral",
            "label": "edge-chromium"
          },
          {
            "tone": "neutral",
            "label": "Windows 10"
          },
          {
            "tone": "neutral",
            "label": "laptop"
          },
          {
            "tone": "neutral",
            "label": "2 页面"
          },
          {
            "tone": "neutral",
            "label": "61 关键事件"
          },
          {
            "tone": "neutral",
            "label": "活跃 51m56s"
          }
        ],
        "summary": "多次生成成功并继续回放，说明用户在核心功能里获得了正反馈。",
        "why": "多次生成成功并继续回放，说明用户在核心功能里获得了正反馈。",
        "failureDetail": null,
        "route": [
          "查看 首页",
          "提交生成",
          "生成成功",
          "操作播放器",
          "开始播放",
          "操作播放器"
        ],
        "stageHits": [
          "entry",
          "generate",
          "success"
        ],
        "anomalies": [],
        "timeline": [
          {
            "name": "page_view",
            "path": "/",
            "label": "查看 首页",
            "at": "04-16 10:57",
            "delay": null,
            "detail": null
          },
          {
            "name": "music_generate_submit",
            "path": "/",
            "label": "提交生成",
            "at": "04-16 10:58",
            "delay": "1m03s",
            "detail": null
          },
          {
            "name": "music_generate_success",
            "path": "/",
            "label": "生成成功",
            "at": "04-16 11:01",
            "delay": "2m42s",
            "detail": null
          },
          {
            "name": "music_player_action",
            "path": "/",
            "label": "操作播放器",
            "at": "04-16 11:02",
            "delay": "44s",
            "detail": null
          },
          {
            "name": "music_player_play",
            "path": "/",
            "label": "开始播放",
            "at": "04-16 11:02",
            "delay": "4s",
            "detail": null
          },
          {
            "name": "music_player_action",
            "path": "/",
            "label": "操作播放器",
            "at": "04-16 11:02",
            "delay": "6s",
            "detail": null
          },
          {
            "name": "music_generate_submit",
            "path": "/",
            "label": "提交生成",
            "at": "04-16 11:02",
            "delay": "21s",
            "detail": null
          },
          {
            "name": "music_generate_success",
            "path": "/",
            "label": "生成成功",
            "at": "04-16 11:04",
            "delay": "1m56s",
            "detail": null
          },
          {
            "name": "music_player_action",
            "path": "/",
            "label": "操作播放器",
            "at": "04-16 11:05",
            "delay": "15s",
            "detail": null
          },
          {
            "name": "music_player_play",
            "path": "/",
            "label": "开始播放",
            "at": "04-16 11:05",
            "delay": "3s",
            "detail": null
          },
          {
            "name": "music_player_action",
            "path": "/",
            "label": "操作播放器",
            "at": "04-16 11:05",
            "delay": "11s",
            "detail": null
          },
          {
            "name": "music_generate_submit",
            "path": "/",
            "label": "提交生成",
            "at": "04-16 11:05",
            "delay": "5s",
            "detail": null
          }
        ],
        "webhookTrail": []
      },
      {
        "id": "834b1d0a",
        "emoji": "🔥",
        "label": "高意向潜客(看了定价)",
        "country": "DE",
        "source": "(direct)",
        "browser": "chrome",
        "os": "Android OS",
        "device": "mobile",
        "totalEvents": 58,
        "meaningfulEvents": 48,
        "uniquePages": 5,
        "activeWindow": "19m59s",
        "firstSeen": "04-13 19:33",
        "lastSeen": "04-13 19:53",
        "heartbeatCount": 4,
        "tags": [
          {
            "tone": "info",
            "label": "DE"
          },
          {
            "tone": "neutral",
            "label": "chrome"
          },
          {
            "tone": "neutral",
            "label": "Android OS"
          },
          {
            "tone": "neutral",
            "label": "mobile"
          },
          {
            "tone": "neutral",
            "label": "5 页面"
          },
          {
            "tone": "neutral",
            "label": "48 关键事件"
          },
          {
            "tone": "neutral",
            "label": "活跃 19m59s"
          }
        ],
        "summary": "多次生成成功并继续回放，说明用户在核心功能里获得了正反馈。",
        "why": "多次生成成功并继续回放，说明用户在核心功能里获得了正反馈。",
        "failureDetail": null,
        "route": [
          "查看 /de/blog/free-ai-music-creation-guide",
          "查看 /generate",
          "登录结果返回",
          "尝试登录",
          "查看 /generate",
          "生成成功"
        ],
        "stageHits": [
          "entry",
          "success",
          "pricing"
        ],
        "anomalies": [
          "弹窗疲劳: 会员提示被打开 5 次、关闭 4 次"
        ],
        "timeline": [
          {
            "name": "page_view",
            "path": "/de/blog/free-ai-music-creation-guide",
            "label": "查看 /de/blog/free-ai-music-creation-guide",
            "at": "04-13 19:33",
            "delay": null,
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/generate",
            "label": "查看 /generate",
            "at": "04-13 19:34",
            "delay": "34s",
            "detail": null
          },
          {
            "name": "auth_login_result",
            "path": "/generate",
            "label": "登录结果返回",
            "at": "04-13 19:40",
            "delay": "6m03s",
            "detail": null
          },
          {
            "name": "auth_login_attempt",
            "path": "/generate",
            "label": "尝试登录",
            "at": "04-13 19:40",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/generate",
            "label": "查看 /generate",
            "at": "04-13 19:40",
            "delay": "26s",
            "detail": null
          },
          {
            "name": "music_generate_success",
            "path": "/generate",
            "label": "生成成功",
            "at": "04-13 19:42",
            "delay": "1m38s",
            "detail": null
          },
          {
            "name": "music_player_action",
            "path": "/generate",
            "label": "操作播放器",
            "at": "04-13 19:43",
            "delay": "1m01s",
            "detail": null
          },
          {
            "name": "member_hint_modal_view",
            "path": "/generate",
            "label": "弹出会员提示",
            "at": "04-13 19:43",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "music_player_action",
            "path": "/generate",
            "label": "操作播放器",
            "at": "04-13 19:43",
            "delay": "17s",
            "detail": null
          },
          {
            "name": "member_hint_modal_view",
            "path": "/generate",
            "label": "弹出会员提示",
            "at": "04-13 19:43",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "pricing_view",
            "path": "/pricing",
            "label": "进入定价页",
            "at": "04-13 19:44",
            "delay": "6s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/pricing",
            "label": "查看 定价页",
            "at": "04-13 19:44",
            "delay": "立即",
            "detail": null
          }
        ],
        "webhookTrail": []
      }
    ]
  },
  "songunique": {
    "window": "最近 3 天",
    "capturedWith": "$umami-user-journey-investigator",
    "totals": {
      "sessions": 77,
      "events": 718,
      "preview": 6
    },
    "insights": [
      "/complete-order 是支付链路的真正分水岭，成功和失败都在这里分叉。",
      "payment_click 会重复出现，说明用户在支付前缺少足够确定的反馈。",
      "能看到 checkout_error / payment_incomplete，但 webhook 侧失败解释仍然不够细。"
    ],
    "stages": [
      {
        "id": "entry",
        "label": "首页 / 定价"
      },
      {
        "id": "create",
        "label": "进入 create"
      },
      {
        "id": "order",
        "label": "complete-order"
      },
      {
        "id": "pay",
        "label": "点击支付"
      },
      {
        "id": "blocked",
        "label": "支付异常"
      },
      {
        "id": "success",
        "label": "支付成功"
      }
    ],
    "sessions": [
      {
        "id": "590b67db",
        "emoji": "💰",
        "label": "付费用户",
        "country": "GB",
        "source": "(direct)",
        "browser": "chrome",
        "os": "Mac OS",
        "device": "desktop",
        "totalEvents": 126,
        "meaningfulEvents": 126,
        "uniquePages": 6,
        "activeWindow": "26h43m",
        "firstSeen": "04-14 06:42",
        "lastSeen": "04-15 09:25",
        "heartbeatCount": 0,
        "tags": [
          {
            "tone": "info",
            "label": "GB"
          },
          {
            "tone": "neutral",
            "label": "chrome"
          },
          {
            "tone": "neutral",
            "label": "Mac OS"
          },
          {
            "tone": "neutral",
            "label": "desktop"
          },
          {
            "tone": "neutral",
            "label": "6 页面"
          },
          {
            "tone": "neutral",
            "label": "126 关键事件"
          },
          {
            "tone": "neutral",
            "label": "活跃 26h43m"
          }
        ],
        "summary": "最终走到支付成功，说明这条路径完成了成交。",
        "why": "最终走到支付成功，说明这条路径完成了成交。",
        "failureDetail": "当前只记录到 checkout_error，未附带 provider / errorCode 字段。",
        "route": [
          "回到首页",
          "查看 首页",
          "查看 创建页",
          "到达结账页",
          "查看 结账页",
          "点击支付"
        ],
        "stageHits": [
          "entry",
          "create",
          "order",
          "pay"
        ],
        "anomalies": [
          "重试风暴: payment_click 连续 4 次",
          "重试风暴: payment_click 连续 3 次",
          "重试风暴: payment_click 连续 3 次"
        ],
        "timeline": [
          {
            "name": "homepage_view",
            "path": "/",
            "label": "回到首页",
            "at": "04-14 06:42",
            "delay": null,
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/",
            "label": "查看 首页",
            "at": "04-14 06:42",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/create",
            "label": "查看 创建页",
            "at": "04-14 06:42",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "checkout_page_view",
            "path": "/complete-order",
            "label": "到达结账页",
            "at": "04-14 06:43",
            "delay": "35s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/complete-order",
            "label": "查看 结账页",
            "at": "04-14 06:43",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "payment_click",
            "path": "/complete-order",
            "label": "点击支付",
            "at": "04-14 06:43",
            "delay": "10s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/",
            "label": "查看 首页",
            "at": "04-14 06:43",
            "delay": "42s",
            "detail": null
          },
          {
            "name": "homepage_view",
            "path": "/",
            "label": "回到首页",
            "at": "04-14 06:43",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/create",
            "label": "查看 创建页",
            "at": "04-14 06:44",
            "delay": "6s",
            "detail": null
          },
          {
            "name": "checkout_page_view",
            "path": "/complete-order",
            "label": "到达结账页",
            "at": "04-14 06:44",
            "delay": "1s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/complete-order",
            "label": "查看 结账页",
            "at": "04-14 06:44",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "payment_click",
            "path": "/complete-order",
            "label": "点击支付",
            "at": "04-14 06:44",
            "delay": "4s",
            "detail": null
          }
        ],
        "webhookTrail": []
      },
      {
        "id": "cd231c7f",
        "emoji": "😰",
        "label": "支付挣扎",
        "country": "US",
        "source": "(direct)",
        "browser": "chrome",
        "os": "Mac OS",
        "device": "desktop",
        "totalEvents": 75,
        "meaningfulEvents": 75,
        "uniquePages": 5,
        "activeWindow": "2h41m",
        "firstSeen": "04-16 06:02",
        "lastSeen": "04-16 08:43",
        "heartbeatCount": 0,
        "tags": [
          {
            "tone": "info",
            "label": "US"
          },
          {
            "tone": "neutral",
            "label": "chrome"
          },
          {
            "tone": "neutral",
            "label": "Mac OS"
          },
          {
            "tone": "neutral",
            "label": "desktop"
          },
          {
            "tone": "neutral",
            "label": "5 页面"
          },
          {
            "tone": "neutral",
            "label": "75 关键事件"
          },
          {
            "tone": "neutral",
            "label": "活跃 2h41m"
          }
        ],
        "summary": "中途先出现支付未完成，之后又补单成功，说明支付阶段经历过一次中断。",
        "why": "中途先出现支付未完成，之后又补单成功，说明支付阶段经历过一次中断。",
        "failureDetail": "当前只记录到 payment_incomplete / checkout_cancel，未携带更细 webhook 失败原因。",
        "route": [
          "查看 定价页",
          "查看 创建页",
          "查看表单步骤",
          "查看 定价页",
          "查看 创建页",
          "查看表单步骤"
        ],
        "stageHits": [
          "entry",
          "create",
          "order",
          "pay"
        ],
        "anomalies": [
          "支付挣扎: 跳转支付后出现 payment_incomplete"
        ],
        "timeline": [
          {
            "name": "page_view",
            "path": "/pricing",
            "label": "查看 定价页",
            "at": "04-16 06:02",
            "delay": null,
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/create",
            "label": "查看 创建页",
            "at": "04-16 06:02",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "ts_form_step_view",
            "path": "/create",
            "label": "查看表单步骤",
            "at": "04-16 06:02",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/pricing",
            "label": "查看 定价页",
            "at": "04-16 06:02",
            "delay": "11s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/create",
            "label": "查看 创建页",
            "at": "04-16 06:02",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "ts_form_step_view",
            "path": "/create",
            "label": "查看表单步骤",
            "at": "04-16 06:02",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/create",
            "label": "查看 创建页",
            "at": "04-16 06:09",
            "delay": "6m40s",
            "detail": null
          },
          {
            "name": "ts_form_complete",
            "path": "/create",
            "label": "完成表单",
            "at": "04-16 06:09",
            "delay": "1s",
            "detail": null
          },
          {
            "name": "checkout_page_view",
            "path": "/complete-order",
            "label": "到达结账页",
            "at": "04-16 06:09",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/complete-order",
            "label": "查看 结账页",
            "at": "04-16 06:09",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "payment_click",
            "path": "/complete-order",
            "label": "点击支付",
            "at": "04-16 06:09",
            "delay": "2s",
            "detail": null
          },
          {
            "name": "ts_checkout_start",
            "path": "/complete-order",
            "label": "开始结账",
            "at": "04-16 06:09",
            "delay": "立即",
            "detail": null
          }
        ],
        "webhookTrail": []
      },
      {
        "id": "649a53d1",
        "emoji": "😰",
        "label": "支付挣扎",
        "country": "US",
        "source": "google.com",
        "browser": "chrome",
        "os": "Windows 10",
        "device": "desktop",
        "totalEvents": 40,
        "meaningfulEvents": 40,
        "uniquePages": 3,
        "activeWindow": "6m23s",
        "firstSeen": "04-15 21:16",
        "lastSeen": "04-15 21:23",
        "heartbeatCount": 0,
        "tags": [
          {
            "tone": "info",
            "label": "US"
          },
          {
            "tone": "neutral",
            "label": "chrome"
          },
          {
            "tone": "neutral",
            "label": "Windows 10"
          },
          {
            "tone": "neutral",
            "label": "desktop"
          },
          {
            "tone": "neutral",
            "label": "3 页面"
          },
          {
            "tone": "neutral",
            "label": "40 关键事件"
          },
          {
            "tone": "neutral",
            "label": "活跃 6m23s"
          }
        ],
        "summary": "支付链路在 payment_incomplete 终止，当前没有看到更细的失败原因字段。",
        "why": "支付链路在 payment_incomplete 终止，当前没有看到更细的失败原因字段。",
        "failureDetail": "当前只记录到 payment_incomplete / checkout_cancel，未携带更细 webhook 失败原因。",
        "route": [
          "查看 首页",
          "回到首页",
          "点击主 CTA",
          "查看表单步骤",
          "查看 创建页",
          "完成表单步骤"
        ],
        "stageHits": [
          "entry",
          "create"
        ],
        "anomalies": [
          "重试风暴: ts_form_step_view 连续 4 次",
          "支付挣扎: 跳转支付后出现 payment_incomplete"
        ],
        "timeline": [
          {
            "name": "page_view",
            "path": "/",
            "label": "查看 首页",
            "at": "04-15 21:16",
            "delay": null,
            "detail": null
          },
          {
            "name": "homepage_view",
            "path": "/",
            "label": "回到首页",
            "at": "04-15 21:16",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "hero_cta_click",
            "path": "/",
            "label": "点击主 CTA",
            "at": "04-15 21:16",
            "delay": "1s",
            "detail": null
          },
          {
            "name": "ts_form_step_view",
            "path": "/create",
            "label": "查看表单步骤",
            "at": "04-15 21:16",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/create",
            "label": "查看 创建页",
            "at": "04-15 21:16",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "ts_form_step_complete",
            "path": "/create",
            "label": "完成表单步骤",
            "at": "04-15 21:17",
            "delay": "13s",
            "detail": null
          },
          {
            "name": "ts_form_step_view",
            "path": "/create",
            "label": "查看表单步骤",
            "at": "04-15 21:17",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "ts_form_step_complete",
            "path": "/create",
            "label": "完成表单步骤",
            "at": "04-15 21:17",
            "delay": "8s",
            "detail": null
          },
          {
            "name": "ts_form_step_view",
            "path": "/create",
            "label": "查看表单步骤",
            "at": "04-15 21:17",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "ts_form_step_complete",
            "path": "/create",
            "label": "完成表单步骤",
            "at": "04-15 21:17",
            "delay": "41s",
            "detail": null
          },
          {
            "name": "ts_form_step_view",
            "path": "/create",
            "label": "查看表单步骤",
            "at": "04-15 21:17",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "ts_form_step_complete",
            "path": "/create",
            "label": "完成表单步骤",
            "at": "04-15 21:20",
            "delay": "3m05s",
            "detail": null
          }
        ],
        "webhookTrail": []
      },
      {
        "id": "88c9d6f1",
        "emoji": "💰",
        "label": "付费用户",
        "country": "AU",
        "source": "(direct)",
        "browser": "chrome",
        "os": "Windows 10",
        "device": "laptop",
        "totalEvents": 26,
        "meaningfulEvents": 26,
        "uniquePages": 3,
        "activeWindow": "33m25s",
        "firstSeen": "04-14 19:37",
        "lastSeen": "04-14 20:11",
        "heartbeatCount": 0,
        "tags": [
          {
            "tone": "info",
            "label": "AU"
          },
          {
            "tone": "neutral",
            "label": "chrome"
          },
          {
            "tone": "neutral",
            "label": "Windows 10"
          },
          {
            "tone": "neutral",
            "label": "laptop"
          },
          {
            "tone": "neutral",
            "label": "3 页面"
          },
          {
            "tone": "neutral",
            "label": "26 关键事件"
          },
          {
            "tone": "neutral",
            "label": "活跃 33m25s"
          }
        ],
        "summary": "最终走到支付成功，说明这条路径完成了成交。",
        "why": "最终走到支付成功，说明这条路径完成了成交。",
        "failureDetail": null,
        "route": [
          "回到首页",
          "查看 首页",
          "点击主 CTA",
          "查看表单步骤",
          "查看 创建页",
          "完成表单步骤"
        ],
        "stageHits": [
          "entry",
          "create",
          "order"
        ],
        "anomalies": [],
        "timeline": [
          {
            "name": "homepage_view",
            "path": "/",
            "label": "回到首页",
            "at": "04-14 19:37",
            "delay": null,
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/",
            "label": "查看 首页",
            "at": "04-14 19:37",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "hero_cta_click",
            "path": "/",
            "label": "点击主 CTA",
            "at": "04-14 19:38",
            "delay": "7s",
            "detail": null
          },
          {
            "name": "ts_form_step_view",
            "path": "/create",
            "label": "查看表单步骤",
            "at": "04-14 19:38",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/create",
            "label": "查看 创建页",
            "at": "04-14 19:38",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "ts_form_step_complete",
            "path": "/create",
            "label": "完成表单步骤",
            "at": "04-14 19:41",
            "delay": "3m11s",
            "detail": null
          },
          {
            "name": "ts_form_step_view",
            "path": "/create",
            "label": "查看表单步骤",
            "at": "04-14 19:41",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "ts_form_step_complete",
            "path": "/create",
            "label": "完成表单步骤",
            "at": "04-14 19:58",
            "delay": "17m14s",
            "detail": null
          },
          {
            "name": "ts_form_step_view",
            "path": "/create",
            "label": "查看表单步骤",
            "at": "04-14 20:03",
            "delay": "4m39s",
            "detail": null
          },
          {
            "name": "ts_form_step_complete",
            "path": "/create",
            "label": "完成表单步骤",
            "at": "04-14 20:07",
            "delay": "3m59s",
            "detail": null
          },
          {
            "name": "ts_form_complete",
            "path": "/create",
            "label": "完成表单",
            "at": "04-14 20:08",
            "delay": "1m27s",
            "detail": null
          },
          {
            "name": "checkout_page_view",
            "path": "/complete-order",
            "label": "到达结账页",
            "at": "04-14 20:08",
            "delay": "立即",
            "detail": null
          }
        ],
        "webhookTrail": []
      },
      {
        "id": "889c8c31",
        "emoji": "👀",
        "label": "浅浏览",
        "country": "US",
        "source": "google.com",
        "browser": "edge-chromium",
        "os": "Windows 10",
        "device": "laptop",
        "totalEvents": 25,
        "meaningfulEvents": 25,
        "uniquePages": 3,
        "activeWindow": "3m55s",
        "firstSeen": "04-14 15:20",
        "lastSeen": "04-14 15:24",
        "heartbeatCount": 0,
        "tags": [
          {
            "tone": "info",
            "label": "US"
          },
          {
            "tone": "neutral",
            "label": "edge-chromium"
          },
          {
            "tone": "neutral",
            "label": "Windows 10"
          },
          {
            "tone": "neutral",
            "label": "laptop"
          },
          {
            "tone": "neutral",
            "label": "3 页面"
          },
          {
            "tone": "neutral",
            "label": "25 关键事件"
          },
          {
            "tone": "neutral",
            "label": "活跃 3m55s"
          }
        ],
        "summary": "当前样例更像浅浏览或导航切换，需要更多自定义事件才能解释得更细。",
        "why": "当前样例更像浅浏览或导航切换，需要更多自定义事件才能解释得更细。",
        "failureDetail": null,
        "route": [
          "查看 首页",
          "回到首页",
          "点击主 CTA",
          "查看表单步骤",
          "查看 创建页",
          "完成表单步骤"
        ],
        "stageHits": [
          "entry",
          "create"
        ],
        "anomalies": [
          "重试风暴: ts_form_step_view 连续 3 次"
        ],
        "timeline": [
          {
            "name": "page_view",
            "path": "/",
            "label": "查看 首页",
            "at": "04-14 15:20",
            "delay": null,
            "detail": null
          },
          {
            "name": "homepage_view",
            "path": "/",
            "label": "回到首页",
            "at": "04-14 15:20",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "hero_cta_click",
            "path": "/",
            "label": "点击主 CTA",
            "at": "04-14 15:20",
            "delay": "9s",
            "detail": null
          },
          {
            "name": "ts_form_step_view",
            "path": "/create",
            "label": "查看表单步骤",
            "at": "04-14 15:20",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/create",
            "label": "查看 创建页",
            "at": "04-14 15:20",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "ts_form_step_complete",
            "path": "/create",
            "label": "完成表单步骤",
            "at": "04-14 15:21",
            "delay": "12s",
            "detail": null
          },
          {
            "name": "ts_form_step_view",
            "path": "/create",
            "label": "查看表单步骤",
            "at": "04-14 15:21",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "ts_form_step_complete",
            "path": "/create",
            "label": "完成表单步骤",
            "at": "04-14 15:21",
            "delay": "8s",
            "detail": null
          },
          {
            "name": "ts_form_step_view",
            "path": "/create",
            "label": "查看表单步骤",
            "at": "04-14 15:21",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "ts_form_step_complete",
            "path": "/create",
            "label": "完成表单步骤",
            "at": "04-14 15:22",
            "delay": "52s",
            "detail": null
          },
          {
            "name": "ts_form_step_view",
            "path": "/create",
            "label": "查看表单步骤",
            "at": "04-14 15:22",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "ts_form_step_complete",
            "path": "/create",
            "label": "完成表单步骤",
            "at": "04-14 15:22",
            "delay": "4s",
            "detail": null
          }
        ],
        "webhookTrail": []
      },
      {
        "id": "b179d54d",
        "emoji": "💰",
        "label": "付费用户",
        "country": "US",
        "source": "(direct)",
        "browser": "chrome",
        "os": "Windows 10",
        "device": "desktop",
        "totalEvents": 22,
        "meaningfulEvents": 22,
        "uniquePages": 3,
        "activeWindow": "47s",
        "firstSeen": "04-15 12:26",
        "lastSeen": "04-15 12:26",
        "heartbeatCount": 0,
        "tags": [
          {
            "tone": "info",
            "label": "US"
          },
          {
            "tone": "neutral",
            "label": "chrome"
          },
          {
            "tone": "neutral",
            "label": "Windows 10"
          },
          {
            "tone": "neutral",
            "label": "desktop"
          },
          {
            "tone": "neutral",
            "label": "3 页面"
          },
          {
            "tone": "neutral",
            "label": "22 关键事件"
          },
          {
            "tone": "neutral",
            "label": "活跃 47s"
          }
        ],
        "summary": "最终走到支付成功，说明这条路径完成了成交。",
        "why": "最终走到支付成功，说明这条路径完成了成交。",
        "failureDetail": null,
        "route": [
          "点击主 CTA",
          "回到首页",
          "查看 首页",
          "点击主 CTA",
          "查看表单步骤",
          "查看 创建页"
        ],
        "stageHits": [
          "entry",
          "create"
        ],
        "anomalies": [],
        "timeline": [
          {
            "name": "hero_cta_click",
            "path": "/",
            "label": "点击主 CTA",
            "at": "04-15 12:26",
            "delay": null,
            "detail": null
          },
          {
            "name": "homepage_view",
            "path": "/",
            "label": "回到首页",
            "at": "04-15 12:26",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/",
            "label": "查看 首页",
            "at": "04-15 12:26",
            "delay": "4s",
            "detail": null
          },
          {
            "name": "hero_cta_click",
            "path": "/",
            "label": "点击主 CTA",
            "at": "04-15 12:26",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "ts_form_step_view",
            "path": "/create",
            "label": "查看表单步骤",
            "at": "04-15 12:26",
            "delay": "2s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/create",
            "label": "查看 创建页",
            "at": "04-15 12:26",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "ts_form_step_complete",
            "path": "/create",
            "label": "完成表单步骤",
            "at": "04-15 12:26",
            "delay": "3s",
            "detail": null
          },
          {
            "name": "ts_form_step_view",
            "path": "/create",
            "label": "查看表单步骤",
            "at": "04-15 12:26",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "ts_form_step_complete",
            "path": "/create",
            "label": "完成表单步骤",
            "at": "04-15 12:26",
            "delay": "22s",
            "detail": null
          },
          {
            "name": "ts_form_step_view",
            "path": "/create",
            "label": "查看表单步骤",
            "at": "04-15 12:26",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "ts_form_step_complete",
            "path": "/create",
            "label": "完成表单步骤",
            "at": "04-15 12:26",
            "delay": "1s",
            "detail": null
          },
          {
            "name": "ts_form_step_view",
            "path": "/create",
            "label": "查看表单步骤",
            "at": "04-15 12:26",
            "delay": "立即",
            "detail": null
          }
        ],
        "webhookTrail": []
      }
    ]
  },
  "seedance20": {
    "window": "最近 3 天",
    "capturedWith": "$umami-user-journey-investigator",
    "totals": {
      "sessions": 290,
      "events": 1027,
      "preview": 6
    },
    "insights": [
      "当前样例更多反映导航切换和后台使用，还没有形成清晰的核心转化闭环。",
      "大量 page_view 说明如果要做更细 journey，后续还得继续补自定义事件。",
      "这类站点更适合先看停留和切页，再决定要不要补埋点。"
    ],
    "stages": [
      {
        "id": "entry",
        "label": "首页"
      },
      {
        "id": "generate",
        "label": "生成页"
      },
      {
        "id": "chat",
        "label": "聊天页"
      },
      {
        "id": "billing",
        "label": "Billing / Credits"
      },
      {
        "id": "admin",
        "label": "后台页"
      },
      {
        "id": "error",
        "label": "Auth / Error"
      }
    ],
    "sessions": [
      {
        "id": "20da75b4",
        "emoji": "👀",
        "label": "浅浏览",
        "country": "US",
        "source": "seedance20.net",
        "browser": "chrome",
        "os": "Windows 10",
        "device": "desktop",
        "totalEvents": 66,
        "meaningfulEvents": 62,
        "uniquePages": 10,
        "activeWindow": "38h23m",
        "firstSeen": "04-13 22:21",
        "lastSeen": "04-15 12:45",
        "heartbeatCount": 3,
        "tags": [
          {
            "tone": "info",
            "label": "US"
          },
          {
            "tone": "neutral",
            "label": "chrome"
          },
          {
            "tone": "neutral",
            "label": "Windows 10"
          },
          {
            "tone": "neutral",
            "label": "desktop"
          },
          {
            "tone": "neutral",
            "label": "10 页面"
          },
          {
            "tone": "neutral",
            "label": "62 关键事件"
          },
          {
            "tone": "neutral",
            "label": "活跃 38h23m"
          }
        ],
        "summary": "主要是在聊天、生成和后台页面之间切换，没有形成更明确的关键转化动作。",
        "why": "主要是在聊天、生成和后台页面之间切换，没有形成更明确的关键转化动作。",
        "failureDetail": null,
        "route": [
          "查看 聊天页",
          "查看 首页",
          "查看 生成页",
          "查看 聊天页",
          "查看 首页",
          "查看 聊天页"
        ],
        "stageHits": [
          "entry",
          "generate",
          "chat",
          "billing",
          "admin"
        ],
        "anomalies": [],
        "timeline": [
          {
            "name": "page_view",
            "path": "/app/chat",
            "label": "查看 聊天页",
            "at": "04-13 22:21",
            "delay": null,
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/",
            "label": "查看 首页",
            "at": "04-13 22:21",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/app/generate",
            "label": "查看 生成页",
            "at": "04-13 22:48",
            "delay": "26m34s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/app/chat",
            "label": "查看 聊天页",
            "at": "04-13 22:48",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/",
            "label": "查看 首页",
            "at": "04-14 00:39",
            "delay": "1h50m",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/app/chat",
            "label": "查看 聊天页",
            "at": "04-14 04:18",
            "delay": "3h39m",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/",
            "label": "查看 首页",
            "at": "04-14 04:22",
            "delay": "3m46s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/settings/billing",
            "label": "查看 Billing",
            "at": "04-14 14:27",
            "delay": "10h05m",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/admin/users",
            "label": "查看 管理员用户",
            "at": "04-14 14:28",
            "delay": "36s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/admin/video-works",
            "label": "查看 管理员视频作品",
            "at": "04-14 14:28",
            "delay": "3s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/",
            "label": "查看 首页",
            "at": "04-14 14:40",
            "delay": "11m41s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/app/generate",
            "label": "查看 生成页",
            "at": "04-14 15:59",
            "delay": "1h19m",
            "detail": null
          }
        ],
        "webhookTrail": []
      },
      {
        "id": "e67e335d",
        "emoji": "👀",
        "label": "浅浏览",
        "country": "US",
        "source": "google.com",
        "browser": "firefox",
        "os": "Windows 7",
        "device": "laptop",
        "totalEvents": 37,
        "meaningfulEvents": 33,
        "uniquePages": 6,
        "activeWindow": "4h56m",
        "firstSeen": "04-13 13:10",
        "lastSeen": "04-13 18:06",
        "heartbeatCount": 1,
        "tags": [
          {
            "tone": "info",
            "label": "US"
          },
          {
            "tone": "neutral",
            "label": "firefox"
          },
          {
            "tone": "neutral",
            "label": "Windows 7"
          },
          {
            "tone": "neutral",
            "label": "laptop"
          },
          {
            "tone": "neutral",
            "label": "6 页面"
          },
          {
            "tone": "neutral",
            "label": "33 关键事件"
          },
          {
            "tone": "neutral",
            "label": "活跃 4h56m"
          }
        ],
        "summary": "主要是在聊天、生成和后台页面之间切换，没有形成更明确的关键转化动作。",
        "why": "主要是在聊天、生成和后台页面之间切换，没有形成更明确的关键转化动作。",
        "failureDetail": null,
        "route": [
          "查看 首页",
          "查看 注册成功页",
          "查看 生成页",
          "查看 聊天页",
          "查看 生成页",
          "查看 首页"
        ],
        "stageHits": [
          "entry",
          "generate",
          "chat",
          "billing",
          "error"
        ],
        "anomalies": [],
        "timeline": [
          {
            "name": "page_view",
            "path": "/",
            "label": "查看 首页",
            "at": "04-13 13:10",
            "delay": null,
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/auth/register-success",
            "label": "查看 注册成功页",
            "at": "04-13 13:10",
            "delay": "19s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/app/generate",
            "label": "查看 生成页",
            "at": "04-13 13:10",
            "delay": "1s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/app/chat",
            "label": "查看 聊天页",
            "at": "04-13 13:31",
            "delay": "20m53s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/app/generate",
            "label": "查看 生成页",
            "at": "04-13 13:31",
            "delay": "3s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/",
            "label": "查看 首页",
            "at": "04-13 13:31",
            "delay": "7s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/settings/credits",
            "label": "查看 积分设置",
            "at": "04-13 13:32",
            "delay": "3s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/",
            "label": "查看 首页",
            "at": "04-13 13:32",
            "delay": "9s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/auth/register-success",
            "label": "查看 注册成功页",
            "at": "04-13 13:33",
            "delay": "1m01s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/app/generate",
            "label": "查看 生成页",
            "at": "04-13 13:33",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/auth/error",
            "label": "查看 认证错误页",
            "at": "04-13 13:34",
            "delay": "47s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/app/generate",
            "label": "查看 生成页",
            "at": "04-13 13:34",
            "delay": "6s",
            "detail": null
          }
        ],
        "webhookTrail": []
      },
      {
        "id": "92391b82",
        "emoji": "👀",
        "label": "浅浏览",
        "country": "US",
        "source": "(direct)",
        "browser": "firefox",
        "os": "Windows 7",
        "device": "laptop",
        "totalEvents": 20,
        "meaningfulEvents": 17,
        "uniquePages": 3,
        "activeWindow": "15m36s",
        "firstSeen": "04-14 18:00",
        "lastSeen": "04-14 18:15",
        "heartbeatCount": 3,
        "tags": [
          {
            "tone": "info",
            "label": "US"
          },
          {
            "tone": "neutral",
            "label": "firefox"
          },
          {
            "tone": "neutral",
            "label": "Windows 7"
          },
          {
            "tone": "neutral",
            "label": "laptop"
          },
          {
            "tone": "neutral",
            "label": "3 页面"
          },
          {
            "tone": "neutral",
            "label": "17 关键事件"
          },
          {
            "tone": "neutral",
            "label": "活跃 15m36s"
          }
        ],
        "summary": "当前样例更像浅浏览或导航切换，需要更多自定义事件才能解释得更细。",
        "why": "当前样例更像浅浏览或导航切换，需要更多自定义事件才能解释得更细。",
        "failureDetail": null,
        "route": [
          "查看 生成页",
          "查看 首页",
          "看到落地页",
          "查看 注册成功页",
          "查看 生成页",
          "查看 首页"
        ],
        "stageHits": [
          "entry",
          "generate",
          "error"
        ],
        "anomalies": [],
        "timeline": [
          {
            "name": "page_view",
            "path": "/app/generate",
            "label": "查看 生成页",
            "at": "04-14 18:00",
            "delay": null,
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/",
            "label": "查看 首页",
            "at": "04-14 18:02",
            "delay": "2m17s",
            "detail": null
          },
          {
            "name": "lp_view",
            "path": "/",
            "label": "看到落地页",
            "at": "04-14 18:02",
            "delay": "1s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/auth/register-success",
            "label": "查看 注册成功页",
            "at": "04-14 18:02",
            "delay": "18s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/app/generate",
            "label": "查看 生成页",
            "at": "04-14 18:02",
            "delay": "1s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/",
            "label": "查看 首页",
            "at": "04-14 18:14",
            "delay": "11m23s",
            "detail": null
          },
          {
            "name": "lp_view",
            "path": "/",
            "label": "看到落地页",
            "at": "04-14 18:14",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/auth/register-success",
            "label": "查看 注册成功页",
            "at": "04-14 18:14",
            "delay": "16s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/app/generate",
            "label": "查看 生成页",
            "at": "04-14 18:14",
            "delay": "1s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/",
            "label": "查看 首页",
            "at": "04-14 18:15",
            "delay": "1m09s",
            "detail": null
          },
          {
            "name": "lp_view",
            "path": "/",
            "label": "看到落地页",
            "at": "04-14 18:15",
            "delay": "立即",
            "detail": null
          }
        ],
        "webhookTrail": []
      },
      {
        "id": "2eefd013",
        "emoji": "👀",
        "label": "浅浏览",
        "country": "SI",
        "source": "google.com",
        "browser": "chrome",
        "os": "Windows 10",
        "device": "laptop",
        "totalEvents": 15,
        "meaningfulEvents": 15,
        "uniquePages": 6,
        "activeWindow": "16m49s",
        "firstSeen": "04-16 10:24",
        "lastSeen": "04-16 10:41",
        "heartbeatCount": 0,
        "tags": [
          {
            "tone": "info",
            "label": "SI"
          },
          {
            "tone": "neutral",
            "label": "chrome"
          },
          {
            "tone": "neutral",
            "label": "Windows 10"
          },
          {
            "tone": "neutral",
            "label": "laptop"
          },
          {
            "tone": "neutral",
            "label": "6 页面"
          },
          {
            "tone": "neutral",
            "label": "15 关键事件"
          },
          {
            "tone": "neutral",
            "label": "活跃 16m49s"
          }
        ],
        "summary": "主要是在聊天、生成和后台页面之间切换，没有形成更明确的关键转化动作。",
        "why": "主要是在聊天、生成和后台页面之间切换，没有形成更明确的关键转化动作。",
        "failureDetail": null,
        "route": [
          "查看 首页",
          "查看 聊天页",
          "查看 首页",
          "查看 注册成功页",
          "查看 聊天页",
          "查看 /my-works"
        ],
        "stageHits": [
          "entry",
          "chat",
          "error"
        ],
        "anomalies": [],
        "timeline": [
          {
            "name": "page_view",
            "path": "/",
            "label": "查看 首页",
            "at": "04-16 10:24",
            "delay": null,
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/app/chat",
            "label": "查看 聊天页",
            "at": "04-16 10:24",
            "delay": "6s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/",
            "label": "查看 首页",
            "at": "04-16 10:24",
            "delay": "6s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/auth/register-success",
            "label": "查看 注册成功页",
            "at": "04-16 10:29",
            "delay": "4m59s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/app/chat",
            "label": "查看 聊天页",
            "at": "04-16 10:29",
            "delay": "立即",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/my-works",
            "label": "查看 /my-works",
            "at": "04-16 10:29",
            "delay": "8s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/video",
            "label": "查看 /video",
            "at": "04-16 10:29",
            "delay": "2s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/image",
            "label": "查看 /image",
            "at": "04-16 10:30",
            "delay": "33s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/video",
            "label": "查看 /video",
            "at": "04-16 10:39",
            "delay": "9m27s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/image",
            "label": "查看 /image",
            "at": "04-16 10:41",
            "delay": "1m22s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/video",
            "label": "查看 /video",
            "at": "04-16 10:41",
            "delay": "2s",
            "detail": null
          }
        ],
        "webhookTrail": []
      },
      {
        "id": "b7c78a7c",
        "emoji": "👀",
        "label": "浅浏览",
        "country": "CN",
        "source": "doubao.com",
        "browser": "edge-chromium",
        "os": "Windows 10",
        "device": "laptop",
        "totalEvents": 16,
        "meaningfulEvents": 15,
        "uniquePages": 4,
        "activeWindow": "21h27m",
        "firstSeen": "04-15 05:03",
        "lastSeen": "04-16 02:30",
        "heartbeatCount": 1,
        "tags": [
          {
            "tone": "info",
            "label": "CN"
          },
          {
            "tone": "neutral",
            "label": "edge-chromium"
          },
          {
            "tone": "neutral",
            "label": "Windows 10"
          },
          {
            "tone": "neutral",
            "label": "laptop"
          },
          {
            "tone": "neutral",
            "label": "4 页面"
          },
          {
            "tone": "neutral",
            "label": "15 关键事件"
          },
          {
            "tone": "neutral",
            "label": "活跃 21h27m"
          }
        ],
        "summary": "当前样例更像浅浏览或导航切换，需要更多自定义事件才能解释得更细。",
        "why": "当前样例更像浅浏览或导航切换，需要更多自定义事件才能解释得更细。",
        "failureDetail": null,
        "route": [
          "查看 中文页",
          "查看 /zh",
          "查看 中文页",
          "查看 /zh",
          "查看 中文页",
          "查看 /zh"
        ],
        "stageHits": [],
        "anomalies": [],
        "timeline": [
          {
            "name": "page_view",
            "path": "/zh/app/chat",
            "label": "查看 中文页",
            "at": "04-15 05:03",
            "delay": null,
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/zh",
            "label": "查看 /zh",
            "at": "04-15 05:06",
            "delay": "2m32s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/zh/app/generate",
            "label": "查看 中文页",
            "at": "04-15 05:10",
            "delay": "4m02s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/zh",
            "label": "查看 /zh",
            "at": "04-15 05:48",
            "delay": "37m55s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/zh/zh/pricing",
            "label": "查看 中文页",
            "at": "04-15 05:48",
            "delay": "8s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/zh",
            "label": "查看 /zh",
            "at": "04-15 05:48",
            "delay": "2s",
            "detail": null
          }
        ],
        "webhookTrail": []
      },
      {
        "id": "bc30b8fc",
        "emoji": "👀",
        "label": "浅浏览",
        "country": "CN",
        "source": "(direct)",
        "browser": "chrome",
        "os": "Windows 10",
        "device": "laptop",
        "totalEvents": 13,
        "meaningfulEvents": 13,
        "uniquePages": 5,
        "activeWindow": "51h19m",
        "firstSeen": "04-14 03:46",
        "lastSeen": "04-16 07:05",
        "heartbeatCount": 0,
        "tags": [
          {
            "tone": "info",
            "label": "CN"
          },
          {
            "tone": "neutral",
            "label": "chrome"
          },
          {
            "tone": "neutral",
            "label": "Windows 10"
          },
          {
            "tone": "neutral",
            "label": "laptop"
          },
          {
            "tone": "neutral",
            "label": "5 页面"
          },
          {
            "tone": "neutral",
            "label": "13 关键事件"
          },
          {
            "tone": "neutral",
            "label": "活跃 51h19m"
          }
        ],
        "summary": "主要是在聊天、生成和后台页面之间切换，没有形成更明确的关键转化动作。",
        "why": "主要是在聊天、生成和后台页面之间切换，没有形成更明确的关键转化动作。",
        "failureDetail": null,
        "route": [
          "查看 首页",
          "查看 聊天页",
          "查看 生成页",
          "查看 聊天页",
          "查看 生成页",
          "查看 聊天页"
        ],
        "stageHits": [
          "entry",
          "generate",
          "chat"
        ],
        "anomalies": [],
        "timeline": [
          {
            "name": "page_view",
            "path": "/",
            "label": "查看 首页",
            "at": "04-14 03:46",
            "delay": null,
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/app/chat",
            "label": "查看 聊天页",
            "at": "04-14 03:48",
            "delay": "2m24s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/app/generate",
            "label": "查看 生成页",
            "at": "04-14 03:48",
            "delay": "6s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/app/chat",
            "label": "查看 聊天页",
            "at": "04-14 03:48",
            "delay": "1s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/app/generate",
            "label": "查看 生成页",
            "at": "04-14 03:48",
            "delay": "2s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/app/chat",
            "label": "查看 聊天页",
            "at": "04-14 03:48",
            "delay": "1s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/",
            "label": "查看 首页",
            "at": "04-14 03:48",
            "delay": "1s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/image",
            "label": "查看 /image",
            "at": "04-14 03:48",
            "delay": "8s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/",
            "label": "查看 首页",
            "at": "04-14 03:48",
            "delay": "2s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/video",
            "label": "查看 /video",
            "at": "04-14 03:48",
            "delay": "3s",
            "detail": null
          },
          {
            "name": "page_view",
            "path": "/app/generate",
            "label": "查看 生成页",
            "at": "04-14 05:47",
            "delay": "1h58m",
            "detail": null
          }
        ],
        "webhookTrail": []
      }
    ]
  }
};
