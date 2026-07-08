// ==========================================
// ui.js
// Crazy Fishing Simulator
// ==========================================

// Panel
const inventoryPanel = document.getElementById("inventoryPanel");
const upgradePanel = document.getElementById("upgradePanel");
const statsPanel = document.getElementById("statsPanel");
const catchModal = document.getElementById("catchModal");

// List Inventory
const inventoryList = document.getElementById("inventoryList");

// Notification
const notification = document.getElementById("notification");

// Achievement
const achievementPopup = document.getElementById("achievementPopup");

// Inventory Global
let inventory = [];

// ==========================================
// Toggle Panel
// ==========================================

function hideAllPanels(){

    inventoryPanel.classList.add("hidden");
    upgradePanel.classList.add("hidden");
    statsPanel.classList.add("hidden");

}

function toggleInventory(){

    const open = inventoryPanel.classList.contains("hidden");

    hideAllPanels();

    if(open){

        inventoryPanel.classList.remove("hidden");

    }

}

function toggleUpgrade(){

    const open = upgradePanel.classList.contains("hidden");

    hideAllPanels();

    if(open){

        upgradePanel.classList.remove("hidden");

    }

}

function toggleStats(){

    const open = statsPanel.classList.contains("hidden");

    hideAllPanels();

    if(open){

        statsPanel.classList.remove("hidden");

    }

}

// ==========================================
// Inventory
// ==========================================

function updateInventory(){

    inventoryList.innerHTML="";

    if(inventory.length===0){

        inventoryList.innerHTML=
        "<p>Belum ada hasil tangkapan.</p>";

        return;

    }

    inventory.forEach((fish,index)=>{

        const item=document.createElement("div");

        item.className="inventory-item";

        item.innerHTML=`

            <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;border-bottom:1px solid rgba(255,255,255,.15);">

                <div>

                    <div style="font-size:30px">${fish.emoji}</div>

                </div>

                <div style="flex:1;margin-left:12px">

                    <b>${fish.name}</b><br>

                    ${fish.weight} Kg<br>

                    ${fish.length} cm<br>

                    ${fish.rarity}

                </div>

                <div>

                    Rp ${fish.price.toLocaleString("id-ID")}

                </div>

            </div>

        `;

        inventoryList.appendChild(item);

    });

}

// ==========================================
// Tambah Inventory
// ==========================================

function addInventory(fish){

    inventory.push(fish);

    updateInventory();

    saveGame();

}

// ==========================================
// Jual Semua
// ==========================================

function sellAllFish(){

    if(inventory.length===0){

        showNotification("Tidak ada ikan.");

        return;

    }

    let total=0;

    inventory.forEach(f=>{

        total+=f.price;

    });

    addMoney(total);

    inventory=[];

    updateInventory();

    saveGame();

    showNotification(

        "Semua ikan terjual!"

    );

}

// ==========================================
// Notification
// ==========================================

function showNotification(text){

    notification.textContent=text;

    notification.classList.remove("hidden");

    clearTimeout(notification.timer);

    notification.timer=setTimeout(()=>{

        notification.classList.add("hidden");

    },2500);

}

// ==========================================
// Achievement
// ==========================================

function showAchievement(text){

    achievementPopup.innerHTML=

        "🏆<br>"+text;

    achievementPopup.classList.remove("hidden");

    setTimeout(()=>{

        achievementPopup.classList.add("hidden");

    },3500);

}

// ==========================================
// Modal Hasil
// ==========================================

function closeCatchModal(){

    catchModal.classList.add("hidden");

}

function openCatchModal(){

    catchModal.classList.remove("hidden");

}

// ==========================================
// Update Statistik
// ==========================================

function updateStats(){

    document.getElementById("statMoney").textContent=
    player.money.toLocaleString("id-ID");

    document.getElementById("statFish").textContent=
    player.fishCaught;

    document.getElementById("statLevel").textContent=
    player.level;

    document.getElementById("statXP").textContent=
    player.xp+" / "+player.xpMax;

}

// ==========================================
// Event
// ==========================================

document.getElementById("menuBtn").onclick=toggleInventory;

document.getElementById("continueBtn").onclick=
closeCatchModal;

window.addEventListener("load",()=>{

    updateInventory();

    updateStats();

});
