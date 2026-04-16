const tracks = [
  { id: "delta-05", title: "纯净深度睡眠 0.5Hz", band: "Delta", style: "深睡", duration: "1小时", note: "深度睡眠", src: "https://file.musicmake.ai/brain-waves/audio/01-深睡-Delta-0.5Hz-纯净深度睡眠-1h.mp3" },
  { id: "delta-25", title: "焦虑缓解 2.5Hz", band: "Delta", style: "深睡", duration: "1小时", note: "焦虑缓解", src: "https://file.musicmake.ai/brain-waves/audio/02-深睡-Delta-2.5Hz-焦虑缓解-1h.mp3" },
  { id: "delta-pure", title: "纯净 Delta 2Hz", band: "Delta", style: "Pure", duration: "10分钟", note: "纯音", src: "https://file.musicmake.ai/brain-waves/audio/Loopool-Delta-2Hz-pure.mp3" },
  { id: "delta-sweep", title: "Delta 渐降 4Hz→1Hz", band: "Delta", style: "Sweep", duration: "10分钟", note: "渐进入睡", src: "https://file.musicmake.ai/brain-waves/audio/Delta-4Hz-to-1Hz-sweep-10min.mp3" },

  { id: "theta-6", title: "6Hz Theta 冥想", band: "Theta", style: "冥想", duration: "10分钟", note: "最强证据", src: "https://file.musicmake.ai/brain-waves/audio/Theta-6Hz-meditation-10min.mp3" },
  { id: "theta-4-long", title: "深度冥想 4Hz", band: "Theta", style: "冥想", duration: "1小时", note: "长时版本", src: "https://file.musicmake.ai/brain-waves/audio/03-冥想-Theta-4Hz-深度冥想-1h.mp3" },
  { id: "theta-7", title: "放松创意 7Hz", band: "Theta", style: "创意", duration: "1小时", note: "创作放松", src: "https://file.musicmake.ai/brain-waves/audio/04-创意-Theta-7Hz-放松创意-1h.mp3" },
  { id: "theta-pure", title: "纯净 Theta 5.5Hz", band: "Theta", style: "Pure", duration: "10分钟", note: "纯音", src: "https://file.musicmake.ai/brain-waves/audio/Loopool-Theta-5.5Hz-pure.mp3" },
  { id: "theta-4", title: "Theta 4Hz 冥想音乐", band: "Theta", style: "冥想", duration: "10分钟", note: "短版", src: "https://file.musicmake.ai/brain-waves/audio/Theta-4Hz-meditation-10min.mp3" },
  { id: "theta-5", title: "Theta 5Hz 冥想音乐", band: "Theta", style: "冥想", duration: "10分钟", note: "短版", src: "https://file.musicmake.ai/brain-waves/audio/Theta-5Hz-meditation-10min.mp3" },
  { id: "theta-sweep", title: "Theta 渐降 7.9Hz→4Hz", band: "Theta", style: "Sweep", duration: "10分钟", note: "渐进冥想", src: "https://file.musicmake.ai/brain-waves/audio/Theta-7.9Hz-to-4Hz-sweep-10min.mp3" },

  { id: "alpha-10", title: "纯净放松 10Hz", band: "Alpha", style: "放松", duration: "1小时", note: "经典 Alpha", src: "https://file.musicmake.ai/brain-waves/audio/05-放松-Alpha-10Hz-纯净放松-1h.mp3" },
  { id: "alpha-8", title: "Alpha 8Hz 减压放松", band: "Alpha", style: "放松", duration: "10分钟", note: "减压", src: "https://file.musicmake.ai/brain-waves/audio/Alpha-8Hz-meditation-10min.mp3" },
  { id: "alpha-11", title: "专注创意放松 11Hz", band: "Alpha", style: "专注", duration: "2小时", note: "长时专注", src: "https://file.musicmake.ai/brain-waves/audio/07-专注-Alpha-11Hz-专注创意放松-2h.mp3" },
  { id: "alpha-12", title: "记忆增强 12Hz", band: "Alpha", style: "记忆", duration: "1小时", note: "记忆增强", src: "https://file.musicmake.ai/brain-waves/audio/06-记忆-Alpha-12Hz-记忆增强-1h.mp3" },
  { id: "alpha-study", title: "学习专注脑力提升", band: "Alpha", style: "学习", duration: "2.7小时", note: "学习场景", src: "https://file.musicmake.ai/brain-waves/audio/11-学习-Alpha-学习专注脑力提升-2.7h.mp3" },
  { id: "alpha-pure", title: "纯净 Alpha 10Hz", band: "Alpha", style: "Pure", duration: "10分钟", note: "纯音", src: "https://file.musicmake.ai/brain-waves/audio/Loopool-Alpha-10Hz-pure.mp3" },
  { id: "alpha-sweep", title: "Alpha 渐降 14Hz→7.9Hz", band: "Alpha", style: "Sweep", duration: "10分钟", note: "渐进放松", src: "https://file.musicmake.ai/brain-waves/audio/Alpha-14Hz-to-7.9Hz-sweep-10min.mp3" },

  { id: "beta-pure", title: "Beta 14Hz 专注纯音", band: "Beta", style: "Pure", duration: "10分钟", note: "纯音", src: "https://file.musicmake.ai/brain-waves/audio/Loopool-Beta-14Hz-pure.mp3" },
  { id: "beta-focus", title: "Beta 14Hz 清醒专注", band: "Beta", style: "专注", duration: "~1小时", note: "长时清醒", src: "https://file.musicmake.ai/brain-waves/audio/pure-Beta-14Hz-alertness-focus.mp3" },
  { id: "beta-binaural", title: "Beta 14Hz 双耳节拍", band: "Beta", style: "双耳节拍", duration: "10分钟", note: "binaural", src: "https://file.musicmake.ai/brain-waves/audio/Beta-14Hz-binaural-10min.mp3" },
  { id: "beta-20", title: "Beta 20Hz 深度专注", band: "Beta", style: "专注", duration: "10分钟", note: "较高唤醒", src: "https://file.musicmake.ai/brain-waves/audio/Beta-20Hz-meditation-10min.mp3" },
  { id: "beta-25", title: "Beta 25Hz 高度集中", band: "Beta", style: "专注", duration: "10分钟", note: "高强度", src: "https://file.musicmake.ai/brain-waves/audio/Beta-25Hz-meditation-10min.mp3" },
  { id: "beta-30", title: "纯净专注 30Hz", band: "Beta", style: "专注", duration: "30分钟", note: "高频专注", src: "https://file.musicmake.ai/brain-waves/audio/12-专注-Beta-30Hz-纯净专注-30min.mp3" },

  { id: "gamma-40", title: "40Hz Gamma 专注冥想", band: "Gamma", style: "高认知", duration: "1小时", note: "MIT GENUS", src: "https://file.musicmake.ai/brain-waves/audio/13-高认知-Gamma-40Hz-专注冥想-1h.mp3" },
  { id: "gamma-40-short", title: "40Hz Gamma 冥想音乐", band: "Gamma", style: "高认知", duration: "10分钟", note: "短版", src: "https://file.musicmake.ai/brain-waves/audio/Gamma-40Hz-meditation-10min.mp3" },
  { id: "gamma-boost", title: "激活大脑 100%", band: "Gamma", style: "高认知", duration: "5.5小时", note: "超长版", src: "https://file.musicmake.ai/brain-waves/audio/08-高认知-Gamma-激活大脑100%25-5.5h.mp3" },

  { id: "solfeggio-528", title: "528Hz 自愈抗焦虑冥想", band: "Solfeggio", style: "疗愈", duration: "约25分钟", note: "528Hz", src: "https://file.musicmake.ai/brain-waves/audio/09-自愈-528Hz-抗焦虑冥想.mp3" },
  { id: "solfeggio-639", title: "639Hz 心轮疗愈频率", band: "Solfeggio", style: "疗愈", duration: "约30分钟", note: "639Hz", src: "https://file.musicmake.ai/brain-waves/audio/10-疗愈-639Hz-Solfeggio-心轮频率.mp3" },
];

