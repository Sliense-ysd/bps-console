const modules = [
  {
    id: "brain",
    title: "Brain Lab",
    description: "Enter a built-in focus audio module without leaving the console.",
    category: "focus",
    status: "live",
    tags: ["brainwaves", "focus", "audio"],
    actionLabel: "Open module",
    href: "#brain-lab",
  },
  {
    id: "builderpulse",
    title: "BuilderPulse",
    description: "Scan daily signals, trending repos, and product angles worth building.",
    category: "research",
    status: "live",
    tags: ["news", "signals", "market"],
    actionLabel: "Open report source",
    href: "https://github.com/BuilderPulse/BuilderPulse",
  },
  {
    id: "analytics",
    title: "Traffic Analytics",
    description: "Jump into the analytics stack to inspect traffic and behavioral signals.",
    category: "analytics",
    status: "private",
    tags: ["umami", "traffic", "journey"],
    actionLabel: "Open analytics",
    href: "https://analytics.seekorigin.ai",
  },
  {
    id: "monitoring",
    title: "Monitoring",
    description: "Open the deployment and runtime control plane for services and schedules.",
    category: "ops",
    status: "private",
    tags: ["dokploy", "deploy", "alerts"],
    actionLabel: "Open ops panel",
    href: "http://31.97.143.166:3000/dashboard/monitoring",
  },
  {
    id: "schedules",
    title: "Schedules",
    description: "Use the future task center for cron jobs, polling tasks, and report runners.",
    category: "ops",
    status: "planned",
    tags: ["cron", "tasks", "automation"],
    actionLabel: "Planned",
    href: "#blueprint",
  },
  {
    id: "keywords",
    title: "Keyword Deck",
    description: "A future surface for keyword mining, topic expansion, and buy-intent tracking.",
    category: "growth",
    status: "planned",
    tags: ["keywords", "research", "buy intent"],
    actionLabel: "Planned",
    href: "#blueprint",
  },
  {
    id: "revenue",
    title: "Revenue View",
    description: "A future board for income, subscriptions, and payment-side health signals.",
    category: "finance",
    status: "planned",
    tags: ["revenue", "mrr", "payments"],
    actionLabel: "Planned",
    href: "#blueprint",
  },
  {
    id: "journey",
    title: "User Journey",
    description: "A future workspace for single-user path reconstruction and conversion drop-offs.",
    category: "analytics",
    status: "planned",
    tags: ["journey", "funnel", "sessions"],
    actionLabel: "Planned",
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

function persistPins() {
  localStorage.setItem(storageKey, JSON.stringify([...pinned]));
  pinnedCount.textContent = String(pinned.size);
}

function buildFilters() {
  const categories = [...new Set(modules.map((item) => item.category))];
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category[0].toUpperCase() + category.slice(1);
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
      <span class="status-badge ${module.status}">${module.status}</span>
    </header>
    <p>${module.description}</p>
    <div class="tag-row">
      ${module.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
    </div>
    <div class="card-footer">
      <a class="${actionClass}" href="${module.href}" ${linkAttrs}>${module.actionLabel}</a>
      <button class="pin-button ${isPinned ? "active" : ""}" data-id="${module.id}" type="button">
        ${isPinned ? "Pinned" : "Pin"}
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

  audioStatus.textContent = "Idle";
}

async function playMode(mode) {
  stopAudio();

  audioContext = new window.AudioContext();

  const profile = {
    alpha: { left: 210, right: 220, label: "Alpha creative calm" },
    beta: { left: 160, right: 174, label: "Beta sharper work" },
    theta: { left: 120, right: 126, label: "Theta slow reset" },
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
  showPinnedButton.textContent = pinnedOnly ? "Show all modules" : "Show pinned only";
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
