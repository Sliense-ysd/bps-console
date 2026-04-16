(function initPersistentBrainwavePlayer() {
  const STORAGE_KEY = "bps-brainwave-player-state-v1";
  const SAVE_INTERVAL_MS = 1500;
  const listeners = new Set();

  const existingAudio =
    document.querySelector("[data-brainwave-audio]") ||
    document.querySelector("#audio");
  const audio = existingAudio || document.createElement("audio");

  if (!existingAudio) {
    audio.id = "persistent-brainwave-audio";
    audio.preload = "metadata";
    audio.hidden = true;
    document.body.appendChild(audio);
  }

  audio.dataset.brainwaveAudio = "true";

  let state = readState();
  let pendingSeek = null;
  let lastSavedAt = 0;
  let dock = null;

  ensureDockStyles();
  ensureDock();
  applyState(state);
  syncUi();

  audio.addEventListener("loadedmetadata", () => {
    if (typeof pendingSeek === "number") {
      try {
        audio.currentTime = pendingSeek;
      } catch {}
      pendingSeek = null;
    }
    persistFromAudio();
  });

  audio.addEventListener("play", () => {
    persistFromAudio({ isPlaying: true, autoplayBlocked: false });
  });

  audio.addEventListener("pause", () => {
    persistFromAudio({ isPlaying: false });
  });

  audio.addEventListener("ended", () => {
    writeState({
      isPlaying: false,
      currentTime: 0,
      autoplayBlocked: false,
    });
  });

  audio.addEventListener("timeupdate", () => {
    const now = Date.now();
    if (now - lastSavedAt >= SAVE_INTERVAL_MS) {
      lastSavedAt = now;
      persistFromAudio();
    }
  });

  window.addEventListener("beforeunload", () => {
    persistFromAudio();
  });

  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY || !event.newValue) {
      return;
    }

    try {
      state = JSON.parse(event.newValue);
    } catch {
      return;
    }

    syncUi();
    emit();
  });

  window.brainwavePlayer = {
    audio,
    getState,
    setTrack,
    play,
    pause,
    stop,
    setVolume,
    subscribe(listener) {
      listeners.add(listener);
      listener(getState());
      return () => listeners.delete(listener);
    },
  };

  function readState() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  function writeState(nextState) {
    state = {
      ...state,
      ...nextState,
      updatedAt: Date.now(),
    };

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}

    syncUi();
    emit();
  }

  function getState() {
    return {
      ...state,
      src: audio.currentSrc || state.src || "",
      currentTime: Number.isFinite(audio.currentTime) ? audio.currentTime : state.currentTime || 0,
      duration: Number.isFinite(audio.duration) ? audio.duration : state.duration || null,
      isPlaying: !audio.paused && !audio.ended && !!(audio.currentSrc || state.src),
      volume: audio.volume,
    };
  }

  function setTrack(track) {
    if (!track?.src) {
      return;
    }

    const currentSrc = audio.currentSrc || audio.src;
    const isSameTrack = currentSrc === track.src;

    if (!isSameTrack) {
      audio.src = track.src;
      pendingSeek = 0;
    }

    if (typeof track.volume === "number") {
      audio.volume = track.volume;
    } else if (typeof state.volume === "number") {
      audio.volume = state.volume;
    }

    writeState({
      src: track.src,
      title: track.title || "",
      meta: track.meta || "",
      trackId: track.trackId || "",
      currentTime: 0,
      duration: null,
      isPlaying: true,
      autoplayBlocked: false,
    });

    play();
  }

  function play() {
    if (!audio.src && state.src) {
      audio.src = state.src;
    }

    if (typeof state.volume === "number") {
      audio.volume = state.volume;
    }

    const startPlayback = () => {
      const promise = audio.play();
      if (promise?.catch) {
        promise.catch(() => {
          writeState({ isPlaying: false, autoplayBlocked: true });
        });
      }
    };

    if (audio.readyState >= 2) {
      startPlayback();
    } else {
      audio.addEventListener("canplay", startPlayback, { once: true });
      audio.load();
    }
  }

  function pause() {
    audio.pause();
  }

  function stop() {
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    pendingSeek = null;
    writeState({
      src: "",
      title: "",
      meta: "",
      trackId: "",
      currentTime: 0,
      duration: null,
      isPlaying: false,
      autoplayBlocked: false,
    });
  }

  function setVolume(nextVolume) {
    audio.volume = nextVolume;
    writeState({ volume: nextVolume });
  }

  function persistFromAudio(extra = {}) {
    const src = audio.currentSrc || audio.src || state.src;
    if (!src) {
      syncUi();
      emit();
      return;
    }

    writeState({
      src,
      currentTime: Number.isFinite(audio.currentTime) ? audio.currentTime : state.currentTime || 0,
      duration: Number.isFinite(audio.duration) ? audio.duration : state.duration || null,
      volume: audio.volume,
      isPlaying: !audio.paused && !audio.ended,
      ...extra,
    });
  }

  function applyState(savedState) {
    if (!savedState?.src) {
      syncUi();
      return;
    }

    if ((audio.currentSrc || audio.src) !== savedState.src) {
      audio.src = savedState.src;
    }

    if (typeof savedState.volume === "number") {
      audio.volume = savedState.volume;
    }

    if (typeof savedState.currentTime === "number") {
      pendingSeek = savedState.currentTime;
    }

    if (savedState.isPlaying) {
      play();
    }
  }

  function emit() {
    const snapshot = getState();
    listeners.forEach((listener) => listener(snapshot));
  }

  function ensureDock() {
    if (document.querySelector(".brainwave-dock")) {
      dock = document.querySelector(".brainwave-dock");
      bindDockEvents();
      return;
    }

    if (document.querySelector("#player-bar") || document.querySelector(".brain-strip")) {
      return;
    }

    dock = document.createElement("section");
    dock.className = "brainwave-dock";
    dock.innerHTML = `
      <div class="brainwave-dock-copy">
        <strong id="brainwave-dock-title">脑波播放中</strong>
        <span id="brainwave-dock-meta">切页后自动续播</span>
      </div>
      <div class="brainwave-dock-actions">
        <button id="brainwave-dock-toggle" type="button">暂停</button>
        <button id="brainwave-dock-open" type="button">打开脑波页</button>
        <button id="brainwave-dock-stop" type="button">停止</button>
      </div>
    `;

    document.body.appendChild(dock);
    bindDockEvents();
  }

  function bindDockEvents() {
    if (!dock) return;

    dock.querySelector("#brainwave-dock-toggle")?.addEventListener("click", () => {
      if (audio.paused) play();
      else pause();
    });

    dock.querySelector("#brainwave-dock-stop")?.addEventListener("click", () => {
      stop();
    });

    dock.querySelector("#brainwave-dock-open")?.addEventListener("click", () => {
      window.location.href = "/brain-waves/";
    });
  }

  function syncUi() {
    const statusLabel = document.querySelector("#audio-status");
    const volumeSlider = document.querySelector("#volume");
    if (!dock) return;

    const snapshot = getState();
    const hasTrack = Boolean(snapshot.src);

    if (statusLabel) {
      statusLabel.textContent = hasTrack
        ? `${snapshot.isPlaying ? "继续播放" : "已暂停"}：${snapshot.title || "脑波音频"}`
        : "空闲";
    }

    if (volumeSlider && typeof snapshot.volume === "number") {
      volumeSlider.value = String(Math.round(snapshot.volume * 100));
    }

    dock.classList.toggle("visible", hasTrack);
    if (!hasTrack) {
      return;
    }

    const title = dock.querySelector("#brainwave-dock-title");
    const meta = dock.querySelector("#brainwave-dock-meta");
    const toggle = dock.querySelector("#brainwave-dock-toggle");

    title.textContent = snapshot.title || "脑波播放中";
    meta.textContent = snapshot.meta || "切页后自动续播";
    toggle.textContent = snapshot.isPlaying ? "暂停" : "继续播放";
  }

  function ensureDockStyles() {
    if (document.querySelector("#brainwave-dock-styles")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "brainwave-dock-styles";
    style.textContent = `
      .brainwave-dock {
        position: fixed;
        right: 16px;
        bottom: 16px;
        z-index: 1200;
        width: min(420px, calc(100vw - 24px));
        display: none;
        gap: 10px;
        border: 1px solid rgba(102, 93, 81, 0.18);
        border-radius: 14px;
        background: rgba(255, 250, 242, 0.96);
        box-shadow: 0 18px 40px rgba(31, 27, 22, 0.12);
        backdrop-filter: blur(12px);
        padding: 12px;
      }

      .brainwave-dock.visible {
        display: grid;
      }

      .brainwave-dock-copy {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .brainwave-dock-copy strong {
        font-size: 14px;
      }

      .brainwave-dock-copy span {
        color: #6f665c;
        font-size: 12px;
        line-height: 1.45;
      }

      .brainwave-dock-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .brainwave-dock-actions button {
        padding: 7px 10px;
        border: 1px solid rgba(102, 93, 81, 0.18);
        border-radius: 10px;
        background: #fff;
        cursor: pointer;
        font: inherit;
      }
    `;
    document.head.appendChild(style);
  }
})();
