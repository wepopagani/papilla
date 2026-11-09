(() => {
  const track = document.querySelector("#instagram-track");
  if (!track) return;

  const cards = [...track.querySelectorAll(".instagram-card")];
  const previous = document.querySelector("#instagram-previous");
  const next = document.querySelector("#instagram-next");
  const position = document.querySelector("#instagram-position");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const fallback = {
    "carousel.position": "{start}–{end} di {total}",
    "carousel.previous": "Post precedenti",
    "carousel.next": "Post successivi",
    "carousel.label": "Post Instagram di Papilla"
  };
  let updateFrame = 0;

  function translate(key) {
    const translated = window.PapillaLocale?.t(key);
    return translated && translated !== key ? translated : fallback[key];
  }

  function updateControls() {
    const maximum = Math.max(0, track.scrollWidth - track.clientWidth);
    const left = track.scrollLeft;
    previous.disabled = left <= 1;
    next.disabled = left >= maximum - 1;

    const visibleCards = cards.filter((card) => {
      const overlap = Math.min(card.offsetLeft + card.offsetWidth, left + track.clientWidth)
        - Math.max(card.offsetLeft, left);
      return overlap >= card.offsetWidth * .5;
    });
    const first = visibleCards[0] || cards[0];
    const last = visibleCards[visibleCards.length - 1] || first;
    const values = {
      start: cards.indexOf(first) + 1,
      end: cards.indexOf(last) + 1,
      total: cards.length
    };
    position.textContent = translate("carousel.position").replace(/\{(start|end|total)\}/g,
      (_, key) => String(values[key]));
  }

  function scheduleUpdate() {
    if (updateFrame) return;
    updateFrame = window.requestAnimationFrame(() => {
      updateFrame = 0;
      updateControls();
    });
  }

  function moveTo(left) {
    const maximum = Math.max(0, track.scrollWidth - track.clientWidth);
    const paused = document.body.classList.contains("motion-paused") || reducedMotion.matches;
    track.scrollTo({ left: Math.max(0, Math.min(left, maximum)), behavior: paused ? "instant" : "smooth" });
  }

  function moveByCard(direction) {
    const step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth;
    moveTo(track.scrollLeft + direction * step);
  }

  function updateLanguage() {
    previous.setAttribute("aria-label", translate("carousel.previous"));
    next.setAttribute("aria-label", translate("carousel.next"));
    track.setAttribute("aria-label", translate("carousel.label"));
    updateControls();
  }

  previous.addEventListener("click", () => moveByCard(-1));
  next.addEventListener("click", () => moveByCard(1));
  track.addEventListener("scroll", scheduleUpdate, { passive: true });
  track.addEventListener("focusin", scheduleUpdate);
  track.addEventListener("keydown", (event) => {
    if (event.target !== track) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      moveByCard(event.key === "ArrowRight" ? 1 : -1);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      moveTo(event.key === "Home" ? 0 : track.scrollWidth - track.clientWidth);
    }
  });
  if ("ResizeObserver" in window) {
    new ResizeObserver(scheduleUpdate).observe(track);
  } else {
    window.addEventListener("resize", scheduleUpdate);
  }
  document.addEventListener("papilla:languagechange", updateLanguage);
  updateLanguage();
})();
