// ==========================================
// app.js
// Crazy Fishing Simulator
// ==========================================

"use strict";


// ==========================================
// APP
// ==========================================

const APP = {

    version: "1.0.0",

    initialized: false

};

// ==========================================
// INIT
// ==========================================

async function initApp() {

    if (APP.initialized) return;

    APP.initialized = true;

    console.log("Crazy Fishing Simulator");

    console.log("Version:", APP.version);

    loadPlayer();

    loadInventory();

    loadSettings();

    registerServiceWorker();

    installPrompt();

}

// ==========================================
// Load Data
// ==========================================

function loadPlayer() {

    if (typeof loadGame === "function") {

        loadGame();

    }

}

function loadInventory() {

    if (typeof loadInventoryData === "function") {

        loadInventoryData();

    }

}

function loadSettings() {

    const sound = localStorage.getItem("sound");

    const music = localStorage.getItem("music");

    if (sound !== null) {

        player.sound = sound === "true";

    }

    if (music !== null) {

        player.music = music === "true";

    }

}

// ==========================================
// Install PWA
// ==========================================

let deferredPrompt = null;

window.addEventListener(

    "beforeinstallprompt",

    (e) => {

        e.preventDefault();

        deferredPrompt = e;

    }

);

async function installPrompt() {

    const btn = document.getElementById("installBtn");

   
