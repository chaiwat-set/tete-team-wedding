(function () {
  var STORAGE_KEY = "teteTeamWedding.achievements";
  var PREVIOUS_STORAGE_KEY = "teteWedding.achievements";
  var LEGACY_STORAGE_KEY = "weddingAchievements";
  var ACHIEVEMENTS = [
    {
      id: "first-contact",
      category: "normal",
      title: {
        th: "จุดเริ่มต้น",
        en: "First Contact",
      },
      description: {
        th: "ยินดีต้อนรับสู่พื้นที่เล็ก ๆ ของเราสองคน",
        en: "Welcome to our wedding!",
      },
    },
    {
      id: "countdown-started",
      category: "normal",
      title: {
        th: "เริ่มนับถอยหลัง",
        en: "Countdown Started",
      },
      description: {
        th: "ทุกวินาที พาเราเข้าใกล้กันมากขึ้นอีกนิด",
        en: "Every second brings us closer.",
      },
    },
    {
      id: "definitely-not-planning-trips",
      category: "normal",
      title: {
        th: "ไม่ได้วางแผนเที่ยว จริง ๆ นะ",
        en: "Definitely Not Planning Trips",
      },
      description: {
        th: "คุณสำรวจครบทุกที่แล้ว แต่แค่ดูเฉย ๆ ใช่ไหมล่ะ?",
        en: "You’ve explored every travel category. Purely out of curiosity, of course.",
      },
    },
    {
      id: "color-me-impressed",
      category: "normal",
      title: {
        th: "ทุกสีมีความหมาย",
        en: "Color Me Impressed",
      },
      description: {
        th: "วันพิเศษทั้งที สีชุดก็ต้องใส่ใจ",
        en: "You’ve checked out every attire color. Looking good is part of the mission.",
      },
    },
    {
      id: "certified-third-wheeler",
      category: "normal",
      title: {
        th: "กขค. มืออาชีพ",
        en: "Certified Third Wheeler",
      },
      description: {
        th: "มางานแต่งทั้งที ก็ต้องดูให้ครบทุกช็อต",
        en: "You came for the wedding. You stayed for the couple pics.",
      },
    },
    {
      id: "the-grand-tour",
      category: "normal",
      title: {
        th: "นักสำรวจเว็บ",
        en: "The Grand Tour",
      },
      description: {
        th: "เดินทางมาถึงตรงนี้แล้ว เก็บครบทุกโมเมนต์หรือยัง?",
        en: "You made it to the bottom. We hope you enjoyed every moment here.",
      },
    },
    {
      id: "bilingual",
      category: "normal",
      title: {
        th: "ภาษาไหนก็ได้",
        en: "Bilingual",
      },
      description: {
        th: "แค่อยากรู้ว่าเวอร์ชันภาษาอังกฤษดีกว่าหรือเปล่า",
        en: "Just checking if the English version is better.",
      },
    },
    {
      id: "completionist",
      category: "normal",
      title: {
        th: "เก็บครบจบทุกอัน",
        en: "Completionist",
      },
      description: {
        th: "ไม่มีอะไรหลุดรอดสายตาคุณไปได้เลย สงสัยเราต้องทำให้ยากกว่านี้แล้ว",
        en: "Nothing gets past you. We should’ve made it harder.",
      },
    },
    {
      id: "google-maps-expert",
      category: "hidden",
      title: {
        th: "ผู้เชี่ยวชาญ Google Maps",
        en: "Google Maps Expert",
      },
      description: {
        th: "คุณตรวจดูสถานที่จัดงานบน Google Maps แล้ว ทีนี้ก็ไม่มีข้ออ้างให้หลงทางแล้วนะ",
        en: "You’ve checked out our venue on Google Maps. No excuses for getting lost now.",
      },
    },
    {
      id: "speedrunner",
      category: "hidden",
      title: {
        th: "สายสปีดรัน",
        en: "Speedrunner",
      },
      description: {
        th: "ได้อ่านอะไรบ้างหรือเปล่าเนี่ย?",
        en: "Did you even read anything?",
      },
    },
    {
      id: "the-secret-garden",
      category: "hidden",
      title: {
        th: "สวนลับ",
        en: "The Secret Garden",
      },
      description: {
        th: "ความอยากรู้นิดเดียวทำให้ทุกอย่างเบ่งบาน",
        en: "A little curiosity made everything bloom.",
      },
    },
    {
      id: "night-owl",
      category: "hidden",
      title: {
        th: "คนนอนดึก",
        en: "Night Owl",
      },
      description: {
        th: "คนนอนดึก",
        en: "Night Owl",
      },
    },
    {
      id: "touch-grass-later",
      category: "hidden",
      title: {
        th: "ไว้ค่อยออกไปแตะหญ้าทีหลัง",
        en: "Touch Grass Later",
      },
      description: {
        th: "ไว้ค่อยออกไปแตะหญ้าทีหลัง",
        en: "Touch Grass Later",
      },
    },
    {
      id: "one-more-time",
      category: "hidden",
      title: {
        th: "อีกสักครั้ง",
        en: "One More Time",
      },
      description: {
        th: "ในที่สุดมันก็น่าจะทำอะไรสักอย่างได้ใช่ไหม?",
        en: "It has to do something eventually, right?",
      },
    },
    {
      id: "the-blessing",
      category: "hidden",
      title: {
        th: "คำอวยพร",
        en: "The Blessing",
      },
      description: {
        th: "คำอวยพร",
        en: "The Blessing",
      },
    },
  ];

  var state = createDefaultState();
  var activeToasts = [];
  var TOAST_DURATION = 5000;
  var TOAST_FADE_DURATION = 250;

  function createDefaultState() {
    return {
      version: 1,
      language: "th",
      unlocked: [],
      progress: {},
      pendingToast: [],
    };
  }

  function getAchievementById(id) {
    for (var i = 0; i < ACHIEVEMENTS.length; i += 1) {
      if (ACHIEVEMENTS[i].id === id) return ACHIEVEMENTS[i];
    }
    return null;
  }

  function readStorageJSON(key) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (error) {
      console.warn("Could not load achievement progress from local storage.", error);
      return null;
    }
  }

  function writeStorageJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn("Could not save achievement progress to local storage.", error);
      return false;
    }
  }

  function uniqueList(items) {
    var seen = {};
    var result = [];
    items.forEach(function (item) {
      if (!seen[item]) {
        seen[item] = true;
        result.push(item);
      }
    });
    return result;
  }

  function normalizeState(rawState) {
    var normalized = createDefaultState();
    if (!rawState || typeof rawState !== "object") return normalized;
    normalized.version = rawState.version || 1;
    normalized.language = rawState.language === "en" ? "en" : "th";
    normalized.unlocked = Array.isArray(rawState.unlocked)
      ? uniqueList(rawState.unlocked.filter(function (id) { return !!getAchievementById(id); }))
      : [];
    normalized.progress = rawState.progress && typeof rawState.progress === "object" ? rawState.progress : {};
    var pendingToasts = Array.isArray(rawState.pendingToast)
      ? rawState.pendingToast
      : [rawState.pendingToast];
    normalized.pendingToast = uniqueList(
      pendingToasts.filter(function (id) {
        return typeof id === "string" && !!getAchievementById(id);
      }),
    );
    return normalized;
  }

  function storeState() {
    return writeStorageJSON(STORAGE_KEY, state);
  }

  function isUnlocked(id) {
    return state.unlocked.indexOf(id) !== -1;
  }

  function getAchievementText(definition, field) {
    if (!definition) return "";
    var language = state.language === "en" ? "en" : "th";
    var value = definition[field] && definition[field][language];
    if (value) return value;
    return (definition[field] && definition[field].en) || definition.id;
  }

  function loadState() {
    state = normalizeState(readStorageJSON(STORAGE_KEY));
    migratePreviousStorage();
    migrateLegacyStorage();
  }

  function migratePreviousStorage() {
    var previousState = readStorageJSON(PREVIOUS_STORAGE_KEY);
    if (!previousState || typeof previousState !== "object") return;

    if (!readStorageJSON(STORAGE_KEY)) {
      state = normalizeState(previousState);
    }

    if (storeState()) {
      try {
        localStorage.removeItem(PREVIOUS_STORAGE_KEY);
      } catch (error) {
        console.warn("Could not remove migrated achievement progress.", error);
      }
    }
  }

  function migrateLegacyStorage() {
    var legacyState = readStorageJSON(LEGACY_STORAGE_KEY);
    if (!legacyState || typeof legacyState !== "object") {
      if (!readStorageJSON(STORAGE_KEY)) {
        storeState();
      }
      return;
    }

    if (legacyState.firstContact === true) {
      state.unlocked = uniqueList(state.unlocked.concat("first-contact"));
    }

    var legacyColors = Array.isArray(legacyState.visitedDressColors)
      ? legacyState.visitedDressColors.filter(function (color) {
          return typeof color === "string" && color.length > 0;
        })
      : [];

    if (legacyColors.length) {
      state.progress["color-me-impressed"] = uniqueList(legacyColors);
    }

    var validColors = Array.prototype.slice
      .call(document.querySelectorAll("#dress .dot[data-color]"))
      .map(function (button) {
        return button.dataset.color;
      })
      .filter(Boolean);

    if (
      validColors.length > 0 &&
      validColors.every(function (color) {
        return state.progress["color-me-impressed"].indexOf(color) !== -1;
      })
    ) {
      state.unlocked = uniqueList(state.unlocked.concat("color-me-impressed"));
    }

    if (legacyState.language === "en") {
      state.language = "en";
    }

    storeState();
  }

  function renderLanguageToggle() {
    var button = document.getElementById("achievementLanguageToggle");
    if (button) {
      button.textContent = state.language === "en" ? "Language: EN" : "ภาษา: ไทย";
      button.setAttribute("aria-pressed", state.language === "en" ? "true" : "false");
      button.setAttribute(
        "aria-label",
        state.language === "en" ? "Switch achievement language" : "เปลี่ยนภาษาของความสำเร็จ",
      );
    }

    var popupTitle = document.getElementById("achievementPopupTitle");
    var popup = document.getElementById("achievementPopup");
    var toggle = document.getElementById("achievementToggle");
    var isEnglish = state.language === "en";
    if (popupTitle) popupTitle.textContent = isEnglish ? "Achievements" : "ความสำเร็จ";
    if (popup) popup.setAttribute("aria-label", isEnglish ? "Achievements" : "ความสำเร็จ");
    if (toggle) {
      toggle.setAttribute("aria-label", isEnglish ? "Show achievements" : "แสดงความสำเร็จ");
    }
  }

  function renderAchievementItem(item, definition) {
    var unlocked = isUnlocked(definition.id);
    var title = item.querySelector(".achievement-name");
    if (!title) {
      title = document.createElement("span");
      title.className = "achievement-name";
      item.appendChild(title);
    }

    var description = item.querySelector(".achievement-description");
    if (!description) {
      description = document.createElement("span");
      description.className = "achievement-description";
      item.appendChild(description);
    }

    title.textContent = unlocked ? getAchievementText(definition, "title") : "???";
    description.textContent = unlocked ? getAchievementText(definition, "description") : "";
    description.hidden = !unlocked;
    item.classList.toggle("is-unlocked", unlocked);
  }

  function renderAchievementRows() {
    var list = document.querySelector("#achievementPopup ul");
    var firstContactItem = document.getElementById("achievementFirstContact");
    var fashionistItem = document.getElementById("achievementFashionist");

    if (firstContactItem) {
      renderAchievementItem(firstContactItem, getAchievementById("first-contact"));
    }

    if (fashionistItem) {
      renderAchievementItem(fashionistItem, getAchievementById("color-me-impressed"));
    }

    if (!list) return;

    var keyedRows = {};
    Array.prototype.forEach.call(list.querySelectorAll("li[data-achievement-id]"), function (item) {
      keyedRows[item.dataset.achievementId] = item;
    });

    ACHIEVEMENTS.forEach(function (definition) {
      if (definition.id === "first-contact" || definition.id === "color-me-impressed") {
        return;
      }

      var shouldDisplay = definition.category === "normal" || isUnlocked(definition.id);
      if (!shouldDisplay) {
        if (keyedRows[definition.id]) {
          keyedRows[definition.id].remove();
        }
        return;
      }

      var item = keyedRows[definition.id];
      if (!item) {
        item = document.createElement("li");
        item.dataset.achievementId = definition.id;
        item.id = "achievement-" + definition.id;
        list.appendChild(item);
      }

      renderAchievementItem(item, definition);
      keyedRows[definition.id] = item;
    });

    Array.prototype.forEach.call(list.querySelectorAll("li[data-achievement-id]"), function (item) {
      var id = item.dataset.achievementId;
      var definition = getAchievementById(id);
      var shouldKeep = definition && (definition.category === "normal" || isUnlocked(id));
      if (!shouldKeep) {
        item.remove();
      }
    });
  }

  function queueToast(definition) {
    if (!definition) return;
    if (
      state.pendingToast.indexOf(definition.id) !== -1 ||
      activeToasts.some(function (entry) { return entry.definition.id === definition.id; })
    ) {
      return;
    }

    if (document.hidden) {
      state.pendingToast.push(definition.id);
      storeState();
      return;
    }
    showToast(definition);
  }

  function showToast(definition) {
    var template = document.getElementById("achievementToast");
    var container = document.getElementById("achievementToasts");
    if (!template || !container || !definition) return;

    var toast = template.cloneNode(true);
    toast.removeAttribute("id");
    Array.prototype.forEach.call(toast.querySelectorAll("[id]"), function (element) {
      element.removeAttribute("id");
    });
    toast.dataset.achievementId = definition.id;
    toast.hidden = false;
    toast.classList.remove("is-visible");
    container.insertBefore(toast, container.firstChild);
    renderToastText(definition, toast);

    var item = document.getElementById("achievement-" + definition.id);
    if (!item) {
      item = document.getElementById("achievementFirstContact");
      if (definition.id === "color-me-impressed") item = document.getElementById("achievementFashionist");
    }

    if (item) {
      item.classList.remove("just-unlocked");
      void item.offsetWidth;
      item.classList.add("just-unlocked");
    }

    var entry = {
      definition: definition,
      element: toast,
      timeoutId: null,
    };
    activeToasts.push(entry);
    toast.addEventListener("click", function (event) {
      event.stopPropagation();
      var toggle = document.getElementById("achievementToggle");
      if (toggle && toggle.getAttribute("aria-expanded") !== "true") {
        toggle.click();
      }
      removeToast(entry);
    });

    void toast.offsetWidth;
    toast.classList.add("is-visible");
    entry.timeoutId = window.setTimeout(function () {
      toast.classList.remove("is-visible");
      if (item) item.classList.remove("just-unlocked");
      window.setTimeout(function () {
        removeToast(entry);
      }, TOAST_FADE_DURATION);
    }, TOAST_DURATION - TOAST_FADE_DURATION);
  }

  function removeToast(entry) {
    window.clearTimeout(entry.timeoutId);
    entry.element.remove();
    activeToasts = activeToasts.filter(function (activeEntry) {
      return activeEntry !== entry;
    });
  }

  function renderToastText(definition, toast) {
    var toastName = toast && toast.querySelector(".achievement-toast-name");
    var toastDescription = toast && toast.querySelector(".achievement-toast-description");
    if (!toastName || !toastDescription) return;

    toastName.textContent = getAchievementText(definition, "title");
    toastDescription.textContent = getAchievementText(definition, "description");
  }

  function unlockAchievement(id) {
    var definition = getAchievementById(id);
    if (!definition || isUnlocked(id)) return false;

    state.unlocked = uniqueList(state.unlocked.concat(id));
    storeState();
    renderAchievementRows();
    if (id !== "completionist") {
      maybeUnlockCompletionist();
    }
    queueToast(definition);
    return true;
  }

  function getDressColors() {
    return Array.prototype.slice
      .call(document.querySelectorAll("#dress .dot[data-color]"))
      .map(function (button) {
        return button.dataset.color;
      })
      .filter(Boolean);
  }

  function handleColorClick(event) {
    var button = event.target.closest("button[data-color]");
    if (!button) return;

    var color = button.dataset.color;
    if (!color) return;

    if (!Array.isArray(state.progress["color-me-impressed"])) {
      state.progress["color-me-impressed"] = [];
    }

    if (state.progress["color-me-impressed"].indexOf(color) === -1) {
      state.progress["color-me-impressed"].push(color);
      storeState();
    }

    var allColors = getDressColors();
    if (
      allColors.length > 0 &&
      allColors.every(function (candidate) {
        return state.progress["color-me-impressed"].indexOf(candidate) !== -1;
      })
    ) {
      unlockAchievement("color-me-impressed");
    }
  }

  function getAchievementProgressList(id) {
    if (!Array.isArray(state.progress[id])) {
      state.progress[id] = [];
    }
    return state.progress[id];
  }

  function syncTravelCategoryProgress() {
    var buttons = Array.prototype.slice.call(document.querySelectorAll("#tabs button"));
    if (!buttons.length) return;

    var progress = getAchievementProgressList("definitely-not-planning-trips");
    buttons.forEach(function (button) {
      var name = (button.textContent || "").trim();
      if (!name) return;
      if (button.getAttribute("aria-pressed") === "true" && progress.indexOf(name) === -1) {
        progress.push(name);
      }
    });

    state.progress["definitely-not-planning-trips"] = uniqueList(progress);
    var allViewed = buttons.every(function (button) {
      var name = (button.textContent || "").trim();
      return !name || state.progress["definitely-not-planning-trips"].indexOf(name) !== -1;
    });

    if (allViewed) {
      unlockAchievement("definitely-not-planning-trips");
    }
  }

  function syncGalleryProgress() {
    var galleryState = window.__weddingGallery || {};
    var progress = getAchievementProgressList("certified-third-wheeler");
    var previousProgress = progress.slice();
    var activeIndex = Number(galleryState.activeIndex);
    if (!isNaN(activeIndex) && progress.indexOf(activeIndex) === -1) {
      progress.push(activeIndex);
    }

    var allSlides = Array.isArray(galleryState.uniqueIndexes) && galleryState.uniqueIndexes.length
      ? galleryState.uniqueIndexes.slice()
      : Array.prototype.slice
          .call(document.querySelectorAll(".gal-slide"))
          .map(function (slide) {
            return Number(slide.dataset.i);
          })
          .filter(function (index) {
            return !isNaN(index);
          });

    if (!allSlides.length) return;

    state.progress["certified-third-wheeler"] = uniqueList(progress);
    if (
      state.progress["certified-third-wheeler"].length !== previousProgress.length ||
      state.progress["certified-third-wheeler"].some(function (index, position) {
        return index !== previousProgress[position];
      })
    ) {
      storeState();
    }
    var allSeen = allSlides.every(function (index) {
      return state.progress["certified-third-wheeler"].indexOf(index) !== -1;
    });
    if (allSeen) {
      unlockAchievement("certified-third-wheeler");
    }
  }

  function updateScrollAchievements() {
    var gate = document.getElementById("gate");
    if (gate && !gate.classList.contains("gone")) return;

    var countdown = document.querySelector(".countdown");
    if (countdown) {
      var countdownRect = countdown.getBoundingClientRect();
      var viewportMiddle = window.innerHeight / 2;
      if (countdownRect.top <= viewportMiddle && countdownRect.bottom >= viewportMiddle) {
        unlockAchievement("countdown-started");
      }
    }

    var atPageBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2;
    if (atPageBottom) {
      unlockAchievement("the-grand-tour");
    }
  }

  function maybeUnlockCompletionist() {
    var normalIds = ACHIEVEMENTS.filter(function (definition) {
      return definition.category === "normal" && definition.id !== "completionist";
    }).map(function (definition) {
      return definition.id;
    });

    if (normalIds.length > 0 && normalIds.every(function (id) { return isUnlocked(id); })) {
      unlockAchievement("completionist");
    }
  }

  function setLanguage(language) {
    if (language !== "en" && language !== "th") return;
    state.language = language;
    renderLanguageToggle();
    renderAchievementRows();
    storeState();
    activeToasts.forEach(function (entry) {
      renderToastText(entry.definition, entry.element);
    });

    if (state.language === "en" && !isUnlocked("bilingual")) {
      unlockAchievement("bilingual");
    }
  }

  function bindLanguageToggle() {
    var button = document.getElementById("achievementLanguageToggle");
    if (!button) return;

    button.addEventListener("click", function () {
      setLanguage(state.language === "en" ? "th" : "en");
    });
  }

  function bindAchievementToggle() {
    var toggle = document.getElementById("achievementToggle");
    var popup = document.getElementById("achievementPopup");
    var menu = document.querySelector(".achievement-menu");
    if (!toggle || !popup || !menu) return;

    var dragPointerId = null;
    var dragStartX = 0;
    var dragStartY = 0;
    var dragStartLeft = 0;
    var dragStartTop = 0;
    var hasDragged = false;
    var suppressClick = false;

    function closePopup(returnFocus) {
      popup.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      if (returnFocus) toggle.focus();
    }

    function placePopup() {
      var margin = 12;
      var gap = 8;
      var buttonRect = toggle.getBoundingClientRect();
      var popupRect = popup.getBoundingClientRect();
      var left = Math.min(
        Math.max(margin, buttonRect.left),
        window.innerWidth - popupRect.width - margin,
      );
      var top = buttonRect.bottom + gap;

      if (top + popupRect.height > window.innerHeight - margin) {
        top = buttonRect.top - popupRect.height - gap;
      }
      top = Math.max(
        margin,
        Math.min(top, window.innerHeight - popupRect.height - margin),
      );
      popup.style.left = left + "px";
      popup.style.top = top + "px";
    }

    function clampMenuPosition(left, top) {
      var maxLeft = Math.max(0, window.innerWidth - toggle.offsetWidth);
      var maxTop = Math.max(0, window.innerHeight - toggle.offsetHeight);

      menu.style.left = Math.max(0, Math.min(left, maxLeft)) + "px";
      menu.style.top = Math.max(0, Math.min(top, maxTop)) + "px";
      menu.style.right = "auto";
      menu.style.bottom = "auto";
    }

    toggle.addEventListener("pointerdown", function (event) {
      if (!event.isPrimary || event.button > 0) return;
      var menuRect = menu.getBoundingClientRect();
      dragPointerId = event.pointerId;
      dragStartX = event.clientX;
      dragStartY = event.clientY;
      dragStartLeft = menuRect.left;
      dragStartTop = menuRect.top;
      hasDragged = false;
      toggle.setPointerCapture(event.pointerId);
    });

    toggle.addEventListener("pointermove", function (event) {
      if (event.pointerId !== dragPointerId) return;
      var deltaX = event.clientX - dragStartX;
      var deltaY = event.clientY - dragStartY;

      if (!hasDragged && Math.hypot(deltaX, deltaY) > 5) {
        hasDragged = true;
        suppressClick = true;
        closePopup(false);
      }
      if (hasDragged) {
        clampMenuPosition(dragStartLeft + deltaX, dragStartTop + deltaY);
      }
    });

    toggle.addEventListener("pointerup", function (event) {
      if (event.pointerId !== dragPointerId) return;
      dragPointerId = null;
      if (toggle.hasPointerCapture(event.pointerId)) {
        toggle.releasePointerCapture(event.pointerId);
      }
    });

    toggle.addEventListener("pointercancel", function () {
      dragPointerId = null;
      suppressClick = false;
    });

    toggle.addEventListener("click", function (event) {
      if (suppressClick) {
        event.preventDefault();
        suppressClick = false;
        return;
      }

      var expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", expanded ? "false" : "true");
      popup.hidden = expanded;
      if (!expanded) placePopup();
    });

    window.addEventListener("resize", function () {
      if (menu.style.left) {
        var menuRect = menu.getBoundingClientRect();
        clampMenuPosition(menuRect.left, menuRect.top);
      }
      if (!popup.hidden) placePopup();
    });

    document.addEventListener("click", function (event) {
      if (!popup.hidden && !event.target.closest(".achievement-menu")) {
        closePopup(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !popup.hidden) closePopup(true);
    });
  }

  function handlePageVisible() {
    if (document.visibilityState !== "visible" || !state.pendingToast.length) return;

    var pendingIds = state.pendingToast.slice();
    state.pendingToast = [];
    storeState();

    pendingIds.forEach(function (id) {
      var definition = getAchievementById(id);
      if (definition) showToast(definition);
    });
  }

  function bindColorButtons() {
    var colorButtons = document.querySelectorAll("#dress .dot[data-color]");
    colorButtons.forEach(function (button) {
      button.addEventListener("click", handleColorClick);
    });
  }

  function bindFirstContact() {
    var openCard = document.getElementById("openCard");
    if (openCard) {
      openCard.addEventListener("click", function () {
        unlockAchievement("first-contact");
      });
    }
  }

  function observeWhenAvailable(selector, onAvailable) {
    var element = document.querySelector(selector);
    if (element) {
      onAvailable(element);
      return;
    }

    if (!("MutationObserver" in window)) return;

    var observer = new MutationObserver(function () {
      var readyElement = document.querySelector(selector);
      if (!readyElement) return;
      observer.disconnect();
      onAvailable(readyElement);
    });

    observer.observe(document.documentElement || document.body, {
      childList: true,
      subtree: true,
    });
  }

  function bindTravelCategoryProgress() {
    var tabs = document.getElementById("tabs");
    if (!tabs) return;

    tabs.addEventListener("click", function (event) {
      var button = event.target.closest("button");
      if (!button) return;
      if (button.getAttribute("aria-pressed") === "true") {
        syncTravelCategoryProgress();
      }
    });

    if ("MutationObserver" in window) {
      var tabsObserver = new MutationObserver(function () {
        syncTravelCategoryProgress();
      });
      tabsObserver.observe(tabs, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["aria-pressed", "class"],
      });
    }

    syncTravelCategoryProgress();
  }

  function bindGalleryProgress() {
    var track = document.getElementById("galTrack");
    if (!track) return;

    document.addEventListener("wedding-gallery-changed", syncGalleryProgress);
    syncGalleryProgress();

    if ("MutationObserver" in window) {
      var galleryObserver = new MutationObserver(function () {
        syncGalleryProgress();
      });
      galleryObserver.observe(track, {
        subtree: true,
        attributes: true,
        attributeFilter: ["class"],
      });
    }
  }

  function bindScrollProgress() {
    updateScrollAchievements();
    window.addEventListener("scroll", updateScrollAchievements, { passive: true });
    window.addEventListener("resize", updateScrollAchievements);
  }

  function init() {
    loadState();
    bindLanguageToggle();
    bindAchievementToggle();
    bindColorButtons();
    bindFirstContact();
    observeWhenAvailable("#tabs", bindTravelCategoryProgress);
    observeWhenAvailable("#galTrack", bindGalleryProgress);
    bindScrollProgress();
    renderLanguageToggle();
    renderAchievementRows();
    maybeUnlockCompletionist();
    document.addEventListener("visibilitychange", handlePageVisible);
    handlePageVisible();
  }

  init();
})();
