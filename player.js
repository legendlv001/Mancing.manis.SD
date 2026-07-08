// ==========================================
// player.js
// Crazy Fishing Simulator
// ==========================================

const player = {

    // Identitas
    name: "Player",

    // Level
    level: 1,
    xp: 0,
    maxXP: 100,

    // Uang
    money: 0,

    // Upgrade
    rodLevel: 1,
    chestLevel: 1,

    // Statistik
    totalFish: 0,
    totalWeight: 0,
    biggestFish: null,

    // Pengaturan
    sound: true,
    music: true

};

// ==========================================
// Tambah XP
// ==========================================

function addXP(amount){

    player.xp += amount;

    while(player.xp >= player.maxXP){

        player.xp -= player.maxXP;

        player.level++;

        player.maxXP = Math.floor(player.maxXP * 1.25);

        showAchievement(
            "Naik ke Level " + player.level
        );

    }

    if(typeof updateXP==="function")
        updateXP();

    if(typeof updateLevel==="function")
        updateLevel();

}

// ==========================================
// Tambah Uang
// ==========================================

function addMoney(amount){

    player.money += amount;

    if(typeof updateMoney==="function")
        updateMoney();

}

// ==========================================
// Kurangi Uang
// ==========================================

function spendMoney(amount){

    if(player.money < amount){

        showNotification("Uang tidak cukup!");

        return false;

    }

    player.money -= amount;

    updateMoney();

    return true;

}

// ==========================================
// Tambah Statistik
// ==========================================

function addFishStats(fish){

    player.totalFish++;

    player.totalWeight += fish.weight;

    if(

        !player.biggestFish ||

        fish.weight >

        player.biggestFish.weight

    ){

        player.biggestFish = fish;

    }

    updateStats();

}

// ==========================================
// Upgrade Pancing
// ==========================================

function upgradeRod(){

    const cost = player.rodLevel * 1000;

    if(!spendMoney(cost)) return;

    player.rodLevel++;

    document.getElementById("rodLevel").textContent =
        player.rodLevel;

    showNotification(
        "Pancing berhasil di-upgrade!"
    );

}

// ==========================================
// Upgrade Tas
// ==========================================

function upgradeChest(){

    const cost = player.chestLevel * 1500;

    if(!spendMoney(cost)) return;

    player.chestLevel++;

    document.getElementById("chestLevel").textContent =
        player.chestLevel;

    showNotification(
        "Tas berhasil di-upgrade!"
    );

}

// ==========================================
// Reset Player
// ==========================================

function resetPlayer(){

    player.level = 1;
    player.xp = 0;
    player.maxXP = 100;
    player.money = 0;

    player.rodLevel = 1;
    player.chestLevel = 1;

    player.totalFish = 0;
    player.totalWeight = 0;
    player.biggestFish = null;

    updateMoney();
    updateLevel();
    updateXP();
    updateStats();

}
