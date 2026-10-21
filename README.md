# Lernkarten: DOM und JavaScript im Browser

Eine kleine Lernkarten-Webapp ohne Framework. Karten lassen sich umdrehen, mit „Richtig“ oder „Falsch“ weiterschalten und am Ende auswerten.

## Starten

- **Im Browser:** `https://stackblitz.com/github/MenamaBolingoli/webtech-seminararbeit-kigenerierte-website`
- **Lokal:** Das Projekt über einen Webserver öffnen, nicht per Doppelklick auf `index.html`. Die Karten werden per `fetch` geladen, und das funktioniert über `file://` nicht.

## Aufbau

| Datei | Aufgabe |
|---|---|
| `index.html` | Grundgerüst, lädt `style.css` und `script.js` als ES-Modul |
| `data.js` | Lädt und prüft `cards.json`, wirft verständliche Fehlermeldungen |
| `render.js` | Erzeugt das DOM ausschließlich mit `createElement`, `textContent`, `append` |
| `script.js` | Hält den Zustand (aktuelle Karte, richtige Antworten) und verarbeitet Klicks und Tasten |
| `cards.json` | Die Karten: `id`, `topic`, `question`, `answer`, `image`, `imageAlt`, `source` |
| `img/` | SVG-Schaubilder zu einzelnen Karten |
| `style.css` | Layout, eine Schriftfamilie |

## Bedienung

- Klick oder Leertaste auf die Karte dreht sie um.
- Nach dem Umdrehen erscheinen „Falsch“ und „Richtig“, beide führen zur nächsten Karte. „Richtig“ zählt zusätzlich.
- Nach der letzten Karte zeigt die Auswertung das Ergebnis und einen Button „Nochmal“.

## Inhalte

Die Karten behandeln DOM und JavaScript im Browser. Jede Karte nennt in `source` die Quelle, überwiegend MDN Web Docs.

## Fehlerverhalten

- Fehlt `cards.json` oder ist sie ungültig, erscheint eine Meldung mit „Erneut versuchen“.
- Fehlt ein Bild, erscheint ein Hinweis mit „Bild erneut laden“. Die Karte bleibt bedienbar.
