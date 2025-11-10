document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const header = document.querySelector(".header");
  const nav = document.getElementById("primary-nav");

  if (burger && header && nav) {
    burger.addEventListener("click", () => {
      const isOpen = header.classList.toggle("menu-open");
      burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        header.classList.remove("menu-open");
        burger.setAttribute("aria-expanded", "false");
      })
    );

    window.addEventListener("resize", () => {
      if (window.innerWidth > 480 && header.classList.contains("menu-open")) {
        header.classList.remove("menu-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }
});

