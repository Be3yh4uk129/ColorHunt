const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeButton();

  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const newTheme = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeButton();
  });
}

function updateThemeButton() {
  const current = document.documentElement.getAttribute("data-theme");
  const btn = document.getElementById("theme-toggle");
  if (btn) btn.textContent = current === "light" ? "🌙" : "☀️";
}
