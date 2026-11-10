# Papilla Tesserete

Sito statico dedicato a Osteria Papilla, con apertura animata della giungla e pappagallo che atterra sulla scritta Papilla, nuovo marchio, composizione Pisco Sour Maracuyá e Ceviche Mixto, menu food e beverage e recensioni.

## Pubblicazione

Netlify pubblica la cartella `public`, indicata in `netlify.toml`. Il comando di build resta vuoto. Per una prova locale eseguire `python3 -m http.server 8765 --directory public`.

## Contenuti

Le 53 voci food e 174 voci beverage sono trascritte dalle carte condivise il 9 novembre 2026. I diversi formati di una bevanda sono voci separate. Le salse mantengono il prezzo non indicato nella fonte. I dati sono in `public/menu-food.js` e `public/menu-drinks.js`.

Pisco Sour, ceviche e fondale botanico sono composizioni illustrative generate. Il loop botanico di 5 secondi è stato generato con Higgsfield Seedance 2.5 e ottimizzato per la pagina (720p, senza audio, circa 542 KB). La foto del locale è tratta dal profilo Papilla e fornita come riferimento. Le recensioni includono i collegamenti alle fonti. Font distribuiti con le rispettive licenze SIL Open Font License nella cartella assets.

L’intro può essere saltata e ripetuta. Le animazioni rispettano la preferenza di movimento ridotto e si possono mettere in pausa dal footer.


## Lingue e Instagram

Il selettore in alto a destra offre italiano, spagnolo, francese, tedesco e inglese e conserva la scelta sul browser. Le traduzioni dei menu sono in `menu-food-i18n.js` e `menu-drinks-i18n.js`, mentre `locale.js` gestisce testi e controlli.

Il carosello in fondo alla pagina, dopo le recensioni, mostra una selezione manuale di sei post reali di @papilla_official. Le immagini sono ottimizzate localmente e ogni scheda apre il relativo post originale. Frecce, swipe e tastiera permettono di scorrere la selezione.


## Fiore e consegna a domicilio

Il fiore decorativo rosso è una composizione fotografica generata dal riferimento del murale del locale. Il file WebP conserva la trasparenza. Sotto il menu è presente il collegamento diretto a Papilla su Divoora (`https://divoora.ch/it/restaurant/papilla-tesserete`), verificato nel catalogo pubblico ufficiale con telefono e indirizzo del locale. Il logo Divoora proviene da `https://divoora.ch/assets/logo-divoora.png`.

Il nuovo profilo Instagram è `https://www.instagram.com/papilla_official/`. Logo completo fornito dal titolare; tipografia display Patua One con licenza SIL OFL. Il pappagallo illustrato ha tre pose trasparenti per volo, battito di ali e atterraggio; l’animazione usa CSS/JavaScript, si può saltare e rispetta la preferenza di movimento ridotto. La favicon riprende il nuovo pappagallo.


## Orari e contatti

Orari tratti dal post ufficiale `https://www.instagram.com/papilla_official/p/DWMnZvOjRpa/`: lunedì 08:00–19:00; martedì–giovedì 08:00–23:00; venerdì 08:00–01:00; sabato 09:00–00:00; domenica e festivi chiuso. Le variazioni per eventi sono indicate nel blocco orari.

Sotto il menu: “Mangià quà!” chiama `+41799220625`; “Take away” apre WhatsApp con testo nella lingua selezionata; Divoora apre la scheda diretta. Il numero è confermato dalle locandine ufficiali afterwork ed eventi, oltre che da Divoora. Bandiere dei quattro paesi in SVG locali da FlagCDN.
