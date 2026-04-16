const tagGroups = [
  {
    title: "AI 音乐",
    note: "围绕 AI 音乐生成、作曲、制作流程的标签。",
    tags: [
      { label: "#AIMusic", query: "#AIMusic", note: "AI 音乐产品、模型和 Demo。" },
      { label: "#TextToMusic", query: "#TextToMusic", note: "文本生成音乐相关动态。" },
      { label: "#MusicProduction", query: "#MusicProduction", note: "制作流程、插件和工作流。" },
      { label: "#Songwriting", query: "#Songwriting", note: "歌词、旋律、创作灵感。" },
      { label: "#AIProducer", query: "#AIProducer", note: "AI 制作人与自动化创作。" },
    ],
  },
  {
    title: "AI 视频",
    note: "跟踪文生视频、图生视频和模型对比。",
    tags: [
      { label: "#AIvideo", query: "#AIvideo", note: "AI 视频整体信号入口。" },
      { label: "#ImageToVideo", query: "#ImageToVideo", note: "图生视频作品与模型更新。" },
      { label: "#Seedance", query: "#Seedance", note: "Seedance 相关口碑和案例。" },
      { label: "#KlingAI", query: "#KlingAI", note: "Kling 用户反馈与教程。" },
      { label: "#PixVerse", query: "#PixVerse", note: "PixVerse 案例、玩法和素材。" },
    ],
  },
  {
    title: "独立开发",
    note: "看产品发版、验证和 build in public。",
    tags: [
      { label: "#IndieHackers", query: "#IndieHackers", note: "独立开发者的讨论主场。" },
      { label: "#BuildInPublic", query: "#BuildInPublic", note: "持续公开构建过程。" },
      { label: "#OpenStartup", query: "#OpenStartup", note: "开源式经营数据和里程碑。" },
      { label: "#SaaS", query: "#SaaS", note: "SaaS 新品和运营经验。" },
      { label: "#ProductHunt", query: "#ProductHunt", note: "发版日、点赞和评论信号。" },
    ],
  },
  {
    title: "分析与增长",
    note: "围绕转化、埋点、增长与运营诊断。",
    tags: [
      { label: "#WebAnalytics", query: "#WebAnalytics", note: "分析工具、指标体系和案例。" },
      { label: "#Umami", query: "#Umami", note: "Umami 自建和使用经验。" },
      { label: "#MicrosoftClarity", query: "#MicrosoftClarity", note: "录屏、热图与 UX 诊断。" },
      { label: "#GrowthHacking", query: "#GrowthHacking", note: "增长动作与实验设计。" },
      { label: "#CRO", query: "#CRO", note: "转化优化和表单/支付路径优化。" },
    ],
  },
];

const groupMount = document.querySelector("#tag-groups");
const searchInput = document.querySelector("#tag-search");
const tagCount = document.querySelector("#tag-count");
const groupCount = document.querySelector("#group-count");

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildSearchUrl(query) {
  return `https://x.com/search?q=${encodeURIComponent(query)}&src=typed_query&f=live`;
}

function matchTag(group, tag, search) {
  if (!search) {
    return true;
  }

  const haystack = [group.title, group.note, tag.label, tag.query, tag.note]
    .join(" ")
    .toLowerCase();

  return haystack.includes(search);
}

function render() {
  const search = searchInput.value.trim().toLowerCase();
  const visibleGroups = [];
  let visibleTagCount = 0;

  tagGroups.forEach((group) => {
    const tags = group.tags.filter((tag) => matchTag(group, tag, search));
    if (tags.length > 0) {
      visibleGroups.push({ ...group, tags });
      visibleTagCount += tags.length;
    }
  });

  tagCount.textContent = `${visibleTagCount} 个标签`;
  groupCount.textContent = `${visibleGroups.length} 个分组`;

  if (visibleGroups.length === 0) {
    groupMount.innerHTML = `
      <section class="empty-state">
        <h2>没有匹配的标签</h2>
        <p>试试搜模型名、平台名，或者直接搜 “增长”“音乐”“视频”。</p>
      </section>
    `;
    return;
  }

  groupMount.innerHTML = visibleGroups
    .map(
      (group) => `
        <section class="tag-group">
          <div class="tag-group-head">
            <div>
              <h2>${escapeHtml(group.title)}</h2>
              <p>${escapeHtml(group.note)}</p>
            </div>
            <span class="detail-pill">${group.tags.length} 个标签</span>
          </div>
          <div class="tag-grid">
            ${group.tags
              .map(
                (tag) => `
                  <a class="tag-card" href="${buildSearchUrl(tag.query)}" target="_blank" rel="noreferrer">
                    <span class="tag-code">${escapeHtml(tag.query)}</span>
                    <strong>${escapeHtml(tag.label)}</strong>
                    <p>${escapeHtml(tag.note)}</p>
                    <span class="tag-link">打开 X 实时搜索 →</span>
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
