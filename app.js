// ======================================
// Crazy Fishing Simulator
// app.js
// ======================================

const video = document.getElementById("camera");
const loadingScreen = document.getElementById("loadingScreen");

const moneyEl = document.getElementById("money");
const levelEl = document.getElementById("level");

const castBtn = document.getElementById("castBtn");
const pullBtn = document.getElementById("pullBtn");

const downloadBtn = document.getElementById("downloadBtn");
const shareBtn = document.getElementById("shareBtn");
const continueBtn = document.getElementById("continueBtn");

const notification = document.getElementById("notification");

const inventoryPanel = document.getElementById("inventoryPanel");
const upgradePanel = document.getElementById("upgradePanel");
const statsPanel = document.getElementById("statsPanel");

const menuBtn = document.getElementById("menuBtn");
const cameraBtn = document.getElementById("cameraBtn");

let useFrontCamera = true;

const player = {
    name: "Player",
    level: 1,
    xp: 0,
    money: 0
};

async function initCamera() {

    try {

        if(video.srcObject){

            video.srcObject.getTracks().forEach(track=>track.stop());

        }

        const stream = await navigator.mediaDevices.getUserMedia({

            video:{
                facingMode:useFrontCamera?"user":"environment"
            },

            audio:false

        });

        video.srcObject = stream;

    } catch(err){

        console.error(err);

        showNotification("Kamera tidak tersedia");

    }

}

cameraBtn.onclick = ()=>{

    useFrontCamera=!useFrontCamera;

    initCamera();

};

window.addEventListener("load",()=>{

    initCamera();

    updateHUD();

    setTimeout(()=>{

        loadingScreen.style.display="none";

    },1500);

});

function updateHUD(){

    moneyEl.textContent = player.money.toLocaleString("id-ID");

    levelEl.textContent = player.level;

}

function showNotification(text){

    notification.textContent=text;

    notification.classList.remove("hidden");

    setTimeout(()=>{

        notification.classList.add("hidden");

    },2500);

}

menuBtn.onclick=()=>{

    inventoryPanel.classList.toggle("hidden");

};

castBtn.onclick=()=>{

    if(typeof startFishing==="function"){

        startFishing();

    }

};

pullBtn.onclick=()=>{

    if(typeof pullFishing==="function"){

        pullFishing();

    }

};

continueBtn.onclick=()=>{

    document.getElementById("catchModal").classList.add("hidden");

};

downloadBtn.onclick = async ()=>{

    const card=document.querySelector("#catchModal .card");

    if(!card) return;

    const canvas=await html2canvas(card,{scale:2});

    const a=document.createElement("a");

    a.download="hasil-tangkapan.png";

    a.href=canvas.toDataURL("image/png");

    a.click();

};

shareBtn.onclick = async ()=>{

    const card=document.querySelector("#catchModal .card");

    if(!card) return;

    const canvas=await html2canvas(card,{scale:2});

    canvas.toBlob(async(blob)=>{

        const file=new File([blob],"hasil-tangkapan.png",{

            type:"image/png"

        });

        if(navigator.canShare && navigator.canShare({files:[file]})){

            await navigator.share({

                title:"Crazy Fishing Simulator",

                text:"Lihat hasil tangkapanku!",

                files:[file]

            });

        }else{

            showNotification("Browser belum mendukung Share");

        }

    });

};

function addMoney(value){

    player.money+=value;

    updateHUD();

    if(typeof saveGame==="function"){

        saveGame();

    }

}

function addXP(value){

    player.xp+=value;

    if(player.xp>=100){

        player.xp=0;

        player.level++;

        showNotification("Naik Level!");

    }

    updateHUD();

}

function toggleInventory(){

    inventoryPanel.classList.toggle("hidden");

}

function toggleUpgrade(){

    upgradePanel.classList.toggle("hidden");

}

function toggleStats(){

    statsPanel.classList.toggle("hidden");

}

if("serviceWorker" in navigator){

    navigator.serviceWorker.register("service-worker.js");

}
