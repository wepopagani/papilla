# Papilla Tesserete

Sito statico dedicato a Osteria Papilla, con apertura animata della giungla, insegna verde, composizione Pisco Sour Maracuyá e Ceviche Mixto, menu food e beverage e recensioni.

## Pubblicazione

Netlify pubblica la cartella `public`, indicata in `netlify.toml`. Il comando di build resta vuoto. Per una prova locale eseguire `python3 -m http.server 8765 --directory public`.

## Contenuti

Le 53 voci food e 174 voci beverage sono trascritte dalle carte condivise il 9 novembre 2026. I diversi formati di una bevanda sono voci separate. Le salse mantengono il prezzo non indicato nella fonte. I dati sono in `public/menu-food.js` e `public/menu-drinks.js`.

Pisco Sour, ceviche e fondale botanico sono composizioni illustrative generate. Il loop botanico di 5 secondi è stato generato con Higgsfield Seedance 2.5 e ottimizzato per la pagina (720p, senza audio, circa 542 KB). La foto del locale è tratta dal profilo Papilla e fornita come riferimento. Le recensioni includono i collegamenti alle fonti. Font distribuiti con le rispettive licenze SIL Open Font License nella cartella assets.

L’intro può essere saltata e ripetuta. Le animazioni rispettano la preferenza di movimento ridotto e si possono mettere in pausa dal footer.
