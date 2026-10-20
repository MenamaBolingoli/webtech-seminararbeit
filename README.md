# Lernkarten-Prototyp

Seminararbeit im Modul Web Technologie (FOM, WS 2026). Ein Lernkarten-Prototyp mit HTML, CSS und Vanilla JavaScript.

**Live in StackBlitz:** https://stackblitz.com/github/MenamaBolingoli/webtech-seminararbeit

## Stand

Noch kein App-Code. Der technische Test (Spike, Commit `2d0281c`) wurde entfernt; die App wird ab hier Schritt für Schritt per Prompt aufgebaut. Erhalten ist nur die StackBlitz-Infrastruktur (`package.json`, `.stackblitzrc`).

## Lokal starten

`fetch` funktioniert nicht über `file://`. Deshalb einen lokalen Server nutzen, z. B. `npm install` und `npm start` oder in VS Code die Erweiterung „Live Server“.

## Warum `package.json`?

Die Datei startet nur einen statischen Dateiserver (`serve`), damit StackBlitz die Seite ausliefert. Es gibt keinen Build-Prozess.
