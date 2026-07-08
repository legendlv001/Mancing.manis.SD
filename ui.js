// ==========================================
// ui.js Part 1
// Crazy Fishing Simulator
// ==========================================

// -------------------------
// Ambil Elemen
// -------------------------

const menuBtn = document.getElementById("menuBtn");

const inventoryPanel = document.getElementById("inventoryPanel");
const upgradePanel = document.getElementById("upgradePanel");
const statsPanel = document.getElementById("statsPanel");
const settingsPanel = document.getElementById("settingsPanel");
const aboutPanel = document.getElementById("aboutPanel");
const catchModal = document.getElementById("catchModal");

const notification = document.getElementById("notification");
const achievementPopup = document.getElementById("achievementPopup");

// -------------------------
// Tutup Semua Panel
// -------------------------

function closeAllPanels(){

    [
        inventoryPanel,
        upgradePanel,
        statsPanel,
        settingsPanel,
        aboutPanel,
        catchModal

    ].forEach(panel=>{

        if(panel){

            panel.classList.add("hidden");

        }

    });

}

// -------------------------
// Toggle Panel
// -------------------------

function toggleInventory(){

    const open = inventoryPanel.classList.contains("hidden");

    closeAllPanels();

    if(open){

        inventoryPanel.classList.remove("hidden");

    }

}

function toggleUpgrade(){

    const open = upgradePanel.classList.contains("hidden");

    closeAllPanels();

    if(open){

        upgradePanel.classList.remove("hidden");

    }

}

function toggleStats(){

    const open = statsPanel.classList.contains("hidden");

    closeAllPanels();

    if(open){

        statsPanel.classList.remove("hidden");

    }

}

function toggleSettings(){

    const open = settingsPanel.classList.contains("hidden");

    closeAllPanels();

    if(open){

        settingsPanel.classList.remove("hidden");

    }

}

function toggleAbout(){

    const open = aboutPanel.classList.contains("hidden");

    closeAllPanels();

    if(open){

        aboutPanel.classList.remove("hidden");

    }

}

// -------------------------
// Catch Modal
// -------------------------

function openCatchModal(){

    catchModal.classList.remove("hidden");

}

function closeCatchModal(){

    catchModal.classList.add("hidden");

}

// -------------------------
// Menu Button
// -------------------------

if(menuBtn){

    menuBtn.onclick = function(){

        toggleSettings();

    };

}

// -------------------------
// Klik Luar Panel
// -------------------------

window.addEventListener("click",function(e){

    if(e.target===catchModal){

        closeCatchModal();

    }

});

// -------------------------
// Tombol Escape
// -------------------------

document.addEventListener("keydown",function(e){

    if(e.key==="Escape"){

        closeAllPanels();

    }

});

// -------------------------
// Notification
// -------------------------

function showNotification(text){

    notification.innerText = text;

    notification.classList.remove("hidden");

    setTimeout(function(){

        notification.classList.add("hidden");

    },3000);

}

// -------------------------
// Achievement Popup
// -------------------------

function showAchievement(title){

    achievementPopup.innerHTML =
    "🏆 " + title;

    achievementPopup.classList.remove("hidden");

    setTimeout(function(){

        achievementPopup.classList.add("hidden");

    },4000);

}

// -------------------------
// Saat Halaman Dibuka
// -------------------------

window.addEventListener("load",function(){

    closeAllPanels();

});

// ==========================================
// ui.js Part 2
// Inventory, Statistik, XP & Achievement
// ==========================================

// -------------------------
// INVENTORY
// -------------------------

let inventory = [];

function addFish(fish){

    inventory.push(fish);

    updateInventory();

    updateStats();

}

function removeFish(index){

    inventory.splice(index,1);

    updateInventory();

    updateStats();

}

function clearInventory(){

    inventory = [];

    updateInventory();

    updateStats();

}

function updateInventory(){

    const list = document.getElementById("inventoryList");

    if(!list) return;

    list.innerHTML = "";

    if(inventory.length===0){

        list.innerHTML="<p>Belum ada ikan.</p>";

        return;

    }

    inventory.forEach((fish,index)=>{

        const item=document.createElement("div");

        item.className="inventoryItem";

        item.innerHTML=`

        <b>${fish.name}</b><br>

        Berat : ${fish.weight} Kg<br>

        Harga : Rp ${fish.price.toLocaleString()}<br>

        <button onclick="removeFish(${index})">

        Hapus

        </button>

        `;

        list.appendChild(item);

    });

}

// -------------------------
// JUAL SEMUA
// -------------------------

function sellAllFish(){

    if(inventory.length===0){

        showNotification("Inventory kosong.");

        return;

    }

    let total=0;

    inventory.forEach(f=>{

        total+=f.price;

    });

    if(typeof player!=="undefined"){

        player.money+=total;

    }

    clearInventory();

    updateMoney();

    showNotification("Berhasil menjual semua ikan!");

}

