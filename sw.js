/* ============================================================
   SAAZA Tools — service worker
   ------------------------------------------------------------
   HOW THE UPDATE FLOW WORKS (read this before changing anything):
   1. When you push changes, BUMP `VERSION` below. That changes the
      cache names, so this file is seen as "new" and installs fresh.
   2. On install we precache the app shell, but we DO NOT call
      skipWaiting() — the new worker sits in "waiting" until the user
      taps "Update Now" in the page banner.
   3. The page posts {type:'SKIP_WAITING'}; we call skipWaiting(),
      activate, clean old caches, claim clients; the page hears
      'controllerchange' and reloads. That's the controlled update.
   4. The page can ask {type:'GET_VERSION'} to show the version.

   CACHING:
   - Precache (app shell) = the HTML tools + manifest + icons. Added
     individually so one renamed/missing file can't abort the install.
   - Runtime cache = everything else same-origin (the reference PDFs in
     refs/ and the slide decks in slides/) is cached the first time it's
     opened, so it's available offline afterward without a huge upfront
     download.
   - Cross-origin requests (e.g. cdnjs QR library, NOAA) are left to the
     network and never cached.
   ============================================================ */

var VERSION  = '2026.06.21';                 // <-- bump on every release
var PRECACHE = 'saaza-shell-' + VERSION;
var RUNTIME  = 'saaza-runtime-' + VERSION;

/* App shell — keep these names EXACTLY matching the repo (case-sensitive). */
var SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './SAAZA_Survey_Field_Guide.html',
  './SAAZA_Team_Lead_Checklist.html',
  './SAAZA_Equipment_Checklist.html',
  './SAAZA_Field_Reference_Card.html',
  './SAAZA_LZ_Trig_Calculator.html',
  './SAAZA_SPACI_Calculator.html',
  './SAAZA_DZ_Calculator.html',
  './SAAZA_DCP_Calculator.html',
  './SAAZA_DCP_Layout.html',
  './SAAZA_Coordinate_Converter.html',
  './SAAZA_Gradient_Calculator.html',
  './SAAZA_Reference_Search.html',
  './SAAZA_Quick_Reference_Search.html',
  './SAAZA_Glossary.html',
  './SAAZA_Mega_Deck.html',
  './SAAZA_Overview_Flashcards.html',
  './SAAZA_DZ_Flashcards.html',
  './SAAZA_HLZ_Flashcards.html',
  './SAAZA_ALZ_Flashcards.html',
  './SAAZA_Flashcards.html',
  './SAAZA_Forms_Flashcards.html',
  './SAAZA_Process_Flashcards.html',
  './SAAZA_Completion_Flashcards.html'
];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(PRECACHE).then(function(cache){
      // add each item on its own so a single 404/typo can't reject the whole install
      return Promise.all(SHELL.map(function(url){
        return cache.add(url).catch(function(err){ console.warn('[sw] precache miss:', url, err); });
      }));
    })
    // NOTE: intentionally NO self.skipWaiting() here — wait for the user's go-ahead.
  );
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){
        if(k !== PRECACHE && k !== RUNTIME) return caches.delete(k); // drop old versions
      }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('message', function(e){
  if(!e.data) return;
  if(e.data.type === 'SKIP_WAITING') self.skipWaiting();
  if(e.data.type === 'GET_VERSION' && e.ports && e.ports[0]) e.ports[0].postMessage({ version: VERSION });
});

self.addEventListener('fetch', function(e){
  var req = e.request;
  if(req.method !== 'GET') return;
  var url = new URL(req.url);
  if(url.origin !== self.location.origin) return; // leave cross-origin to the network

  e.respondWith(
    caches.match(req).then(function(cached){
      if(cached) return cached;                    // cache-first
      return fetch(req).then(function(resp){
        // stash a copy of good same-origin responses (covers refs/ PDFs, slides/, etc.)
        if(resp && resp.status === 200 && (resp.type === 'basic' || resp.type === 'default')){
          var copy = resp.clone();
          caches.open(RUNTIME).then(function(c){ c.put(req, copy); });
        }
        return resp;
      }).catch(function(){
        // offline and not cached — for a page navigation, fall back to the dashboard
        if(req.mode === 'navigate') return caches.match('./index.html');
        return cached;
      });
    })
  );
});
