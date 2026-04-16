const modules = [
  { id: "brain", title: "脑波实验室", meta: "29条音轨", category: "专注", status: "live", tags: ["脑波", "专注", "音频"], href: "/brain-waves/" },
  { id: "builderpulse", title: "BuilderPulse", meta: "日报", category: "信号", status: "live", tags: ["新闻", "信号", "市场"], href: "https://github.com/BuilderPulse/BuilderPulse" },
  { id: "news", title: "新闻入口", meta: "预留", category: "信号", status: "planned", tags: ["新闻", "情报"], href: "#" },
  { id: "buildpost", title: "Build Post", meta: "预留", category: "信号", status: "planned", tags: ["帖子", "build"], href: "#" },
  { id: "twitter-tags", title: "推特标签", meta: "20个标签", category: "信号", status: "live", tags: ["twitter", "x", "标签"], href: "./twitter-tags/" },
  { id: "github-bps", title: "BPS 仓库", meta: "GitHub", category: "信号", status: "live", tags: ["github", "repo"], href: "https://github.com/Sliense-ysd/bps-console" },

  { id: "analytics", title: "流量分析", meta: "Umami", category: "分析", status: "private", tags: ["umami", "流量", "路径"], href: "https://analytics.seekorigin.ai" },
  { id: "journey", title: "用户路径", meta: "3站样例", category: "分析", status: "live", tags: ["路径", "漏斗", "会话"], href: "./journeys/" },
  { id: "clarity", title: "录屏回放", meta: "预留", category: "分析", status: "planned", tags: ["clarity", "回放"], href: "#" },
  { id: "conversion", title: "转化漏斗", meta: "预留", category: "分析", status: "planned", tags: ["转化", "漏斗"], href: "#" },
  { id: "heatmap", title: "热力图", meta: "预留", category: "分析", status: "planned", tags: ["热力图", "点击"], href: "#" },
  { id: "alerts", title: "告警面板", meta: "预留", category: "分析", status: "planned", tags: ["告警", "异常"], href: "#" },

  { id: "admin-users", title: "管理员用户", meta: "musicmake.ai", category: "管理员", status: "private", tags: ["admin", "users", "用户"], href: "https://musicmake.ai/admin/users" },
  { id: "admin-scenes", title: "管理员场景", meta: "musicmake.ai", category: "管理员", status: "private", tags: ["admin", "scenes", "场景"], href: "https://musicmake.ai/admin/scenes" },
  { id: "admin-works", title: "管理员作品", meta: "musicmake.ai", category: "管理员", status: "private", tags: ["admin", "works", "作品"], href: "https://musicmake.ai/admin/works" },
  { id: "admin-music-works", title: "音乐作品库", meta: "musicmake.ai", category: "管理员", status: "private", tags: ["admin", "music works", "音乐作品"], href: "https://musicmake.ai/admin/music-works" },
  { id: "admin-feedback", title: "反馈面板", meta: "musicmake.ai", category: "管理员", status: "private", tags: ["admin", "feedback", "反馈"], href: "https://musicmake.ai/admin/feedback" },
  { id: "admin-orders", title: "音乐订单", meta: "musicmake.ai", category: "管理员", status: "private", tags: ["admin", "orders", "订单"], href: "https://musicmake.ai/admin/music-orders" },
  { id: "admin-pdf-concepts", title: "PDF 概念单", meta: "musicmake.ai", category: "管理员", status: "private", tags: ["admin", "pdf", "concepts"], href: "https://musicmake.ai/admin/music-orders/pdf-concepts" },
  { id: "admin-revenue-sites", title: "站点收入", meta: "musicmake.ai", category: "管理员", status: "private", tags: ["admin", "revenue", "sites"], href: "https://musicmake.ai/admin/revenue-sites" },
  { id: "admin-site-conversion", title: "站点转化", meta: "musicmake.ai", category: "管理员", status: "private", tags: ["admin", "conversion", "site"], href: "https://musicmake.ai/admin/site-conversion" },
  { id: "admin-analytics-dashboard", title: "分析仪表盘", meta: "musicmake.ai", category: "管理员", status: "private", tags: ["admin", "analytics", "dashboard"], href: "https://musicmake.ai/admin/analytics-dashboard" },
  { id: "admin-promo-codes", title: "推广码管理", meta: "musicmake.ai", category: "管理员", status: "private", tags: ["admin", "promotion codes", "推广码"], href: "https://musicmake.ai/admin/growth/promotion-codes" },
  { id: "admin-referrals", title: "推荐关系", meta: "musicmake.ai", category: "管理员", status: "private", tags: ["admin", "referrals", "推荐"], href: "https://musicmake.ai/admin/growth/referrals" },

  { id: "monitoring", title: "监控与部署", meta: "Dokploy", category: "运维", status: "private", tags: ["dokploy", "部署", "告警"], href: "http://31.97.143.166:3000/dashboard/monitoring" },
  { id: "deployments", title: "部署记录", meta: "Dokploy", category: "运维", status: "private", tags: ["deploy", "发布"], href: "http://31.97.143.166:3000/dashboard/deployments" },
  { id: "schedules", title: "定时任务", meta: "Dokploy", category: "运维", status: "private", tags: ["cron", "任务", "自动化"], href: "http://31.97.143.166:3000/dashboard/schedules" },
  { id: "docker", title: "Docker", meta: "Dokploy", category: "运维", status: "private", tags: ["docker", "容器"], href: "http://31.97.143.166:3000/dashboard/docker" },
  { id: "requests", title: "请求记录", meta: "Dokploy", category: "运维", status: "private", tags: ["requests", "日志"], href: "http://31.97.143.166:3000/dashboard/requests" },
  { id: "terminal", title: "终端入口", meta: "预留", category: "运维", status: "planned", tags: ["terminal", "ssh"], href: "#" },

  { id: "keywords", title: "找词面板", meta: "预留", category: "增长", status: "planned", tags: ["关键词", "研究", "购买意图"], href: "#" },
  { id: "keyword-demand", title: "需求词", meta: "预留", category: "增长", status: "planned", tags: ["需求词", "词库"], href: "#" },
  { id: "ads", title: "广告入口", meta: "预留", category: "增长", status: "planned", tags: ["广告", "投放"], href: "#" },
  { id: "seo", title: "SEO 面板", meta: "预留", category: "增长", status: "planned", tags: ["seo", "搜索"], href: "#" },
  { id: "content", title: "内容入口", meta: "预留", category: "增长", status: "planned", tags: ["内容", "分发"], href: "#" },
  { id: "trends", title: "趋势追踪", meta: "预留", category: "增长", status: "planned", tags: ["趋势", "关键词"], href: "#" },

  { id: "revenue", title: "收入看板", meta: "预留", category: "收入", status: "planned", tags: ["收入", "MRR", "支付"], href: "#" },
  { id: "payments", title: "支付健康", meta: "预留", category: "收入", status: "planned", tags: ["支付", "订单"], href: "#" },
  { id: "subscriptions", title: "订阅状态", meta: "预留", category: "收入", status: "planned", tags: ["订阅", "续费"], href: "#" },
  { id: "credits", title: "积分经济", meta: "预留", category: "收入", status: "planned", tags: ["积分", "消耗"], href: "#" },

  { id: "workspace", title: "工作区管理", meta: "预留", category: "个人", status: "planned", tags: ["workspace", "管理"], href: "#" },
  { id: "notes", title: "笔记入口", meta: "预留", category: "个人", status: "planned", tags: ["笔记", "记录"], href: "#" },
  { id: "inbox", title: "收件箱", meta: "预留", category: "个人", status: "planned", tags: ["inbox", "待办"], href: "#" },
  { id: "favorites", title: "常用收藏", meta: "本页", category: "个人", status: "live", tags: ["收藏", "常用"], href: "#" },
];

