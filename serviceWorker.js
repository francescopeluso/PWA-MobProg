// Questo è il file contenente il codice del Service Worker
const CACHE_NAME = 'temperature-converter-v1';

// STEP 1: aggiunge un eventListener per l'evento install
self.addEventListener("install", event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      cache.addAll([
        '/',
        '/converter.js',
        '/converter.css'
      ]);
    }
    )() // invoco la funzione data come parametro a waitUntil
  );
});

// STEP 2: per ogni evento fetch accedo alla cache e mi chiedo
// se la risorsa richiesta nell'evento fetch sia immagazzinata nella cache:
// - se sì, la restituisco
// - se non è nella cache, allora provo a richiederla al server
//   e la aggiungo alla cache
self.addEventListener("fetch", event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(event.request);
    
    if (cachedResponse) {
      return cachedResponse;
    } else {
      try {
        console.log(event);
        const fetchResponse = await fetch(event.request);
        cache.put(event.request, fetchResponse.clone());
        return fetchResponse;
      } catch (e) {
        console.log("errore :(");
      }
    }
  })());
});