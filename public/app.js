const food = window.PAPILLA_FOOD || [];
const drinks = window.PAPILLA_DRINKS || [];
const allItems = [...food, ...drinks];
const get = (selector) => document.querySelector(selector);
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const state = { mode: "food", category: "peru", query: "", motionPaused: motionPreference.matches };

const foodCategories = [
  ["all", "Tutta la cucina", []],
  ["peru", "Perù", ["peru-antipasti", "peru-caldi"]],
  ["messico", "Messico", ["messico-antipasti", "messico-caldi"]],
  ["argentina", "Argentina", ["argentina"]],
  ["brasile", "Brasile", ["brasile"]],
  ["vegano", "Vegano", ["vegano"]],
  ["bambini", "Per i piccoli", ["bambini"]],
  ["contorni", "Contorni", ["contorni"]],
  ["salse", "Salse", ["salse"]],
  ["dessert", "Dessert", ["dessert"]]
];
const drinkCategories = [
  ["all", "Tutto il beverage", []],
  ["cocktail-latini", "Cocktail latini", ["cocktail-latini"]],
  ["mojito", "Mojitos", ["mojito"]],
  ["sour", "Sour", ["sour"]],
  ["martini", "Martini’s", ["martini"]],
  ["colada", "Coladas", ["colada"]],
  ["cocktail-classici", "Cocktail & drinks", ["cocktail-classici"]],
  ["after-dinner", "After dinner", ["after-dinner"]],
  ["analcolici", "Cocktail analcolici", ["analcolici"]],
  ["aperitivi", "Aperitivi", ["aperitivi"]],
  ["birre", "Birre", ["birre"]],
  ["bollicine", "Vini e bollicine", ["bollicine", "vini"]],
  ["gin", "Gin", ["gin"]],
  ["whisky", "Whisky", ["whisky"]],
  ["rum", "Rum", ["rum"]],
  ["vodka", "Vodka", ["vodka"]],
  ["tequila", "Tequila", ["tequila"]],
  ["shot", "Shot", ["shot"]],
  ["cognac", "Cognac e brandy", ["cognac"]],
  ["amari", "Amari e liquori", ["amari"]],
  ["bibite", "Bibite", ["bibite"]],
  ["caffetteria", "Caffetteria", ["caffetteria"]]
];
const groupNames = {
  "peru-antipasti": "Perù · Antipasti",
  "peru-caldi": "Perù · Piatti caldi",
  "messico-antipasti": "Messico · Antipasti",
  "messico-caldi": "Messico · Piatti caldi",
  argentina: "Argentina",
  brasile: "Brasile",
  vegano: "Vegano",
  bambini: "Menu bambini",
  contorni: "Contorni extra",
  salse: "Salse",
  dessert: "Dessert",
  "cocktail-latini": "Cocktail latini",
  mojito: "Mojitos",
  sour: "Sour",
  martini: "Martini’s",
  colada: "Coladas",
  "after-dinner": "After dinner",
  analcolici: "Cocktail analcolici",
  birre: "Birre",
  "cocktail-classici": "Cocktail & drinks",
  aperitivi: "Aperitivi",
  gin: "Gin",
  whisky: "Whisky",
  rum: "Rum",
  vodka: "Vodka",
  tequila: "Tequila",
  shot: "Shot",
  cognac: "Cognac e brandy",
  amari: "Amari e liquori",
  bibite: "Bibite e sfuse",
  caffetteria: "Caffetteria",
  bollicine: "Bollicine",
  vini: "Vini"
};
const formatPrice = (value) => value == null
  ? "Chiedi al personale"
  : new Intl.NumberFormat("it-CH", { maximumFractionDigits: 2 }).format(value) + " CHF";
const normalize = (value) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const currentItems = () => state.mode === "food" ? food : drinks;
const currentCategories = () => state.mode === "food" ? foodCategories : drinkCategories;

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function renderCategories() {
  const buttons = get("#category-buttons");
  const restoreCategoryFocus = buttons.contains(document.activeElement);
  const select = get("#mobile-category");
  buttons.replaceChildren();
  select.replaceChildren();
  currentCategories().forEach(([key, label, groups]) => {
    const count = currentItems().filter((item) => key === "all" || groups.includes(item.category)).length;
    if (!count) return;
    const button = element("button", "", label);
    button.type = "button";
    button.dataset.category = key;
    button.setAttribute("aria-pressed", String(state.category === key));
    button.append(element("small", "", String(count)));
    button.addEventListener("click", () => {
      chooseCategory(key);
      get(".menu-toolbar").scrollIntoView({ behavior: state.motionPaused ? "instant" : "smooth" });
    });
    buttons.append(button);
    const option = element("option", "", label + " (" + count + ")");
    option.value = key;
    option.selected = key === state.category;
    select.append(option);
  });
  if (restoreCategoryFocus) {
    buttons.querySelector('[data-category="' + state.category + '"]').focus({ preventScroll: true });
  }
}