const categoryOrder = ["专注", "信号", "分析", "管理员", "运维", "增长", "收入", "个人"];
const statusLabels = {
  live: "已接入",
  private: "私有",
  planned: "待接入",
};

const storageKey = "bps-console-pins";
const sections = document.querySelector("#sections");
const searchInput = document.querySelector("#search");
const showPinnedButton = document.querySelector("#show-pinned");
const moduleCount = document.querySelector("#module-count");
const pinnedCount = document.querySelector("#pinned-count");
const audioStatus = document.querySelector("#audio-status");
const volumeControl = document.querySelector("#volume");

function loadPinnedIds() {
  try {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

const pinned = new Set(loadPinnedIds());
let pinnedOnly = false;
let audioContext = null;
let audioNodes = [];

function persistPins() {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify([...pinned]));
  } catch {}
  pinnedCount.textContent = String(pinned.size);
}

function matchModule(module) {
  const search = searchInput.value.trim().toLowerCase();
  if (pinnedOnly && !pinned.has(module.id)) {
    return false;
  }

  if (!search) {
    return true;
  }

  const haystack = [module.title, module.meta, module.category, ...module.tags]
    .join(" ")
    .toLowerCase();

  return haystack.includes(search);
}

function createButton(module) {
  const card = document.createElement("article");
  card.className = "entry";

  const isPinned = pinned.has(module.id);
  const isInternal = !module.href.startsWith("#") && !/^https?:\/\//.test(module.href);
  const linkAttrs =
    module.status === "planned"
      ? 'tabindex="-1" aria-disabled="true"'
      : isInternal
        ? ""
        : 'target="_blank" rel="noreferrer"';

  card.innerHTML = `
    <a class="entry-link ${module.status}" href="${module.href}" ${linkAttrs}>
      <span class="entry-title">${module.title}</span>
      <span class="entry-meta">${module.meta}</span>
      <span class="entry-status">${statusLabels[module.status]}</span>
    </a>
    <button class="pin-toggle ${isPinned ? "active" : ""}" data-id="${module.id}" type="button">
      ${isPinned ? "已置顶" : "置顶"}
    </button>
  `;

  return card;
}

