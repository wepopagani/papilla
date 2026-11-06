const assets = {
  fuego: "assets/fuego.webp",
  tropico: "assets/tropico.webp",
  noche: "assets/noche.webp",
  fajitas: "assets/fajitas.webp",
  tacos: "assets/tacos.webp",
  drinks: "assets/drinks.webp",
  brindisi: "assets/brindisi.webp",
  band: "assets/band.webp",
  tavola: "assets/tavola.webp"
};

const concepts = {
  tropico: {
    number: "01", name: "TRÓPICO",
    kicker: "OSTERIA LATINA · TESSERETE", title: "Ritmo", accent: "tropicale.",
    intro: "Cocktail tropicali, verde neon e una tavola che mette insieme Brasile, Argentina, Perù e Messico.",
    action: "Esplora il bancone", caption: "FIG. 01 / DAL BANCONE",
    alt: "Cocktail al lime tra foglie e piastrelle verdi, immagine dimostrativa",
    ticker: ["SAPORI LATINI", "COCKTAIL TROPICALI", "TESSERETE", "BRASIL · ARGENTINA · PERÚ · MÉXICO"],
    experience: ["Al bancone", "Un altro", "giro", "Dal primo cocktail al brindisi. Tocca i tre momenti e passa dalle immagini del profilo alla scena illustrata."],
    steps: [
      {label:"Il cocktail", title:"Giallo tropicale", text:"I cocktail gialli serviti al bancone di Papilla.", image:"drinks", alt:"Cocktail gialli in coppe sul bancone di Papilla"},
      {label:"Il lime", title:"Un tocco di verde", text:"Lime, ghiaccio tritato e una luce verde che richiama l’insegna del locale.", image:"tropico", alt:"Caipirinha al lime, illustrazione fotografica"},
      {label:"Il brindisi", title:"Salud!", text:"Due bicchieri che si incontrano sopra i tessuti a righe del locale.", image:"brindisi", alt:"Due cocktail si incontrano sopra una tovaglia a righe da Papilla"}
    ]
  },
  fuego: {
    number: "02", name: "FUEGO",
    kicker: "OSTERIA LATINA · TESSERETE", title: "Sapore", accent: "di fuoco.",
    intro: "Brace, spezie e piatti da mettere al centro. Il calore di una tavola latina in Capriasca.",
    action: "Senti il calore", caption: "FIG. 02 / DALLA BRACE",
    alt: "Tagliata alla brace con chimichurri, immagine dimostrativa",
    ticker: ["BRACE", "SPEZIE", "PIATTI DA CONDIVIDERE", "PAPILLA TESSERETE"],
    experience: ["Dalla cucina", "Alza la", "temperatura", "Scorri dal fuoco alla tavola. Ogni passaggio cambia il piatto, la luce e le scintille."],
    steps: [
      {label:"Brace", title:"La prima scintilla", text:"Fumo, sale grosso e chimichurri per la scena d’apertura.", image:"fuego", alt:"Tagliata alla brace con chimichurri, illustrazione fotografica"},
      {label:"Padella", title:"Arriva la padella", text:"Carne e peperoni serviti in padella, da uno scatto del profilo di Papilla.", image:"fajitas", alt:"Padella di carne e peperoni di Papilla"},
      {label:"A tavola", title:"L’ultimo morso", text:"Una tortilla morbida, il ripieno colorato e tutto il calore della padella.", image:"tacos", alt:"Tortilla con verdure e ripieno di Papilla"}
    ]
  },
  noche: {
    number: "03", name: "NOCHE LATINA",
    kicker: "OSTERIA LATINA · TESSERETE", title: "La notte", accent: "è latina.",
    intro: "Un cocktail per iniziare, una tavola da condividere. E quando parte la musica, la serata cambia ritmo.",
    action: "Entra nella serata", caption: "FIG. 03 / DOPO IL TRAMONTO",
    alt: "Mani che brindano su una tavola con candele, immagine dimostrativa",
    ticker: ["APERITIVO", "TAVOLATE", "MUSICA DAL VIVO", "PAPILLA TESSERETE"],
    experience: ["La serata", "Quando ci", "vediamo?", "Passa dall’aperitivo alla cena, fino alla musica. Ogni scena riprende un momento fotografato da Papilla."],
    steps: [
      {label:"Aperitivo", title:"Cominciamo con un brindisi", text:"Bicchieri pieni e tovaglie colorate. Il primo giro è il punto di partenza.", image:"brindisi", alt:"Brindisi con cocktail da Papilla"},
      {label:"Cena", title:"Ci mettiamo a tavola", text:"Una tavolata, le luci calde e i piatti che passano di mano in mano.", image:"tavola", alt:"Una tavolata apparecchiata da Papilla"},
      {label:"Live", title:"La serata cambia ritmo", text:"Uno scatto d’archivio dal profilo Papilla racconta la musica dal vivo.", image:"band", alt:"Musicisti con chitarre e batteria fra le piante di Papilla"}
    ]
  }
};

