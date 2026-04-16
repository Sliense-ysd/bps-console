const sections = [
  {
    id: "monitor",
    title: "拍卖监控",
    note: "每天 19:00 的监控、结果 release、README 看板都从这里进。",
    items: [
      {
        label: "Domain Auction Monitor",
        code: "19:00",
        note: "cron-hub 每晚扫描多来源过期/拍卖域名。",
        href: "https://github.com/Sliense-ysd/cron-hub/actions/workflows/domain-auction-monitor.yml",
      },
      {
        label: "domain-data release",
        code: "release",
        note: "工作流持久化用的拍卖域名数据 release。",
        href: "https://github.com/Sliense-ysd/cron-hub/releases/tag/domain-data",
      },
      {
        label: "cron-hub README",
        code: "dashboard",
        note: "从 markdown 看监控面板总览。",
        href: "https://github.com/Sliense-ysd/cron-hub/blob/main/README.md",
      },
    ],
  },
  {
    id: "factory",
    title: "域名工厂",
    note: "branch-per-domain 的仓库、分支、文档和示例资产。",
    items: [
      {
        label: "expired-domain-sites 仓库",
        code: "repo",
        note: "分支即域名、worktree 即站点的工厂仓库。",
        href: "https://github.com/Sliense-ysd/expired-domain-sites",
      },
      {
        label: "Architecture 文档",
        code: "docs",
        note: "看域名工厂的结构和部署模型。",
        href: "https://github.com/Sliense-ysd/expired-domain-sites/blob/main/docs/architecture.md",
      },
      {
        label: "Whitelist Onboarding",
        code: "docs",
        note: "白名单准入流程和 manifest 要求。",
        href: "https://github.com/Sliense-ysd/expired-domain-sites/blob/main/docs/whitelist-onboarding.md",
      },
      {
        label: "Bootstrap 脚本",
        code: "script",
        note: "新域名分支和 worktree 的初始化脚本。",
        href: "https://github.com/Sliense-ysd/expired-domain-sites/blob/main/scripts/bootstrap-domain-branch.sh",
      },
      {
        label: "site/otakuvn.net 分支",
        code: "branch",
        note: "当前已有的域名分支示例。",
        href: "https://github.com/Sliense-ysd/expired-domain-sites/tree/site/otakuvn.net",
      },
      {
        label: "otakuvn manifest",
        code: "manifest",
        note: "看现成域名的 metadata 示例。",
        href: "https://github.com/Sliense-ysd/expired-domain-sites/blob/main/manifests/domains/otakuvn.net.json",
      },
    ],
  },
  {
    id: "sources",
    title: "数据源入口",
    note: "拍卖监控当前使用的主要数据源。",
    items: [
      {
        label: "CatchDoms",
        code: "source",
        note: "CatchDoms API / 列表源。",
        href: "https://catchdoms.com/",
      },
      {
        label: "GoDaddy Auctions",
        code: "source",
        note: "GoDaddy 拍卖入口。",
        href: "https://auctions.godaddy.com/",
      },
      {
        label: "ExpiredDomains",
        code: "source",
        note: "ExpiredDomains 过期域名总入口。",
        href: "https://www.expireddomains.net/",
      },
      {
        label: "DropCatch",
        code: "source",
        note: "DropCatch expiring auctions。",
        href: "https://www.dropcatch.com/browse/expiring",
      },
      {
        label: "Namecheap Marketplace CSV",
        code: "source",
        note: "Namecheap 拍卖 CSV 下载页。",
        href: "https://www.namecheap.com/domains/marketplace/download-marketplace-data/",
      },
    ],
  },
];

const mount = document.querySelector("#domain-sections");
const searchInput = document.querySelector("#domain-search");
const linkCount = document.querySelector("#domain-link-count");
const sectionCount = document.querySelector("#domain-section-count");

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function matches(section, item, search) {
  if (!search) return true;
  return [section.title, section.note, item.label, item.code, item.note]
    .join(" ")
    .toLowerCase()
    .includes(search);
}

function render() {
  const search = searchInput.value.trim().toLowerCase();
  const filtered = [];
  let total = 0;

  sections.forEach((section) => {
    const items = section.items.filter((item) => matches(section, item, search));
    if (items.length > 0) {
      filtered.push({ ...section, items });
      total += items.length;
    }
  });

  linkCount.textContent = `${total} 个入口`;
  sectionCount.textContent = `${filtered.length} 个分组`;

  if (filtered.length === 0) {
    mount.innerHTML = `
      <section class="empty-state">
        <h2>没有匹配的入口</h2>
        <p>试试搜 auction、whitelist、otakuvn、source。</p>
      </section>
    `;
    return;
  }

  mount.innerHTML = filtered
    .map(
      (section) => `
        <section class="tag-group" id="${section.id}">
          <div class="tag-group-head">
            <div>
              <h2>${escapeHtml(section.title)}</h2>
              <p>${escapeHtml(section.note)}</p>
            </div>
            <span class="detail-pill">${section.items.length} 个入口</span>
          </div>
          <div class="tag-grid">
            ${section.items
              .map(
                (item) => `
                  <a class="tag-card" href="${item.href}" target="_blank" rel="noreferrer">
                    <span class="tag-code">${escapeHtml(item.code)}</span>
                    <strong>${escapeHtml(item.label)}</strong>
                    <p>${escapeHtml(item.note)}</p>
                    <span class="tag-link">打开入口 →</span>
                  </a>
                `,
              )
              .join("")}
          </div>
        </section>
      `,
    )
    .join("");
}

searchInput.addEventListener("input", render);
render();
