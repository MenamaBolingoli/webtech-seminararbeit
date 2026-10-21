// Lädt die Karten aus einer JSON-Datei. Fehler werden als verständliche Meldungen geworfen.
export async function loadCards(url = "cards.json") {
  let response;
  try {
    response = await fetch(url);
  } catch {
    throw new Error(
      "Die Kartendatei konnte nicht geladen werden. Öffne die App über StackBlitz oder einen Webserver, nicht per Doppelklick auf index.html."
    );
  }

  if (response.status === 404) {
    throw new Error("Die Kartendatei cards.json wurde nicht gefunden.");
  }
  if (!response.ok) {
    throw new Error(`Die Kartendatei konnte nicht geladen werden (HTTP ${response.status}).`);
  }

  let cards;
  try {
    cards = await response.json();
  } catch {
    throw new Error("Die Kartendatei cards.json ist kein gültiges JSON.");
  }

  if (!Array.isArray(cards) || cards.length === 0) {
    throw new Error("Die Kartendatei enthält keine Karten.");
  }

  cards.forEach((card, position) => {
    if (typeof card?.question !== "string" || typeof card?.answer !== "string") {
      throw new Error(`Karte ${position + 1} in cards.json hat keine Frage oder keine Antwort.`);
    }
  });

  return cards;
}
