(function () {
  var STORAGE_KEY = "weddingAchievements";
  var openCard = document.getElementById("openCard");
  var dressColors = document.querySelector("#dress .dots");
  var toggle = document.getElementById("achievementToggle");
  var popup = document.getElementById("achievementPopup");
  var firstContact = document.getElementById("achievementFirstContact");
  var fashionist = document.getElementById("achievementFashionist");
  var toast = document.getElementById("achievementToast");
  var toastName = document.getElementById("achievementToastName");
  var colorButtons = dressColors.querySelectorAll("button[data-color]");
  var allColors = Array.prototype.map.call(colorButtons, function (button) {
    return button.dataset.color;
  });
  var state = { firstContact: false, visitedDressColors: [] };
  var toastTimer;
  var toastHideTimer;
  var dragPointerId = null;
  var dragStartX = 0;
  var dragStartY = 0;
  var dragStartLeft = 0;
  var dragStartTop = 0;
  var hasDragged = false;
  var suppressClick = false;

  try {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      var parsed = JSON.parse(stored);
      if (parsed && typeof parsed === "object") {
        state.firstContact = parsed.firstContact === true;
        if (Array.isArray(parsed.visitedDressColors)) {
          state.visitedDressColors = parsed.visitedDressColors.filter(
            function (color) {
              return allColors.indexOf(color) !== -1;
            },
          );
        }
      }
    }
  } catch (error) {
    console.warn("Could not load achievement progress from local storage.", error);
  }

  function isFashionist() {
    return (
      allColors.length > 0 &&
      allColors.every(function (color) {
        return state.visitedDressColors.indexOf(color) !== -1;
      })
    );
  }

  function render() {
    firstContact.textContent = state.firstContact ? "First Contact" : "???";
    fashionist.textContent = isFashionist() ? "Fashionist" : "???";
    firstContact.classList.toggle("is-unlocked", state.firstContact);
    fashionist.classList.toggle("is-unlocked", isFashionist());
  }

  function celebrate(name, item) {
    window.clearTimeout(toastTimer);
    window.clearTimeout(toastHideTimer);
    toastName.textContent = name;
    toast.hidden = false;
    toast.classList.remove("is-visible");
    item.classList.remove("just-unlocked");
    void toast.offsetWidth;
    void item.offsetWidth;
    toast.classList.add("is-visible");
    item.classList.add("just-unlocked");
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
      item.classList.remove("just-unlocked");
      toastHideTimer = window.setTimeout(function () {
        toast.hidden = true;
      }, 250);
    }, 2800);
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn("Could not save achievement progress to local storage.", error);
    }
    render();
  }

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
    var boundedLeft = Math.max(0, Math.min(left, maxLeft));
    var boundedTop = Math.max(0, Math.min(top, maxTop));

    toggle.parentElement.style.left = boundedLeft + "px";
    toggle.parentElement.style.top = boundedTop + "px";
    toggle.parentElement.style.right = "auto";
    toggle.parentElement.style.bottom = "auto";
  }

  openCard.addEventListener("click", function () {
    if (!state.firstContact) {
      state.firstContact = true;
      save();
      celebrate("First Contact", firstContact);
    }
  });

  dressColors.addEventListener("click", function (event) {
    var button = event.target.closest("button[data-color]");
    if (!button || state.visitedDressColors.indexOf(button.dataset.color) !== -1) {
      return;
    }
    var hadFashionist = isFashionist();
    state.visitedDressColors.push(button.dataset.color);
    save();
    if (!hadFashionist && isFashionist()) {
      celebrate("Fashionist", fashionist);
    }
  });

  toggle.addEventListener("pointerdown", function (event) {
    if (!event.isPrimary || event.button > 0) return;
    var menuRect = toggle.parentElement.getBoundingClientRect();
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
    if (toggle.parentElement.style.left) {
      var menuRect = toggle.parentElement.getBoundingClientRect();
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

  render();
})();
