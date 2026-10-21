# Lernkarten: DOM und JavaScript im Browser

Eine kleine Lernkarten-Webapp ohne Framework und ohne Build-Schritt. Karten lassen sich umdrehen, mit „Richtig“ oder „Falsch“ weiterschalten und am Ende auswerten. Ein zweiter Reiter zeigt alle Karten.

## Starten

- **Im Browser:** `https://stackblitz.com/github/MenamaBolingoli/webtech-seminararbeit-kigenerierte-website`
- **Lokal:** Das Projekt über einen Webserver öffnen, nicht per Doppelklick auf `index.html`. Die Karten werden per `fetch` geladen, und das funktioniert über `file://` nicht.

## Aufbau

| Datei | Aufgabe |
|---|---|
| `index.html` | Grundgerüst mit beiden Reitern, lädt `style.css` und `script.js` als ES-Modul |
| `data.js` | Lädt und prüft `cards.json`, wirft verständliche Fehlermeldungen |
| `render.js` | Erzeugt das DOM ausschließlich mit `createElement`, `textContent`, `append`, `after`, `replaceChildren` |
| `script.js` | Hält den Zustand (Thema, aktuelle Karte, Zähler) und verarbeitet Klicks und Tasten |
| `cards.json` | Die Karten: `id`, `topic`, `question`, `answer`, `image`, `imageAlt`, `source` |
| `img/` | SVG-Schaubilder zu einzelnen Karten |
| `style.css` | Layout, eine Schriftfamilie |

## Bedienung

- **Reiter „Lernen“:** Klick oder Leertaste auf die Karte dreht sie um. Danach erscheinen „Falsch“ und „Richtig“, beide führen zur nächsten Karte. Nur „Richtig“ zählt als richtige Antwort.
- **Themenfilter** rechts: Beschränkt das Lernen auf ein Thema. Der Zähler beginnt dann von vorn.
- **Nach der letzten Karte** zeigt die Auswertung das Ergebnis und einen Button „Nochmal“.
- **Reiter „Karten“:** Listet alle Karten mit Thema, Frage, Antwort und Quelle. Dort lassen sich Karten nicht bearbeiten.

## Inhalte

Die Karten behandeln DOM und JavaScript im Browser. Jede Karte nennt in `source` die Quelle, überwiegend MDN Web Docs.

## Fehlerverhalten

- Fehlt `cards.json` oder ist sie ungültig, erscheint eine Meldung mit „Erneut versuchen“.
- Fehlt eine Grafik, erscheint eine rot umrandete Meldung mit dem Verweis aus `cards.json` und der Beschreibung der Grafik. Die Karte bleibt bedienbar.

### Absichtlicher Fehler zur Demonstration

Karte `dom-04` verweist auf `img/event-phase.svg`. Die Datei heißt `img/event-phasen.svg`. Beim Umdrehen dieser Karte erscheint deshalb die Fehlermeldung „Grafik nicht gefunden“. Zum Beheben den Pfad in `cards.json` auf `img/event-phasen.svg` ändern.
