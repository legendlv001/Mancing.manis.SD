// ==========================================
// game.js FINAL LENGKAP - ANTI BOCOR
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
let localStream = null;

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
            video:{ facingMode:"environment" },
            audio:false
        });
        localStream = stream;
        camera.srcObject = stream;
        camera.style.display = "block";
    }catch(err){ console.log(err); }
}

function stopCamera() {
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        localStream = null;
    }
    camera.srcObject = null;
    camera.style.display = "none";
}

// ==============================
// Status Game
// ==============================
const game = {
    running: true,
    paused: false,
    score: 0,
    currentFish: null,
    frame: 0
};

// ==============================
// Kail
// ==============================
const hook = {
    x: 0, y: 80, radius: 10, speed: 10,
    casting: false, pulling: false, maxDepth: 650
};

function resetHook(){
    hook.x = canvas.width/2;
    hook.y = 80;
    hook.casting = false;
    hook.pulling = false;
}
resetHook();

// ==============================
// Background & Kail
// ==============================
function drawBackground(){ ctx.clearRect(0, 0, canvas.width, canvas.height); }

function drawHook(){
    ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(canvas.width/2, 0); ctx.lineTo(hook.x, hook.y); ctx.stroke();
    ctx.beginPath(); ctx.fillStyle = "#E5E7EB"; ctx.arc(hook.x, hook.y, hook.radius, 0, Math.PI*2); ctx.fill();
}

function updateHook(){
    if(hook.casting){
        hook.y += hook.speed;
        if(hook.y >= hook.maxDepth){
            hook.y = hook.maxDepth;
            hook.casting = false;
            if (pullBtn) pullBtn.classList.remove("hidden");
        }
    }
    if(hook.pulling) hook.y -= hook.speed;
}

// ==============================
// Utilitas
// ==============================
function random(min,max){ return Math.random()*(max-min)+min; }
function distance(x1,y1,x2,y2){ return Math.hypot(x2-x1, y2-y1); }

// ==============================
// Fish System
// ==============================
function spawnFish(){
    if(typeof fishes === "undefined") return;
    const data = fishes[Math.floor(Math.random()*fishes.length)];
    game.currentFish = {
        ...data,
        x: random(80, canvas.width-80),
        y: random(220, hook.maxDepth-40),
        speed: random(1.2, 2.8),
        direction: Math.random() < 0.5 ? -1 : 1,
        scale: random(0.9, 1.2),
        alive: true
    };
}

function updateFish(){
    if(!game.currentFish) return;
    const fish = game.currentFish;
    fish.x += fish.speed * fish.direction;
    if(fish.x < 60) fish.direction = 1;
    if(fish.x > canvas.width-60) fish.direction = -1;
}

function drawFish(){
    if(!game.currentFish) return;
    renderer.draw(game.currentFish, game.currentFish.x, game.currentFish.y, game.currentFish.scale);
}

// ==============================
// Line Actions
// ==============================
function castLine(){
    if(hook.casting || hook.pulling) return;
    resetHook();
    spawnFish();
    hook.casting = true;
    if(castBtn) castBtn.classList.add("hidden");
    if(castSound){ castSound.currentTime = 0; castSound.play().catch(()=>{}); }
}

function pullLine(){
    if(hook.pulling) return;
    hook.casting = false;
    hook.pulling = true;
}

function checkStrike(){
    if(!game.currentFish || !game.currentFish.alive) return;
    const d = distance(hook.x, hook.y, game.currentFish.x, game.currentFish.y);
    if(d < 35){
        game.currentFish.alive = false;
        hook.casting = false;
        hook.pulling = true;
        if(hookSound){ hookSound.currentTime = 0; hookSound.play().catch(()=>{}); }
        if(pullBtn) pullBtn.classList.remove("hidden");
    }
}

// ==============================
// Catch System
// ==============================
function catchFish() {
    if (!game.currentFish || game.currentFish.alive) return;

    // --- PEMBATAS TAS LANGSUNG DI SINI ---
    if (typeof player !== "undefined" && Array.isArray(player.inventory)) {
        const maxSlots = player.inventoryMax || 10;
        if (player.inventory.length >= maxSlots) {
            alert("⚠️ Inventory Penuh! Kosongkan tasmu di toko.");
            game.currentFish = null;
            resetHook();
            if(pullBtn) pullBtn.classList.add("hidden");
            if(castBtn) castBtn.classList.remove("hidden");
            return; // Hentikan di sini!
        }
    }
    // -------------------------------------

    const fish = { ...game.currentFish };

    if (typeof addFish === "function") addFish(fish);
    if (typeof addFishStats === "function") addFishStats(fish);
    if (typeof addMoney === "function") addMoney(fish.price);
    if (typeof addXP === "function") addXP(fish.xp || 10);

    if (typeof unlockAchievement === "function" && typeof player !== "undefined") {
        if (player.totalFish === 1) unlockAchievement("Strike Pertama");
        if (player.totalFish === 10) unlockAchievement("Pemancing Pemula");
    }

    if (catchSound) { catchSound.currentTime = 0; catchSound.play().catch(()=>{}); }
    showCatchResult(fish);

    game.currentFish = null;
    if(pullBtn) pullBtn.classList.add("hidden");
    if(castBtn) castBtn.classList.remove("hidden");
}

// ==============================
// UI & Loop
// ==============================
function showCatchResult(fish) {
    document.getElementById("fishName").textContent = fish.name;
    document.getElementById("fishRank").textContent = fish.rarity;
    document.getElementById("fishWeight").textContent = fish.weight + " Kg";
    document.getElementById("fishLength").textContent = fish.length + " cm";
    document.getElementById("fishPrice").textContent = "Rp " + fish.price.toLocaleString();
    document.getElementById("catchDate").textContent = new Date().toLocaleString("id-ID");
    if (typeof openCatchModal === "function") openCatchModal();
}

function checkCatch() {
    if (!hook.pulling || hook.y > 80) return;
    if (game.currentFish && game.currentFish.alive === false) catchFish();
    resetHook();
    if(castBtn) castBtn.classList.remove("hidden");
    if(pullBtn) pullBtn.classList.add("hidden");
}

function updateGame() { updateHook(); updateFish(); checkStrike(); checkCatch(); }
function gameLoop() {
    if (!game.running || game.paused) { requestAnimationFrame(gameLoop); return; }
    updateGame();
    // Update frame here...
    game.frame++;
    if (game.frame % 20 === 0) spawnBubble();
    updateBubbles();
    updateHUD();
    renderGame();
    requestAnimationFrame(gameLoop);
}

// ==============================
// Startup
// ==============================
window.addEventListener("load", () => {
    if (typeof initApp === "function") initApp();
    startCamera();
    resetHook();
    updateHUD();
    gameLoop();
    
    // Penanganan Modal
    const continueBtn = document.getElementById("continueBtn");
    const catchModal = document.getElementById("catchModal");
    if (continueBtn && catchModal) {
        continueBtn.addEventListener("click", () => {
            catchModal.style.setProperty("display", "none", "important");
        });
    }
});
