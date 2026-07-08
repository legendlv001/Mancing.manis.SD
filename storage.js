// ==========================================
// storage.js
// Crazy Fishing Simulator
// ==========================================

const SAVE_KEY = "crazyFishingSave";

// ----------------------------
// Simpan Game
// ----------------------------

function saveGame() {

    const data = {

        player: player,

        inventory: inventory,

        achievements: achievements

    };

    localStorage.setItem(
        SAVE_KEY,
        JSON.stringify(data)
    );

}

// ----------------------------
// Muat Game
// ----------------------------

function loadGame() {

    const save = localStorage.getItem(SAVE_KEY);

    if (!save) return;

    try {

        const data = JSON.parse(save);

        if (data.player)
            Object.assign(player, data.player);

        if (data.inventory)
            inventory = data.inventory;

        if (data.achievements)
            achievements = data.achievements;

    } catch (e) {

        console.error("Save rusak:", e);

    }

}

// ----------------------------
// Hapus Save
// ----------------------------

function resetGame() {

    localStorage.removeItem(SAVE_KEY);

}

// ----------------------------
// Autosave
// ----------------------------

setInterval(() => {

    saveGame();

}, 30000);

// ----------------------------
// Simpan saat keluar halaman
// ----------------------------

window.addEventListener("beforeunload", () => {

    saveGame();

});

// ----------------------------
// Load saat halaman dibuka
// ----------------------------

window.addEventListener("load", () => {

    loadGame();

});