// -------------------------
// MONEY
// -------------------------

function updateMoney(){

    const el=document.getElementById("money");

    if(!el || typeof player==="undefined") return;

    el.textContent=player.money.toLocaleString();

}

// -------------------------
// LEVEL
// -------------------------

function updateLevel(){

    if(typeof player==="undefined") return;

    document.getElementById("level").textContent=player.level;

}

// -------------------------
// XP
// -------------------------

function updateXP(){

    if(typeof player==="undefined") return;

    const fill=document.getElementById("xpFill");

    const percent=(player.xp/player.maxXP)*100;

    fill.style.width=percent+"%";

}

// -------------------------
// STATISTIK
// -------------------------

function updateStats(){

    if(typeof player==="undefined") return;

    document.getElementById("statMoney").textContent=

    player.money.toLocaleString();

    document.getElementById("statFish").textContent=

    inventory.length;

    document.getElementById("statLevel").textContent=

    player.level;

    document.getElementById("statXP").textContent=

    player.xp+" / "+player.maxXP;

}

// -------------------------
// ACHIEVEMENT
// -------------------------

let achievements=[];

function unlockAchievement(name){

    if(achievements.includes(name)) return;

    achievements.push(name);

    showAchievement(name);

    refreshAchievementList();

}

function refreshAchievementList(){

    const box=document.getElementById("achievementList");

    if(!box) return;

    box.innerHTML="";

    achievements.forEach(a=>{

        const p=document.createElement("p");

        p.textContent="🏆 "+a;

        box.appendChild(p);

    });

}

// -------------------------
// LOAD UI
// -------------------------

window.addEventListener("load",()=>{

    updateInventory();

    updateMoney();

    updateLevel();

    updateXP();

    updateStats();

});

// ==========================================
// ui.js Part 3
// Backup, Share, Download, PWA, Audio
// ==========================================

// -------------------------
// DOWNLOAD HASIL TANGKAPAN
// -------------------------

async function downloadCatch(){

    const card = document.querySelector("#catchModal .card");

    if(!card) return;

    const canvas = await html2canvas(card);

    const link = document.createElement("a");

    link.download = "hasil-tangkapan.png";

    link.href = canvas.toDataURL("image/png");

    link.click();

}

// -------------------------
// SHARE
// -------------------------

async function shareCatch(){

    const card = document.querySelector("#catchModal .card");

    if(!card) return;

    const canvas = await html2canvas(card);

    canvas.toBlob(async(blob)=>{

        const file = new File(
            [blob],
            "hasil-tangkapan.png",
            {type:"image/png"}
        );

        if(
            navigator.canShare &&
            navigator.canShare({files:[file]})
        ){

            await navigator.share({

                title:"Crazy Fishing Simulator",

                text:"Lihat hasil tangkapanku!",

                files:[file]

            });

        }else{

            alert("Browser tidak mendukung Share.");

        }

    });

}

// -------------------------
// AUDIO
// -------------------------

const bgm=document.getElementById("bgm");

let musicOn=true;

function toggleMusic(){

    if(!bgm) return;

    musicOn=!musicOn;

    if(musicOn){

        bgm.play().catch(()=>{});

    }else{

        bgm.pause();

    }

}

// -------------------------
// BACKUP
// -------------------------

function backupNow(){

    if(typeof saveGame==="function"){

        saveGame();

    }

    showNotification("Backup berhasil");

}

// -------------------------
// EXPORT SAVE
// -------------------------

function exportSave(){

    const data=localStorage.getItem("crazyFishingSave");

    if(!data){

        showNotification("Tidak ada data.");

        return;

    }

    const blob=new Blob(
        [data],
        {type:"application/json"}
    );

    const link=document.createElement("a");

    link.href=URL.createObjectURL(blob);

    link.download="savegame.json";

    link.click();

}

// -------------------------
// IMPORT SAVE
// -------------------------

function importSave(file){

    if(!file) return;

    const reader=new FileReader();

    reader.onload=function(){

        localStorage.setItem(

            "crazyFishingSave",

            reader.result

        );

        location.reload();

    };

    reader.readAsText(file);

}

// -------------------------
// RESET
// -------------------------

function deleteSave(){

    if(!confirm("Reset game?")) return;

    localStorage.removeItem(

        "crazyFishingSave"

    );

    location.reload();

}

// -------------------------
// PWA INSTALL
// -------------------------

let deferredPrompt=null;

window.addEventListener(

"beforeinstallprompt",

e=>{

    e.preventDefault();

    deferredPrompt=e;

}

);

async function installApp(){

    if(!deferredPrompt) return;

    deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    deferredPrompt=null;

}

// -------------------------
// BUTTON
// -------------------------

const downloadBtn=document.getElementById("downloadBtn");

const shareBtn=document.getElementById("shareBtn");

if(downloadBtn){

    downloadBtn.onclick=downloadCatch;

}

if(shareBtn){

    shareBtn.onclick=shareCatch;

}