const get = (selector) => document.querySelector(selector);
const stage = get("#stage");
const heroImage = get(".hero-img");
const scene = get("#scene");
const sceneImage = get("#scene-image");
const conceptButtons = [...document.querySelectorAll("[data-pick]")];
const stepButtons = [...document.querySelectorAll("[data-step]")];
const reviewButtons = [...document.querySelectorAll("[data-review]")];
const reviewCards = [...document.querySelectorAll(".review")];
const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
let current = "tropico";

const setText = (selector, text) => { get(selector).textContent = text; };

function setStep(index) {
  const step = concepts[current].steps[index];
  const illustrated = step.image === "tropico" || step.image === "fuego";
  scene.dataset.level = index;
  sceneImage.src = assets[step.image];
  sceneImage.alt = step.alt;
  setText("#step-title", step.title);
  setText("#step-description", step.text);
  setText("#scene-caption", step.label);
  get("#scene-index").hidden = !illustrated;
  get("#scene-source").hidden = illustrated;
  stepButtons.forEach((button, position) => {
    button.setAttribute("aria-pressed", String(position === index));
  });
}

function chooseConcept(key, animate = true) {
  current = key;
  const concept = concepts[key];
  const [label, lineOne, lineTwo, description] = concept.experience;
  document.body.dataset.concept = key;
  heroImage.src = assets[key];
  heroImage.alt = concept.alt;
  setText("#count", concept.number + " / 03");
  setText(".hero-kicker span", concept.kicker);
  setText("#hero-title span", concept.title);
  setText("#hero-title em", concept.accent);
  setText(".hero-description", concept.intro);
  setText(".hero-button span", concept.action);
  setText(".media-caption", concept.caption);
  setText("#hero-note", concept.number + " — " + concept.name);
  const ticker = (concept.ticker.join("   ✦   ") + "   ✦   ").repeat(3);
  setText("#ticker-a", ticker);
  setText("#ticker-b", ticker);
  setText("#experience-kicker", concept.number + " / INTERAZIONE · " + label);
  get("#experience-title").replaceChildren(
    lineOne, document.createElement("br"), lineTwo.replace(/\?$/, ""),
    Object.assign(document.createElement("span"), {textContent: lineTwo.endsWith("?") ? "?" : "."})
  );
  setText("#experience-intro", description);
  conceptButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.pick === key));
  });
  stepButtons.forEach((button, index) => {
    button.textContent = concept.steps[index].label;
  });
  setStep(0);
  if (animate && !motion.matches) {
    stage.classList.remove("change");
    void stage.offsetWidth;
    stage.classList.add("change");
  }
}

function filterReviews(category) {
  reviewButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.review === category));
  });
  let count = 0;
  reviewCards.forEach((card) => {
    const visible = category === "all" || card.dataset.tags.split(" ").includes(category);
    card.hidden = !visible;
    if (visible) count += 1;
  });
  setText("#review-status", count + (count === 1 ? " estratto" : " estratti"));
}

conceptButtons.forEach((button) => button.addEventListener("click", () => {
  if (button.dataset.pick === current) return;
  chooseConcept(button.dataset.pick);
  if (stage.getBoundingClientRect().bottom < 140) {
    window.scrollTo({top: 0, behavior: motion.matches ? "instant" : "smooth"});
  }
}));
stepButtons.forEach((button) => button.addEventListener("click", () => setStep(Number(button.dataset.step))));
reviewButtons.forEach((button) => button.addEventListener("click", () => filterReviews(button.dataset.review)));

const embers = get(".embers");
for (let index = 0; index < 15; index += 1) {
  const particle = document.createElement("i");
  particle.style.setProperty("--x", (25 + (index * 17) % 73) + "%");
  particle.style.setProperty("--y", (20 + (index * 13) % 70) + "%");
  particle.style.setProperty("--size", (2 + index % 3) + "px");
  particle.style.setProperty("--dur", (3 + index % 5 / 2) + "s");
  particle.style.setProperty("--delay", (-index * .32) + "s");
  embers.append(particle);
}
stage.addEventListener("pointermove", (event) => {
  if (motion.matches || event.pointerType !== "mouse") return;
  const box = stage.getBoundingClientRect();
  stage.style.setProperty("--mx", ((event.clientX - box.left) / box.width - .5) * 17 + "px");
  stage.style.setProperty("--my", ((event.clientY - box.top) / box.height - .5) * 16 + "px");
});
stage.addEventListener("pointerleave", () => {
  stage.style.removeProperty("--mx");
  stage.style.removeProperty("--my");
});

chooseConcept(current, false);

if ("IntersectionObserver" in window && !motion.matches) {
  const reveals = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("arrive");
      reveals.unobserve(entry.target);
    });
  }, {threshold: .16});
  document.querySelectorAll(".experience-copy, .scene, .reviews-head, .review-grid, .footer-main")
    .forEach((element) => reveals.observe(element));
}
