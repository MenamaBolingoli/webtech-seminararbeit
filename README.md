# Lernkarten-Prototyp

Seminararbeit im Modul Web Technologie (FOM, WS 2026). Ein Lernkarten-Prototyp mit HTML, CSS und Vanilla JavaScript. Die Karten werden aus `cards.json` per `fetch` geladen.

**Live in StackBlitz:** https://stackblitz.com/github/MenamaBolingoli/webtech-seminararbeit

## Stand

Technischer Test (Spike): Die Seite lädt zwei Platzhalterkarten aus `cards.json`. Den Fehlerfall zeigt `?daten=falsch.json` an der URL.

## Lokal starten

`fetch` funktioniert nicht über `file://`. Deshalb einen lokalen Server nutzen, z. B. `npm install` und `npm start` oder in VS Code die Erweiterung „Live Server“.

## Warum `package.json`?

Die Datei startet nur einen statischen Dateiserver (`serve`), damit StackBlitz die Seite ausliefert. Es gibt keinen Build-Prozess.
