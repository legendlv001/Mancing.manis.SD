// ==========================================
// game.js FINAL LENGKAP UTUH
// Crazy Fishing Simulator
// ==========================================

"use strict";

// ==============================
// Audio
// ==============================

const castSound = new Audio("assets/sounds/cast.mp3");
const hookSound = new Audio("assets/sounds/hook.mp3");
const catchSound = new Audio("assets/sounds/catch.mp3");
const clickSound = new Audio("assets/sounds/click.mp3");
const levelupSound = new Audio("assets/sounds/levelup.mp3");
const bgmSound = new Audio("assets/sounds/bgm.mp3");

bgmSound.loop = true;
bgmSound.volume = 0.3;

// ==============================
// Canvas
// ==============================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// ==============================
// Renderer
// ==============================

const renderer = new FishRenderer(ctx);

// ==============================
// Video & Kamera
// ==============================

const camera = document.getElementById("camera");
let localStream = null; // Menampung aliran video kamera secara global

// ==============================
// Tombol
// ==============================

const castBtn = document.getElementById("castBtn");
const pullBtn = document.getElementById("pullBtn");


// ==============================
// Resize
// ==============================

function resizeCanvas(){

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();

// ==============================
// Fungsi Menghidupkan Kamera
// ==============================

async function startCamera(){

    if(!navigator.mediaDevices) return;

    try{

        const stream = await navigator.mediaDevices.getUserMedia({

            video:{
                facingMode:"environment"
            },

            audio:false

        });

        localStream = stream; // Simpan aliran video ke variabel global
        camera.srcObject = stream;
        camera.style.display = "block"; // Munculkan elemen kamera

    }catch(err){

        console.log(err);

    }

}

// ==============================
// Fungsi Mematikan Kamera
// ==============================

function stopCamera() {
    if (localStream) {
        // Matikan semua komponen video (hardware kamera) agar hemat baterai
        localStream.getTracks().forEach(track => track.stop());
        localStream = null;
    }
    camera.srcObject = null;
    camera.style.display = "none"; // Sembunyikan elemen kamera agar layar bersih
}

// ==============================
// Status Game
// ==============================

const game={

    running:true,

    paused:false,

    score:0,

    currentFish:null,

    frame:0

};

// ==============================
// Kail
// ==============================

const hook={

    x:0,

    y:80,

    radius:10,

    speed:10,

    casting:false,

    pulling:false,

    maxDepth:650

};

function resetHook(){

    hook.x=canvas.width/2;

    hook.y=80;

    hook.casting=false;

    hook.pulling=false;

}

resetHook();

// ==============================
// Background
// ==============================

function drawBackground(){

    // Menghapus frame lama dan membuat canvas menjadi transparan murni agar kamera tembus
    ctx.clearRect(0, 0, canvas.width, canvas.height);

}

// ==============================
// Kail
// ==============================

function drawHook(){

    ctx.strokeStyle="#FFFFFF";

    ctx.lineWidth=2;

    ctx.beginPath();

    ctx.moveTo(

        canvas.width/2,

        0

    );

    ctx.lineTo(

        hook.x,

        hook.y

    );

    ctx.stroke();

    ctx.beginPath();

    ctx.fillStyle="#E5E7EB";

    ctx.arc(

        hook.x,

        hook.y,

        hook.radius,

        0,

        Math.PI*2

    );

    ctx.fill();

}

// ==============================
// Update Kail
// ==============================

function updateHook(){

    if(hook.casting){

        hook.y+=hook.speed;

        // Jika kail sudah menyentuh kedalaman maksimal (dasar)
        if(hook.y>=hook.maxDepth){

            hook.y = hook.maxDepth; // Kunci posisi kail di dasar
            hook.casting = false;   // Hentikan proses jatuh

            // Memunculkan tombol tarik saat kail di dasar
            if (pullBtn) {
                pullBtn.classList.remove("hidden");
            }
        }

    }

    if(hook.pulling){

        hook.y-=hook.speed;

    }

}

// ==============================
// Utilitas
// ==============================

function random(min,max){

    return Math.random()*(max-min)+min;

}

function distance(x1,y1,x2,y2){

    return Math.hypot(

        x2-x1,

        y2-y1

    );
}

// ==========================================
// Part 2 - Fish System
// ==========================================

// ==============================
// Spawn Ikan
// ==============================

function spawnFish(){

    if(typeof fishes==="undefined") return;

    const data=fishes[
        Math.floor(Math.random()*fishes.length)
    ];

    game.currentFish={

        ...data,

        x:random(80,canvas.width-80),

        y:random(220,hook.maxDepth-40),

        speed:random(1.2,2.8),

        direction:Math.random()<0.5?-1:1,

        scale:random(0.9,1.2),

        alive:true

    };

}

// ==============================
// Update Ikan
// ==============================

function updateFish(){

    if(!game.currentFish) return;

    const fish=game.currentFish;

    fish.x+=fish.speed*fish.direction;

    if(fish.x<60){

        fish.direction=1;

    }

    if(fish.x>canvas.width-60){

        fish.direction=-1;

    }

}

// ==============================
// Render Ikan
// ==============================

function drawFish(){

    if(!game.currentFish) return;

    renderer.draw(

        game.currentFish,

        game.currentFish.x,

        game.currentFish.y,

        game.currentFish.scale

    );

}

// ==============================
// Lempar Kail
// ==============================

function castLine(){

    if(hook.casting||hook.pulling) return;

    resetHook();

    spawnFish();

    hook.casting=true;

    // Sembunyikan tombol lempar saat kail meluncur
    if(castBtn){
        castBtn.classList.add("hidden");
    }

    if(castSound){

        castSound.currentTime=0;

        castSound.play().catch(()=>{});

    }

}

// ==============================
// Tarik Kail
// ==============================

function pullLine(){

    // Izinkan kail ditarik walaupun hook.casting sudah false (saat di dasar)
    if(hook.pulling) return;

    hook.casting=false;

    hook.pulling=true;

}

// ==============================
// Strike
// ==============================

function checkStrike(){

    if(!game.currentFish) return;

    if(!game.currentFish.alive) return;

    const d=distance(

        hook.x,

        hook.y,

        game.currentFish.x,

        game.currentFish.y

    );

    if(d<35){

        game.currentFish.alive=false;

        hook.casting=false;

        hook.pulling=true;

        if(hookSound){

            hookSound.currentTime=0;

            hookSound.play().catch(()=>{});

        }

        pullBtn.classList.remove("hidden");

    }

}

// ==============================
// Event Button
// ==============================

if(castBtn){
    castBtn.addEventListener(
        "click",
        castLine
    );
}

if(pullBtn){
    pullBtn.addEventListener(
        "click",
        pullLine
    );
}

// Sakelar ON/OFF Kamera (Mendukung Banyak Kemungkinan ID HTML)
const photoBtn = document.getElementById("photoBtn") || document.getElementById("cameraBtn") || document.getElementById("toggleCameraBtn"); 

if (photoBtn) {
    photoBtn.addEventListener("click", () => {
        if (localStream) {
            stopCamera();
            photoBtn.textContent = "📸";
            console.log("Kamera dimatikan.");
        } else {
            startCamera();
            photoBtn.textContent = "📷";
            console.log("Kamera dihidupkan.");
        }
    });
} else {
    console.log("Tombol kamera tidak ditemukan di HTML. Periksa ID tombol Anda.");
}

// ==========================================
// Part 3 - Catch System
// ==========================================

// ==============================
// Tangkap Ikan
// ==============================

function catchFish() {

    if (!game.currentFish) return;

    if (game.currentFish.alive) return;

    const fish = {

        ...game.currentFish

    };

    // Inventory
    if (typeof addFish === "function") {

        addFish(fish);

    }

    // Statistik
    if (typeof addFishStats === "function") {

        addFishStats(fish);

    }

    // Uang
    if (typeof addMoney === "function") {

        addMoney(fish.price);

    }

    // XP
    if (typeof addXP === "function") {

        addXP(fish.xp || 10);

    }

    // Achievement
    if (
        typeof unlockAchievement === "function" &&
        typeof player !== "undefined"
    ) {

        if (player.totalFish === 1) {

            unlockAchievement("Strike Pertama");

        }

        if (player.totalFish === 10) {

            unlockAchievement("Pemancing Pemula");

        }

        if (player.totalFish === 50) {

            unlockAchievement("Pemancing Berpengalaman");

        }

        if (player.totalFish === 100) {

            unlockAchievement("Master Fishing");

        }

    }

    // Audio
    if (catchSound) {

        catchSound.currentTime = 0;

        catchSound.play().catch(() => {});

    }

    // Modal hasil
    showCatchResult(fish);

    // Bersihkan ikan & Reset tombol pancingan
    game.currentFish = null;

    if(pullBtn){
        pullBtn.classList.add("hidden");
    }

    if(castBtn){
        castBtn.classList.remove("hidden");
    }

}

// ==============================
// Modal Hasil
// ==============================

function showCatchResult(fish) {

    document.getElementById("fishName").textContent =
        fish.name;

    document.getElementById("fishRank").textContent =
        fish.rarity;

    document.getElementById("fishWeight").textContent =
        fish.weight + " Kg";

    document.getElementById("fishLength").textContent =
        fish.length + " cm";

    document.getElementById("fishPrice").textContent =
        "Rp " + fish.price.toLocaleString();

    document.getElementById("catchDate").textContent =
        new Date().toLocaleString("id-ID");

    if (typeof openCatchModal === "function") {

        openCatchModal();

    }

}

// ==============================
// Cek Kail Sampai Atas
// ==============================

function checkCatch() {

    if (!hook.pulling) return;

    if (hook.y > 80) return;

    if (

        game.currentFish &&

        game.currentFish.alive === false

    ) {

        catchFish();

    }

    resetHook();

    // Reset tombol saat kail sudah kembali ke atas air (kosong/tidak dapat ikan)
    if(castBtn){
        castBtn.classList.remove("hidden");
    }
    if(pullBtn){
        pullBtn.classList.add("hidden");
    }

}

// ==============================
// Update
// ==============================

function updateGame() {

    updateHook();

    updateFish();

    checkStrike();

    checkCatch();

}

// ==========================================
// Part 4 - Render & Animation
// ==========================================

// ==============================
// Gelembung Air
// ==============================

const bubbles = [];

function spawnBubble() {

    if (bubbles.length > 40) return;

    bubbles.push({

        x: random(20, canvas.width - 20),

        y: canvas.height + 20,

        radius: random(2, 8),

        speed: random(0.5, 2)

    });

}

function updateBubbles() {

    for (let i = bubbles.length - 1; i >= 0; i--) {

        bubbles[i].y -= bubbles[i].speed;

        if (bubbles[i].y < -20) {

            bubbles.splice(i, 1);

        }

    }

}

function drawBubbles() {

    ctx.fillStyle = "rgba(255,255,255,0.35)";

    bubbles.forEach(b => {

        ctx.beginPath();

        ctx.arc(

            b.x,

            b.y,

            b.radius,

            0,

            Math.PI * 2

        );

        ctx.fill();

    });

}

// ==============================
// Air
// ==============================

function drawWaterSurface() {

    ctx.fillStyle = "rgba(255,255,255,0.12)";

    for (let x = 0; x < canvas.width; x += 40) {

        ctx.beginPath();

        ctx.arc(

            x,

            80,

            20,

            0,

            Math.PI

        );

        ctx.fill();

    }

}

// ==============================
// HUD
// ==============================

function updateHUD() {

    if (typeof updateMoney === "function") {

        updateMoney();

    }

    if (typeof updateLevel === "function") {

        updateLevel();

    }

    if (typeof updateXP === "function") {

        updateXP();

    }

}

// ==============================
// Render Semua
// ==============================

function renderGame() {

    drawBackground();

    drawWaterSurface();

    drawBubbles();

    drawFish();

    drawHook();

}

// ==============================
// Update Frame
// ==============================

function updateFrame() {

    game.frame++;

    if (game.frame % 20 === 0) {

        spawnBubble();

    }

    updateBubbles();

    updateHUD();

}

// ==========================================
// Part 5 - Game Loop & Startup
// ==========================================

// ==============================
// Game Loop
// ==============================

function gameLoop() {

    if (!game.running) return;

    if (!game.paused) {

        updateGame();

        updateFrame();

        renderGame();

    }

    requestAnimationFrame(gameLoop);

}

// ==============================
// Pause Saat Tab Tidak Aktif
// ==============================

document.addEventListener(

    "visibilitychange",

    () => {

        game.paused = document.hidden;

    }

);

// ==============================
// Keyboard Shortcut
// ==============================

document.addEventListener(

    "keydown",

    (e) => {

        switch (e.key.toLowerCase()) {

            case " ":

                e.preventDefault();

                castLine();

                break;

            case "enter":

                pullLine();

                break;

            case "escape":

                if (typeof closeAllPanels === "function") {

                    closeAllPanels();

                }

                break;

        }

    }

);

// ==============================
// Autosave
// ==============================

setInterval(() => {

    if (typeof saveGame === "function") {

        saveGame();

    }

}, 30000);


// ==============================
// Start Game & Perbaikan Modal 
// ==============================
window.addEventListener(
    "load",
    () => {
        if (typeof initApp === "function") {
            initApp(); 
        }

        startCamera();
        resetHook();
        updateHUD();
        gameLoop();

        console.log("Crazy Fishing Simulator Ready");
        
        const loadingScreen = document.getElementById("loadingScreen");
        if (loadingScreen) {
            loadingScreen.style.display = "none";
        }

        // Penutup Modal Lanjutkan yang Aman
        const continueBtn = document.getElementById("continueBtn");
        const catchModal = document.getElementById("catchModal");

        if (continueBtn && catchModal) {
            continueBtn.addEventListener("click", () => {
                catchModal.style.setProperty("display", "none", "important");
                console.log("Modal berhasil ditutup.");
            });
        }

        // Memaksa Modal Muncul Kembali pada Ikan Selanjutnya
        if (typeof showCatchResult === "function") {
            const originalShowCatchResult = showCatchResult;
            showCatchResult = function(fish) {
                originalShowCatchResult(fish);
                
                if (catchModal) {
                    catchModal.classList.remove("hidden");
                    catchModal.style.setProperty("display", "flex", "important");
                    console.log("Modal dipaksa muncul untuk ikan: " + fish.name);
                }
            };
        }
    }
);
