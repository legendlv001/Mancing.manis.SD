// ======================================
// player.js
// Crazy Fishing Simulator
// ======================================

const PLAYER_SAVE_KEY = "crazyFishingPlayer";

const player = {
    name: "Pemancing",
    level: 1,
    xp: 0,
    xpMax: 100,

    money: 0,

    fishCaught: 0,
    biggestFish: 0,

    rodLevel: 1,
    chestLevel: 1,

    inventorySize: 20,

    achievement: []
};

// ============================
// Simpan
// ============================

function savePlayer(){

    localStorage.setItem(

        PLAYER_SAVE_KEY,

        JSON.stringify(player)

    );

}

// ============================
// Load
// ============================

function loadPlayer(){

    const data = localStorage.getItem(

        PLAYER_SAVE_KEY

    );

    if(data){

        Object.assign(

            player,

            JSON.parse(data)

        );

    }

    updatePlayerUI();

}

// ============================
// Reset
// ============================

function resetPlayer(){

    localStorage.removeItem(

        PLAYER_SAVE_KEY

    );

    location.reload();

}

// ============================
// Tambah uang
// ============================

function addMoney(amount){

    player.money += amount;

    updatePlayerUI();

    savePlayer();

}

// ============================
// Kurangi uang
// ============================

function spendMoney(amount){

    if(player.money < amount){

        return false;

    }

    player.money -= amount;

    updatePlayerUI();

    savePlayer();

    return true;

}

// ============================
// Tambah XP
// ============================

function addXP(amount){

    player.xp += amount;

    while(player.xp >= player.xpMax){

        player.xp -= player.xpMax;

        player.level++;

        player.xpMax += 50;

        unlockAchievement(

            "Level " + player.level

        );

        showNotification(

            "⭐ Level Naik!"

        );

    }

    updatePlayerUI();

    savePlayer();

}

// ============================
// Tambah ikan
// ============================

function addFish(weight){

    player.fishCaught++;

    if(weight > player.biggestFish){

        player.biggestFish = weight;

    }

    savePlayer();

}

// ============================
// Achievement
// ============================

function unlockAchievement(name){

    if(

        player.achievement.includes(name)

    ) return;

    player.achievement.push(name);

    showAchievement(name);

}

// ============================
// Popup Achievement
// ============================

function showAchievement(name){

    const popup = document.getElementById(

        "achievementPopup"

    );

    if(!popup) return;

    popup.innerHTML =

        "🏆 Achievement<br>" +

        name;

    popup.classList.remove("hidden");

    setTimeout(()=>{

        popup.classList.add("hidden");

    },3000);

}

// ============================
// Upgrade Pancing
// ============================

function upgradeRod(){

    const price =

        player.rodLevel * 500;

    if(!spendMoney(price)){

        showNotification(

            "Uang tidak cukup"

        );

        return;

    }

    player.rodLevel++;

    savePlayer();

    updatePlayerUI();

}

// ============================
// Upgrade Peti
// ============================

function upgradeChest(){

    const price =

        player.chestLevel * 700;

    if(!spendMoney(price)){

        showNotification(

            "Uang tidak cukup"

        );

        return;

    }

    player.chestLevel++;

    player.inventorySize += 5;

    savePlayer();

    updatePlayerUI();

}

// ============================
// Update UI
// ============================

function updatePlayerUI(){

    const money = document.getElementById(

        "money"

    );

    if(money){

        money.textContent =

        player.money.toLocaleString("id-ID");

    }

    const level = document.getElementById(

        "level"

    );

    if(level){

        level.textContent =

        player.level;

    }

    const statMoney =

        document.getElementById(

            "statMoney"

        );

    if(statMoney){

        statMoney.textContent =

        player.money.toLocaleString("id-ID");

    }

    const statFish =

        document.getElementById(

            "statFish"

        );

    if(statFish){

        statFish.textContent =

        player.fishCaught;

    }

    const statLevel =

        document.getElementById(

            "statLevel"

        );

    if(statLevel){

        statLevel.textContent =

        player.level;

    }

    const statXP =

        document.getElementById(

            "statXP"

        );

    if(statXP){

        statXP.textContent =

        player.xp +

        " / " +

        player.xpMax;

    }

}

// ============================
// Jalankan saat game dibuka
// ============================

loadPlayer();
