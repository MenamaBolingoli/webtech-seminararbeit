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

// Prüft nach einem fehlgeschlagenen Bildladen, woran es liegt, und liefert eine Ursache als Text.
export async function checkImage(url) {
  try {
    const response = await fetch(url, { method: "HEAD", cache: "no-store" });
    if (response.status === 404) {
      return "Die Datei liegt nicht unter diesem Pfad (HTTP 404).";
    }
    if (!response.ok) {
      return `Der Server hat mit HTTP ${response.status} geantwortet.`;
    }
    return "Die Datei ist vorhanden, konnte aber nicht angezeigt werden.";
  } catch {
    return "Die Datei konnte nicht abgerufen werden (Netzwerkfehler).";
  }
}
