// Kleiner Server für die Vorschau in StackBlitz. Liefert nur die Dateien dieses Ordners aus.
// Er hat keine Abhängigkeiten und führt keinen Build aus.
const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const ROOT = __dirname;
const PORT = process.env.PORT || 3000;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
};

http
  .createServer(async (req, res) => {
    const requestPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    const filePath = path.join(ROOT, requestPath === "/" ? "index.html" : requestPath);

    if (!filePath.startsWith(ROOT)) {
      res.writeHead(403).end("Verboten");
      return;
    }

    try {
      const data = await fs.readFile(filePath);
      res.writeHead(200, { "Content-Type": TYPES[path.extname(filePath)] ?? "application/octet-stream" });
      res.end(data);
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Nicht gefunden");
    }
  })
  .listen(PORT, () => {
    console.log(`Lernkarten läuft auf Port ${PORT}`);
  });
