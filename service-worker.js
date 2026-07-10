// ==========================================
// service-worker.js
// Crazy Fishing Simulator
// ==========================================

"use strict";

const CACHE_NAME = "crazy-fishing-v1.0.3";

const FILES = [

    "./",

    "./index.html",

    "./style.css",

    "./app.js",

    "./game.js",

    "./player.js",

    "./fish.js",

    "./fishRenderer.js",

    "./storage.js",

    "./ui.js",

    "./manifest.json",

    "./assets/logo.svg",

    "./assets/icon.svg"

];

// ==========================
// Install
// ==========================

self.addEventListener(

    "install",

    event => {

        event.waitUntil(

            caches.open(CACHE_NAME)

                .then(cache => {

                    return cache.addAll(FILES);

                })

        );

        self.skipWaiting();

    }

);

// ==========================
// Activate
// ==========================

self.addEventListener(

    "activate",

    event => {

        event.waitUntil(

            caches.keys().then(keys =>

                Promise.all(

                    keys.map(key => {

                        if (key !== CACHE_NAME) {

                            return caches.delete(key);

                        }

                    })

                )

            )

        );

        self.clients.claim();

    }

);

// ==========================
// Fetch
// ==========================

self.addEventListener(

    "fetch",

    event => {

        event.respondWith(

            caches.match(event.request)

                .then(response => {

                    if (response) {

                        return response;

                    }

                    return fetch(event.request)

                        .then(networkResponse => {

                            return caches.open(CACHE_NAME)

                                .then(cache => {

                                    cache.put(

                                        event.request,

                                        networkResponse.clone()

                                    );

                                    return networkResponse;

                                });

                        });

                })

        );

    }

);
