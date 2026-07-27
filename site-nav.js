(() => {
  const navs = document.querySelectorAll("[data-site-nav]");

  navs.forEach((nav) => {
    const button = nav.querySelector("[data-nav-toggle]");
    if (!button) return;

    const close = () => {
      nav.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
      button.textContent = "菜单";
    };

    button.addEventListener("click", () => {
      const willOpen = !nav.classList.contains("is-open");
      navs.forEach((other) => {
        other.classList.remove("is-open");
        const otherButton = other.querySelector("[data-nav-toggle]");
        if (otherButton) {
          otherButton.setAttribute("aria-expanded", "false");
          otherButton.textContent = "菜单";
        }
      });
      nav.classList.toggle("is-open", willOpen);
      button.setAttribute("aria-expanded", String(willOpen));
      button.textContent = willOpen ? "关闭" : "菜单";
    });

    nav.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        close();
        button.focus();
      }
    });

    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
  });

  document.addEventListener("click", (event) => {
    navs.forEach((nav) => {
      if (!nav.contains(event.target)) {
        nav.classList.remove("is-open");
        const button = nav.querySelector("[data-nav-toggle]");
        if (button) {
          button.setAttribute("aria-expanded", "false");
          button.textContent = "菜单";
        }
      }
    });
  });
})();
