const modules = [
  {
    id: "brain",
    title: "脑波实验室",
    description: "不离开总控台，直接进入内置专注音频模块。",
    category: "专注",
    status: "live",
    tags: ["脑波", "专注", "音频"],
    actionLabel: "打开模块",
    href: "#brain-lab",
  },
  {
    id: "builderpulse",
    title: "BuilderPulse",
    description: "查看每日信号、热门仓库和值得做的产品方向。",
    category: "研究",
    status: "live",
    tags: ["新闻", "信号", "市场"],
    actionLabel: "打开报告源",
    href: "https://github.com/BuilderPulse/BuilderPulse",
  },
  {
    id: "analytics",
    title: "流量分析",
    description: "进入分析栈查看流量和行为信号。",
    category: "分析",
    status: "private",
    tags: ["umami", "流量", "路径"],
    actionLabel: "打开分析",
    href: "https://analytics.seekorigin.ai",
  },
  {
    id: "monitoring",
    title: "监控与部署",
    description: "打开服务部署、运行时控制和定时任务面板。",
    category: "运营",
    status: "private",
    tags: ["dokploy", "部署", "告警"],
    actionLabel: "打开运营面板",
    href: "http://31.97.143.166:3000/dashboard/monitoring",
  },
  {
    id: "schedules",
    title: "定时任务",
    description: "后续在这里管理 cron、轮询任务和报告任务。",
    category: "运营",
    status: "planned",
    tags: ["cron", "任务", "自动化"],
    actionLabel: "待接入",
    href: "#blueprint",
  },
  {
    id: "keywords",
    title: "找词面板",
    description: "后续在这里做找词、扩词和购买意图追踪。",
    category: "增长",
    status: "planned",
    tags: ["关键词", "研究", "购买意图"],
    actionLabel: "待接入",
    href: "#blueprint",
  },
  {
    id: "revenue",
    title: "收入看板",
    description: "后续在这里看收入、订阅和支付侧健康度。",
    category: "收入",
    status: "planned",
    tags: ["收入", "MRR", "支付"],
    actionLabel: "待接入",
    href: "#blueprint",
  },
  {
    id: "journey",
    title: "用户路径",
    description: "后续在这里还原单用户路径和转化流失点。",
    category: "分析",
    status: "planned",
    tags: ["路径", "漏斗", "会话"],
    actionLabel: "待接入",
    href: "#blueprint",
  },
];

const storageKey = "bps-console-pins";
const audioStatus = document.querySelector("#audio-status");
const volumeControl = document.querySelector("#volume");
const cardGrid = document.querySelector("#card-grid");
const searchInput = document.querySelector("#search");
const categoryFilter = document.querySelector("#category-filter");
const showPinnedButton = document.querySelector("#show-pinned");
const moduleCount = document.querySelector("#module-count");
const pinnedCount = document.querySelector("#pinned-count");

const pinned = new Set(JSON.parse(localStorage.getItem(storageKey) || "[]"));
let pinnedOnly = false;
let audioContext = null;
let audioNodes = [];
const statusLabels = {
  live: "已接入",
  private: "私有",
  planned: "规划中",
};

function persistPins() {
  localStorage.setItem(storageKey, JSON.stringify([...pinned]));
  pinnedCount.textContent = String(pinned.size);
}

function buildFilters() {
  const categories = [...new Set(modules.map((item) => item.category))];
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function createCard(module) {
  const article = document.createElement("article");
  article.className = "module-card";

  const isPinned = pinned.has(module.id);
  const actionClass = module.status === "planned" ? "card-action disabled" : "card-action";
  const isInternal = module.href.startsWith("#");
  const linkAttrs =
    module.status === "planned"
      ? 'tabindex="-1" aria-disabled="true"'
      : isInternal
        ? ""
        : 'target="_blank" rel="noreferrer"';

  article.innerHTML = `
    <header>
      <div>
        <p class="eyebrow">${module.category}</p>
        <h4>${module.title}</h4>
      </div>
      <span class="status-badge ${module.status}">${statusLabels[module.status] || module.status}</span>
    </header>
    <p>${module.description}</p>
    <div class="tag-row">
      ${module.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
    </div>
    <div class="card-footer">
      <a class="${actionClass}" href="${module.href}" ${linkAttrs}>${module.actionLabel}</a>
      <button class="pin-button ${isPinned ? "active" : ""}" data-id="${module.id}" type="button">
        ${isPinned ? "已置顶" : "置顶"}
      </button>
    </div>
  `;

  return article;
}

function matches(module) {
  const search = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;

  const haystack = [
    module.title,
    module.description,
    module.category,
    ...module.tags,
  ]
    .join(" ")
    .toLowerCase();

  if (category !== "all" && module.category !== category) {
    return false;
  }

  if (pinnedOnly && !pinned.has(module.id)) {
    return false;
  }

  return search === "" || haystack.includes(search);
}

function renderCards() {
  const filtered = modules.filter(matches);
  cardGrid.innerHTML = "";

  filtered.forEach((module) => cardGrid.appendChild(createCard(module)));
  moduleCount.textContent = String(modules.length);
  pinnedCount.textContent = String(pinned.size);

  cardGrid.querySelectorAll(".pin-button").forEach((button) => {
    button.addEventListener("click", () => {
      const { id } = button.dataset;
      if (pinned.has(id)) {
        pinned.delete(id);
      } else {
        pinned.add(id);
      }
      persistPins();
      renderCards();
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
  leftPan.pan.value = -0.4;
  rightPan.pan.value = 0.4;

  leftOsc.connect(leftPan).connect(gain);
  rightOsc.connect(rightPan).connect(gain);

  leftOsc.start();
  rightOsc.start();

  audioNodes = [leftOsc, rightOsc, leftPan, rightPan, gain];
  audioStatus.textContent = profile.label;
}

buildFilters();
persistPins();
renderCards();

searchInput.addEventListener("input", renderCards);
categoryFilter.addEventListener("change", renderCards);

showPinnedButton.addEventListener("click", () => {
  pinnedOnly = !pinnedOnly;
  showPinnedButton.textContent = pinnedOnly ? "显示全部模块" : "只看置顶";
  renderCards();
});

document.querySelectorAll(".tone-button[data-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    playMode(button.dataset.mode);
  });
});

document.querySelector("#stop-audio").addEventListener("click", stopAudio);

volumeControl.addEventListener("input", () => {
  const activeGain = audioNodes.find((node) => node.gain);
  if (activeGain) {
    activeGain.gain.value = Number(volumeControl.value) / 1000;
  }
});
