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

  toggle.addEventListener("click", function () {
    var expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", expanded ? "false" : "true");
    popup.hidden = expanded;
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
