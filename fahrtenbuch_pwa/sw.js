const CACHE_NAME = "fahrtenbuch-cache-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isHtml =
    event.request.mode === "navigate" ||
    (event.request.headers.get("accept") || "").includes("text/html");

  if (isSameOrigin && isHtml) {
    // Netzwerk-first fuer HTML: Updates kommen sofort an. Nur wenn gar
    // keine Verbindung besteht, wird die zuletzt gespeicherte Version genutzt.
    event.respondWith(
      fetch(event.request)
        .then((resp) => {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return resp;
        })
        .catch(() => caches.match(event.request))
    );
  } else if (isSameOrigin) {
    // Cache-first fuer statische Dateien (Icons, Manifest) -- die aendern sich selten
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
  } else {
    // Netzwerk-first fuer externe Dienste (Geocoding, Routing, SheetJS-CDN)
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  }
});