function renderMenu() {
  const selected = currentCategories().find(([key]) => key === state.category);
  const query = normalize(state.query.trim());
  const matches = currentItems().filter((item) => {
    const belongs = state.category === "all" || selected[2].includes(item.category);
    const text = [item.name, item.description, item.country, item.unit, groupNames[item.category]].join(" ");
    return belongs && normalize(text).includes(query);
  });
  const groups = new Map();
  matches.forEach((item) => {
    if (!groups.has(item.category)) groups.set(item.category, []);
    groups.get(item.category).push(item);
  });
  const results = get("#menu-items");
  results.replaceChildren();
  groups.forEach((items, category) => {
    const group = element("details", "menu-group");
    group.open = state.category !== "all" || Boolean(query);
    group.append(element("summary", "", groupNames[category] || category));
    const list = element("div", "dish-list");
    items.forEach((item) => {
      const article = element("article", "menu-item");
      const top = element("div", "menu-item-top");
      top.append(element("h3", "", item.name));
      const price = element("span", "menu-price", formatPrice(item.price));
      if (item.price == null) price.classList.add("unlisted");
      top.append(price);
      article.append(top);
      if (item.description) article.append(element("p", "", item.description));
      if (item.unit) article.append(element("span", "menu-unit", item.unit));
      list.append(article);
    });
    group.append(list);
    results.append(group);
  });
  get("#menu-empty").hidden = matches.length !== 0;
  get("#result-count").textContent = matches.length + (matches.length === 1 ? " proposta" : " proposte");
  get("#menu-location").textContent = selected[1].toUpperCase();
  renderCategories();
}

function chooseCategory(category) {
  state.category = category;
  state.query = "";
  get("#menu-search").value = "";
  renderMenu();
}

function chooseMode(mode) {
  state.mode = mode;
  state.category = mode === "food" ? "peru" : "cocktail-latini";
  state.query = "";
  get("#menu-search").value = "";
  get("#menu-search").placeholder = mode === "food"
    ? "Cerca un piatto o un ingrediente…"
    : "Cerca un cocktail, un vino, un caffè…";
  get("#search-label").textContent = mode === "food" ? "Cerca nella carta food" : "Cerca nella carta beverage";
  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.mode === mode));
  });
  renderMenu();
}

document.querySelectorAll("[data-mode]").forEach((button) => {
  button.addEventListener("click", () => chooseMode(button.dataset.mode));
});
get("#mobile-category").addEventListener("change", (event) => {
  chooseCategory(event.target.value);
  get(".menu-toolbar").scrollIntoView({ behavior: state.motionPaused ? "instant" : "smooth" });
});
get("#menu-search").addEventListener("input", (event) => {
  state.query = event.target.value;
  state.category = "all";
  renderMenu();
});
get("#reset-search").addEventListener("click", () => {
  chooseCategory("all");
  get("#menu-search").focus();
});
document.querySelectorAll("[data-country]").forEach((button) => {
  button.addEventListener("click", () => {
    chooseMode("food");
    chooseCategory(button.dataset.country);
    get("#menu").scrollIntoView({ behavior: state.motionPaused ? "instant" : "smooth" });
  });
});

const itemDialog = get("#item-dialog");
document.querySelectorAll("[data-item]").forEach((button) => {
  button.addEventListener("click", () => {
    const item = allItems.find((entry) => entry.id === button.dataset.item);
    if (!item) return;
    get("#detail-category").textContent = groupNames[item.category];
    get("#detail-name").textContent = item.name;
    get("#detail-description").textContent = item.description || "Dalla carta beverage di Papilla.";
    get("#detail-unit").textContent = item.unit || item.country.replace("Peru", "Perù");
    get("#detail-price").textContent = formatPrice(item.price);
    itemDialog.showModal();
  });
});
get("#credits-open").addEventListener("click", () => get("#credits-dialog").showModal());
document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right
      || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
});

