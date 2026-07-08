// ======================================
// storage.js
// Crazy Fishing Simulator
// ======================================

const STORAGE_KEY = "crazyFishingSave";

// =========================
// Simpan Game
// =========================
function saveGame() {

    try {

        const saveData = {

            version: 1,

            date: new Date().toISOString(),

            player: player,

            inventory: typeof inventory !== "undefined" ? inventory : [],

            statistics: {

                totalMoney: player.money,

                totalFish: player.fishCaught,

                level: player.level,

                xp: player.xp

            }

        };

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(saveData)

        );

        console.log("Game berhasil disimpan");

    } catch (err) {

        console.error(err);

    }

}

// =========================
// Load Game
// =========================
function loadGame() {

    try {

        const data = localStorage.getItem(STORAGE_KEY);

        if (!data) return false;

        const save = JSON.parse(data);

        if (save.player) {

            Object.assign(player, save.player);

        }

        if (
            save.inventory &&
            typeof inventory !== "undefined"
        ) {

            inventory.length = 0;

            save.inventory.forEach(f => {

                inventory.push(f);

            });

        }

        if (typeof updatePlayerUI === "function") {

            updatePlayerUI();

        }

        if (typeof updateInventory === "function") {

            updateInventory();

        }

        console.log("Save berhasil dimuat");

        return true;

    } catch (err) {

        console.error(err);

        return false;

    }

}

// =========================
// Hapus Save
// =========================
function deleteSave() {

    if (

        confirm("Hapus semua data permainan?")

    ) {

        localStorage.removeItem(STORAGE_KEY);

        location.reload();

    }

}

// =========================
// Export Save
// =========================
function exportSave() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {

        alert("Belum ada data.");

        return;

    }

    const blob = new Blob(

        [data],

        {

            type: "application/json"

        }

    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "CrazyFishingSave.json";

    a.click();

    URL.revokeObjectURL(url);

}

// =========================
// Import Save
// =========================
function importSave(file) {

    const reader = new FileReader();

    reader.onload = function(e){

        try{

            JSON.parse(e.target.result);

            localStorage.setItem(

                STORAGE_KEY,

                e.target.result

            );

            alert("Save berhasil diimport.");

            location.reload();

        }

        catch{

            alert("File tidak valid.");

        }

    };

    reader.readAsText(file);

}

// =========================
// Auto Save
// =========================
setInterval(() => {

    saveGame();

}, 30000);

// =========================
// Simpan saat browser ditutup
// =========================
window.addEventListener(

    "beforeunload",

    saveGame

);

// =========================
// Load saat pertama dibuka
// =========================
window.addEventListener(

    "load",

    () => {

        loadGame();

    }

);

// =========================
// Backup Manual
// =========================
function backupNow(){

    saveGame();

    alert("Backup berhasil.");

}

// =========================
// Info Save
// =========================
function getSaveInfo(){

    const data = localStorage.getItem(STORAGE_KEY);

    if(!data) return null;

    return JSON.parse(data);

}
