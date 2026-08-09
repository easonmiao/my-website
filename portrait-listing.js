(() => {
  const grids = document.querySelectorAll("[data-masonry]");

  const layout = (grid) => {
    if (window.matchMedia("(max-width: 760px)").matches) {
      grid.querySelectorAll("[data-masonry-card]").forEach((card) => {
        card.style.gridRowEnd = "auto";
      });
      return;
    }

    const styles = getComputedStyle(grid);
    const row = Number.parseFloat(styles.gridAutoRows) || 8;
    const gap = Number.parseFloat(styles.rowGap) || 16;

    grid.querySelectorAll("[data-masonry-card]").forEach((card) => {
      card.style.gridRowEnd = "auto";
      const height = card.getBoundingClientRect().height;
      card.style.gridRowEnd = `span ${Math.ceil((height + gap) / (row + gap))}`;
    });
  };

  const schedule = () => requestAnimationFrame(() => grids.forEach(layout));

  grids.forEach((grid) => {
    grid.querySelectorAll("img").forEach((image) => {
      if (!image.complete) image.addEventListener("load", schedule, { once: true });
    });
  });

  const topicLinks = document.querySelectorAll("[data-topic-link]");
  topicLinks.forEach((link) => {
    link.addEventListener("click", () => {
      topicLinks.forEach((item) => item.removeAttribute("aria-current"));
      link.setAttribute("aria-current", "true");
    });
  });

  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(schedule);
    grids.forEach((grid) => observer.observe(grid));
  } else {
    window.addEventListener("resize", schedule, { passive: true });
  }

  window.addEventListener("load", schedule, { once: true });
  schedule();
})();
