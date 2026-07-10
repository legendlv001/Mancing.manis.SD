// ==========================================
// app.js (FINAL LENGKAP UTUH)
// Crazy Fishing Simulator
// ==========================================

"use strict";

// ==========================================
// APP INITIAL STATE
// ==========================================
const APP = {
    version: "1.0.0",
    initialized: false
};

// ==========================================
// INIT APP
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
// DATA LOADING
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
    if (typeof player === "undefined") return;
    
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
// INSTALL PWA SYSTEM
// ==========================================
let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

async function installPrompt() {
    const btn = document.getElementById("installBtn");
    
    if (btn) {
        btn.addEventListener("click", async () => {
            if (!deferredPrompt) return;
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log("User response to install prompt:", outcome);
            deferredPrompt = null;
        });
    }
}

function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("service-worker.js")
            .then(() => console.log("Service Worker berhasil didaftarkan."))
            .catch(err => console.log("Service Worker gagal:", err));
    }
}

// ==========================================
// SAKELAR BATAS INVENTORY (SISTEM DETEKSI)
// ==========================================
function isInventoryFull() {
    // 1. Ambil data inventory dari simpanan lokal jika variabel global player bermasalah
    let currentInventory = [];
    let maxSlot = 10; // Set batas bawaan awal: 10 slot

    if (typeof player !== "undefined") {
        if (Array.isArray(player.inventory)) {
            currentInventory = player.inventory;
        }
        if (player.inventoryMax) {
            maxSlot = player.inventoryMax;
        } else {
            player.inventoryMax = maxSlot;
        }
    } else {
        // Jika variabel player di memori hilang, coba intip cadangan di localStorage
        try {
            const savedData = localStorage.getItem("crazy_fishing_player"); // Menyesuaikan key penyimpanan local
            if (savedData) {
                const parsed = JSON.parse(savedData);
                if (parsed.inventory) currentInventory = parsed.inventory;
                if (parsed.inventoryMax) maxSlot = parsed.inventoryMax;
            }
        } catch (e) {
            console.log("Gagal membaca cadangan inventory di app.js");
        }
    }

    // 2. Tampilkan di log browser untuk memantau isi tas secara real-time
    console.log(`[LOG TAS] Jumlah Ikan: ${currentInventory.length} / Maksimal: ${maxSlot}`);

    // 3. Eksekusi keputusan: Apakah tas sudah penuh? (Mengembalikan nilai true/false)
    return currentInventory.length >= maxSlot;
}