const navigationToggle = get("#nav-toggle");
const mobileNavigation = get("#mobile-nav");
function closeNavigation() {
  mobileNavigation.hidden = true;
  navigationToggle.setAttribute("aria-expanded", "false");
  navigationToggle.setAttribute("aria-label", "Apri il menu di navigazione");
}
navigationToggle.addEventListener("click", () => {
  const expanded = navigationToggle.getAttribute("aria-expanded") !== "true";
  mobileNavigation.hidden = !expanded;
  navigationToggle.setAttribute("aria-expanded", String(expanded));
  navigationToggle.setAttribute("aria-label", expanded ? "Chiudi il menu di navigazione" : "Apri il menu di navigazione");
});
mobileNavigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNavigation));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !mobileNavigation.hidden) {
    closeNavigation();
    navigationToggle.focus();
  }
});

document.querySelectorAll("[data-review]").forEach((button) => {
  button.addEventListener("click", () => {
    let count = 0;
    document.querySelectorAll("[data-review]").forEach((entry) => {
      entry.setAttribute("aria-pressed", String(entry === button));
    });
    document.querySelectorAll(".review-card").forEach((card) => {
      card.hidden = button.dataset.review !== "all" && card.dataset.tags !== button.dataset.review;
      if (!card.hidden) count += 1;
    });
    get("#review-status").textContent = count + (count === 1 ? " estratto da una recensione pubblica." : " estratti da recensioni pubbliche.");
  });
});

const motionToggle = get("#motion-toggle");
function setPaused(paused) {
  state.motionPaused = paused;
  document.body.classList.toggle("motion-paused", paused);
  motionToggle.setAttribute("aria-pressed", String(paused));
  motionToggle.textContent = paused ? "Riprendi animazioni" : "Pausa animazioni";
}
motionToggle.addEventListener("click", () => setPaused(!state.motionPaused));
motionPreference.addEventListener("change", (event) => setPaused(event.matches));
setPaused(state.motionPaused);

const stillLife = get("#hero-still");
stillLife.addEventListener("pointermove", (event) => {
  if (state.motionPaused || event.pointerType !== "mouse") return;
  const bounds = stillLife.getBoundingClientRect();
  const horizontal = ((event.clientX - bounds.left) / bounds.width - .5) * 14;
  const vertical = ((event.clientY - bounds.top) / bounds.height - .5) * 10;
  get(".pisco").style.translate = horizontal + "px " + vertical + "px";
  get(".ceviche").style.translate = -horizontal + "px " + -vertical + "px";
});
stillLife.addEventListener("pointerleave", () => {
  get(".pisco").style.translate = "0 0";
  get(".ceviche").style.translate = "0 0";
});

renderMenu();
if ("IntersectionObserver" in window && !state.motionPaused) {
  const reveals = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("arrive");
      reveals.unobserve(entry.target);
    });
  }, { threshold: .12 });
  document.querySelectorAll(".journey h2, .country-list, .menu-heading, .atmosphere-photo, .atmosphere-copy, .review-heading")
    .forEach((node) => reveals.observe(node));
}

// Run the entrance only after the rest of the page has initialized.
const entrance = get("#jungle-intro");
const site = get("#site");
let entranceTimer;
let finishTimer;
let returnFocus;
function finishEntrance() {
  window.clearTimeout(entranceTimer);
  window.clearTimeout(finishTimer);
  const focusInside = entrance.contains(document.activeElement);
  entrance.hidden = true;
  entrance.classList.remove("opening");
  site.inert = false;
  document.body.classList.remove("intro-active");
  if (focusInside && returnFocus) returnFocus.focus({ preventScroll: true });
}
function openCurtain(immediate = false) {
  window.clearTimeout(entranceTimer);
  if (entrance.hidden) return;
  if (immediate || state.motionPaused) {
    finishEntrance();
    return;
  }
  if (entrance.classList.contains("opening")) return;
  entrance.classList.add("opening");
  finishTimer = window.setTimeout(finishEntrance, 1550);
}
function playEntrance() {
  if (!entrance.hidden) return;
  returnFocus = document.activeElement;
  if (!returnFocus || returnFocus === document.body) returnFocus = get("#contenuto");
  entrance.hidden = false;
  document.body.classList.add("intro-active");
  site.inert = true;
  get("#intro-skip").focus({ preventScroll: true });
  if (state.motionPaused) {
    entranceTimer = window.setTimeout(() => openCurtain(true), 400);
  } else {
    entranceTimer = window.setTimeout(() => openCurtain(), 1600);
  }
}
get("#intro-skip").addEventListener("click", () => openCurtain(true));
get("#replay-intro").addEventListener("click", playEntrance);
entrance.addEventListener("keydown", (event) => {
  if (event.key === "Escape") openCurtain(true);
  if (event.key === "Tab") {
    event.preventDefault();
    get("#intro-skip").focus();
  }
});
if (!state.motionPaused && !window.location.hash) playEntrance();
