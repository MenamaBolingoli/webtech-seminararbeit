// Spike: prüft nur, ob fetch auf eine lokale JSON-Datei in StackBlitz funktioniert.
// Wird im nächsten Schritt durch das eigentliche Grundgerüst ersetzt.

const app = document.querySelector('#app');

async function ladeKarten(pfad) {
  const response = await fetch(pfad);
  // fetch lehnt bei HTTP-Fehlern wie 404 NICHT ab, deshalb selbst prüfen (E-01)
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} beim Laden von ${pfad}`);
  }
  return response.json();
}

function zeigeFehler(meldung) {
  const box = document.createElement('p');
  box.className = 'fehler';
  box.textContent = meldung;
  app.replaceChildren(box);
}

function zeigeKarten(karten) {
  const knoten = karten.map((karte) => {
    const artikel = document.createElement('article');
    artikel.className = 'karte';

    const frage = document.createElement('h2');
    frage.textContent = karte.question;
    artikel.append(frage);

    if (karte.image) {
      const bild = document.createElement('img');
      bild.src = karte.image;
      bild.alt = karte.imageAlt ?? '';
      artikel.append(bild);
    }
    return artikel;
  });
  app.replaceChildren(...knoten);
}

// Pfad per URL-Parameter änderbar, um den Fehlerfall zu testen: ?daten=falsch.json
const pfad = new URLSearchParams(location.search).get('daten') ?? 'cards.json';

ladeKarten(pfad)
  .then(zeigeKarten)
  .catch((fehler) => {
    console.error(fehler);
    zeigeFehler('Karten konnten nicht geladen werden.');
  });
