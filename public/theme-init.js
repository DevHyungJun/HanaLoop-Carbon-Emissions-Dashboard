(function () {
  try {
    var storageKey = "hana-loop-settings";
    var theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    var stored = localStorage.getItem(storageKey);

    if (stored) {
      var parsed = JSON.parse(stored);

      if (parsed.state && parsed.state.theme) {
        theme = parsed.state.theme;
      }
    }

    document.documentElement.classList.toggle("dark", theme === "dark");
  } catch (error) {
    // ignore
  }
})();
