// Lädt die Karten aus einer JSON-Datei und prüft grob, ob sie brauchbar sind.
export async function loadCards(url = "cards.json") {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const cards = await response.json();
  if (!Array.isArray(cards) || cards.length === 0) {
    throw new Error("Keine Karten vorhanden.");
  }

  return cards;
}