function render() {
  sections.innerHTML = "";
  moduleCount.textContent = String(modules.length);
  pinnedCount.textContent = String(pinned.size);

  categoryOrder.forEach((category) => {
    const items = modules.filter((module) => module.category === category && matchModule(module));
    if (items.length === 0) {
      return;
    }

    const section = document.createElement("section");
    section.className = "section-block";
    section.innerHTML = `
      <div class="section-label">
        <h2>${category}</h2>
        <span>${items.length}</span>
      </div>
      <div class="entry-grid"></div>
    `;

    const grid = section.querySelector(".entry-grid");
    items.forEach((module) => grid.appendChild(createButton(module)));
    sections.appendChild(section);
  });

  sections.querySelectorAll(".pin-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const { id } = button.dataset;
      if (pinned.has(id)) {
        pinned.delete(id);
      } else {
        pinned.add(id);
      }
      persistPins();
      render();
    });
  });
}

function stopAudio() {
  audioNodes.forEach((node) => {
    try {
      node.stop?.();
    } catch {}
    node.disconnect?.();
  });

  audioNodes = [];
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }

  audioStatus.textContent = "空闲";
}

async function playMode(mode) {
  stopAudio();
  audioContext = new window.AudioContext();

  const profile = {
    alpha: { left: 210, right: 220, label: "Alpha 创作放松" },
    beta: { left: 160, right: 174, label: "Beta 更专注地工作" },
    theta: { left: 120, right: 126, label: "Theta 缓慢重置" },
  }[mode];

  const gain = audioContext.createGain();
  gain.gain.value = Number(volumeControl.value) / 1000;
  gain.connect(audioContext.destination);

  const leftOsc = audioContext.createOscillator();
  const rightOsc = audioContext.createOscillator();
  const leftPan = audioContext.createStereoPanner();
  const rightPan = audioContext.createStereoPanner();

  leftOsc.frequency.value = profile.left;
  rightOsc.frequency.value = profile.right;
  leftPan.pan.value = -0.45;
  rightPan.pan.value = 0.45;

  leftOsc.connect(leftPan).connect(gain);
  rightOsc.connect(rightPan).connect(gain);

  leftOsc.start();
  rightOsc.start();

  audioNodes = [leftOsc, rightOsc, leftPan, rightPan, gain];
  audioStatus.textContent = profile.label;
}

persistPins();
render();

searchInput.addEventListener("input", render);
showPinnedButton.addEventListener("click", () => {
  pinnedOnly = !pinnedOnly;
  showPinnedButton.textContent = pinnedOnly ? "显示全部" : "只看置顶";
  render();
});

document.querySelectorAll(".tone-button[data-mode]").forEach((button) => {
  button.addEventListener("click", () => playMode(button.dataset.mode));
});

document.querySelector("#stop-audio").addEventListener("click", stopAudio);
volumeControl.addEventListener("input", () => {
  const gainNode = audioNodes.find((node) => typeof node.gain !== "undefined");
  if (gainNode) {
    gainNode.gain.value = Number(volumeControl.value) / 1000;
  }
});
