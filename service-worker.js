// ======================================
// service-worker.js
// Crazy Fishing Simulator v1.0
// ======================================

const CACHE_NAME = "crazy-fishing-v1";

const FILES_TO_CACHE = [

    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./game.js",
    "./fish.js",
    "./player.js",
    "./storage.js",
    "./ui.js",
    "./manifest.json",

    "./assets/icons/icon-72.png",
    "./assets/icons/icon-96.png",
    "./assets/icons/icon-128.png",
    "./assets/icons/icon-144.png",
    "./assets/icons/icon-152.png",
    "./assets/icons/icon-192.png",
    "./assets/icons/icon-384.png",
    "./assets/icons/icon-512.png",

    "./assets/images/screenshot1.png",
    "./assets/images/screenshot2.png",

    "./assets/sounds/cast.mp3",
    "./assets/sounds/hook.mp3",
    "./assets/sounds/catch.mp3",
    "./assets/sounds/button.mp3",
    "./assets/sounds/bgm.mp3"

];

// ==========================
// Install
// ==========================

self.addEventListener("install",(event)=>{

    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(cache=>{

            return cache.addAll(FILES_TO_CACHE);

        })

    );

    self.skipWaiting();

});

// ==========================
// Activate
// ==========================

self.addEventListener("activate",(event)=>{

    event.waitUntil(

        caches.keys()

        .then(keys=>{

            return Promise.all(

                keys.map(key=>{

                    if(key!==CACHE_NAME){

                        return caches.delete(key);

                    }

                })

            );

        })

    );

    self.clients.claim();

});

// ==========================
// Fetch
// ==========================

self.addEventListener("fetch",(event)=>{

    if(event.request.method!=="GET") return;

    event.respondWith(

        caches.match(event.request)

        .then(cacheResponse=>{

            if(cacheResponse){

                return cacheResponse;

            }

            return fetch(event.request)

            .then(networkResponse=>{

                const clone=networkResponse.clone();

                caches.open(CACHE_NAME)

                .then(cache=>{

                    cache.put(event.request,clone);

                });

                return networkResponse;

            })

            .catch(()=>{

                if(event.request.destination==="document"){

                    return caches.match("./index.html");

                }

            });

        })

    );

});

// ==========================
// Push Notification
// ==========================

self.addEventListener("push",(event)=>{

    const data=event.data
        ?event.data.text()
        :"Crazy Fishing Simulator";

    event.waitUntil(

        self.registration.showNotification(

            "Crazy Fishing",

            {

                body:data,

                icon:"./assets/icons/icon-192.png",

                badge:"./assets/icons/icon-192.png",

                vibrate:[200,100,200],

                requireInteraction:false

            }

        )

    );

});

// ==========================
// Notification Click
// ==========================

self.addEventListener(

    "notificationclick",

    (event)=>{

        event.notification.close();

        event.waitUntil(

            clients.openWindow("./")

        );

    }

);

// ==========================
// Background Sync
// ==========================

self.addEventListener(

    "sync",

    (event)=>{

        if(event.tag==="save-game"){

            event.waitUntil(

                Promise.resolve()

            );

        }

    }

);

// ==========================
// Message
// ==========================

self.addEventListener(

    "message",

    (event)=>{

        if(event.data==="skipWaiting"){

            self.skipWaiting();

        }

    }

);

console.log("Service Worker aktif");