const bandDescriptions = {
  Delta: "深睡 / 恢复 / 焦虑缓解",
  Theta: "冥想 / 创意 / 放松",
  Alpha: "放松 / 学习 / 记忆 / 专注",
  Beta: "持续专注 / 工作 / 高强度用脑",
  Gamma: "高认知 / 大脑激活 / 冥想",
  Solfeggio: "疗愈频率",
};

const sections = document.querySelector("#sections");
const searchInput = document.querySelector("#search");
const bandFilter = document.querySelector("#band-filter");
const audio = window.brainwavePlayer?.audio || document.querySelector("#audio");
const playerTitle = document.querySelector("#player-title");
const playerMeta = document.querySelector("#player-meta");
const togglePlay = document.querySelector("#toggle-play");
const volume = document.querySelector("#volume");
const sharedBrainwavePlayer = window.brainwavePlayer || null;

let currentTrackId = null;

function syncPlayerUi() {
  const state = sharedBrainwavePlayer?.getState?.();
  if (!state?.src) {
    currentTrackId = null;
    playerTitle.textContent = "未播放";
    playerMeta.textContent = "请选择一条脑波音轨";
    togglePlay.textContent = "播放";
    render();
    return;
  }

  currentTrackId = state.trackId || tracks.find((track) => track.src === state.src)?.id || null;
  playerTitle.textContent = state.title || "脑波音频";
  playerMeta.textContent = state.meta || "继续播放中";
  togglePlay.textContent = state.isPlaying ? "暂停" : "播放";
  if (typeof state.volume === "number") {
    volume.value = String(Math.round(state.volume * 100));
  }
  render();
}

