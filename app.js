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

   
// ==========================================
// Sistem Batas Inventory (Tambahkan di Paling Bawah)
// ==========================================

// Fungsi global untuk mengecek apakah tas sudah penuh
function isInventoryFull() {
    
    // Jika data player atau inventory belum siap, anggap tidak penuh
    if (typeof player === "undefined" || !player.inventory) return false;
    
    // Jika batas maksimal belum diatur di sistem simpanan, beri nilai default 5
    if (!player.inventoryMax) {
        player.inventoryMax = 5;
    }
    
    // Cek apakah jumlah ikan di tas sudah mencapai atau melebihi batas maksimal
    return player.inventory.length >= player.inventoryMax;
}