function matchTrack(track) {
  const keyword = searchInput.value.trim().toLowerCase();
  const selectedBand = bandFilter.value;

  if (selectedBand !== "全部" && track.band !== selectedBand) {
    return false;
  }

  if (!keyword) {
    return true;
  }

  const haystack = [track.title, track.band, track.style, track.note].join(" ").toLowerCase();
  return haystack.includes(keyword);
}

function render() {
  sections.innerHTML = "";
  const bands = ["Delta", "Theta", "Alpha", "Beta", "Gamma", "Solfeggio"];

  bands.forEach((band) => {
    const items = tracks.filter((track) => track.band === band && matchTrack(track));
    if (items.length === 0) return;

    const block = document.createElement("section");
    block.className = "band-section";
    block.innerHTML = `
      <div class="band-header">
        <div>
          <h2>${band}</h2>
          <p class="band-subtitle">${bandDescriptions[band]} · ${items.length} 条</p>
        </div>
        <span class="badge">${band}</span>
      </div>
      <div class="track-grid"></div>
    `;

    const grid = block.querySelector(".track-grid");
    items.forEach((track) => {
      const card = document.createElement("article");
      card.className = `track ${currentTrackId === track.id ? "playing" : ""}`;
      card.innerHTML = `
        <div class="track-title">${track.title}</div>
        <div class="track-meta">
          <span>${track.duration}</span>
          <span>${track.style}</span>
          <span>${track.note}</span>
        </div>
        <div class="track-actions">
          <button type="button" data-id="${track.id}">${currentTrackId === track.id && !audio.paused ? "暂停" : "播放"}</button>
          <span class="style-tag">${track.band}</span>
        </div>
      `;
      grid.appendChild(card);
    });

    sections.appendChild(block);
  });

  sections.querySelectorAll("button[data-id]").forEach((button) => {
    button.addEventListener("click", () => playTrack(button.dataset.id));
  });
}

function playTrack(trackId) {
  const track = tracks.find((item) => item.id === trackId);
  if (!track) return;

  if (currentTrackId === trackId && !audio.paused) {
    sharedBrainwavePlayer?.pause?.();
    return;
  }

  currentTrackId = trackId;
  sharedBrainwavePlayer?.setTrack?.({
    src: track.src,
    title: track.title,
    meta: `${track.band} · ${track.style} · ${track.duration} · ${track.note}`,
    trackId: track.id,
    volume: Number(volume.value) / 100,
  });
  syncPlayerUi();
}

togglePlay.addEventListener("click", () => {
  if (!audio.src && !sharedBrainwavePlayer?.getState?.().src) return;
  if (audio.paused) sharedBrainwavePlayer?.play?.();
  else sharedBrainwavePlayer?.pause?.();
});

audio.addEventListener("play", () => {
  togglePlay.textContent = "暂停";
  render();
});

audio.addEventListener("pause", () => {
  togglePlay.textContent = "播放";
  render();
});

audio.addEventListener("ended", () => {
  togglePlay.textContent = "播放";
  render();
});

volume.addEventListener("input", () => {
  sharedBrainwavePlayer?.setVolume?.(Number(volume.value) / 100);
});

audio.volume = Number(volume.value) / 100;
if (sharedBrainwavePlayer?.subscribe) {
  sharedBrainwavePlayer.subscribe(() => {
    syncPlayerUi();
  });
}
searchInput.addEventListener("input", render);
bandFilter.addEventListener("change", render);
render();
syncPlayerUi();
