// ==========================================
// game.js FINAL LENGKAP UTUH - ANTI BOCOR (FIXED INVENTORY)
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

// ==============================
// Update Ikan
// ==============================
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
// Event Button
// ==============================
if(castBtn){
    castBtn.addEventListener("click", castLine);
}

if(pullBtn){
    pullBtn.addEventListener("click", pullLine);
}

// Sakelar ON/OFF Kamera
const photoBtn = document.getElementById("photoBtn") || document.getElementById("cameraBtn") || document.getElementById("toggleCameraBtn"); 

if (photoBtn) {
    photoBtn.addEventListener("click", () => {
        if (localStream) {
            stopCamera();
            photoBtn.textContent = "📷";
            console.log("Kamera dimatikan.");
        } else {
            startCamera();
            photoBtn.textContent = "📸";
            console.log("Kamera dihidupkan.");
        }
    });
}

// ==============================
// Catch System (TERINTEGRASI DAN AMAN)
// ==============================
function catchFish() {
    if (!game.currentFish || game.currentFish.alive) return false;

    // --- PERBAIKAN: PEMBATAS TAS AKTIF ---
    if (typeof player !== "undefined" && Array.isArray(player.inventory)) {
        const maxSlots = player.inventoryMax || 10;
        if (player.inventory.length >= maxSlots) {
            alert("⚠️ Inventory Penuh! Kosongkan tasmu di toko.");
            
            // Hentikan penarikan kail, paksa tombol kembali normal tanpa menambah ikan
            game.currentFish = null;
            resetHook();
            if(pullBtn) pullBtn.classList.add("hidden");
            if(castBtn) castBtn.classList.remove("hidden");
            return false; // Mengembalikan nilai false agar fungsi luar tahu tas penuh
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
        if (player.totalFish === 50) unlockAchievement("Pemancing Berpengalaman");
        if (player.totalFish === 100) unlockAchievement("Master Fishing");
    }

    if (catchSound) { catchSound.currentTime = 0; catchSound.play().catch(()=>{}); }
    showCatchResult(fish);

    game.currentFish = null;
    if(pullBtn) pullBtn.classList.add("hidden");
    if(castBtn) castBtn.classList.remove("hidden");
    
    return true; // Mengembalikan true jika penangkapan sukses
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
    
    // PERBAIKAN: Validasi hasil tangkapan sebelum mereset posisi pancingan
    if (game.currentFish && game.currentFish.alive === false) {
        const isSuccess = catchFish();
        if (!isSuccess) {
            return; // Hentikan fungsi di sini jika tas penuh agar kail tidak bocor
        }
    }
    
    resetHook();
    if(castBtn) castBtn.classList.remove("hidden");
    if(pullBtn) pullBtn.classList.add("hidden");
}

function updateGame() { updateHook(); updateFish(); checkStrike(); checkCatch(); }

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
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

// ==============================
// Air & HUD
// ==============================
function drawWaterSurface() {
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.arc(x, 80, 20, 0, Math.PI);
        ctx.fill();
    }
}

function updateHUD() {
    if (typeof updateMoney === "function") { updateMoney(); }
    if (typeof updateLevel === "function") { updateLevel(); }
    if (typeof updateXP === "function") { updateXP(); }
}

function renderGame() {
    drawBackground();
    drawWaterSurface();
    drawBubbles();
    drawFish();
    drawHook();
}

function gameLoop() {
    if (!game.running) return;
    
    if (!game.paused) {
        updateGame();
        game.frame++;
        if (game.frame % 20 === 0) {
            spawnBubble();
        }
        updateBubbles();
        updateHUD();
        renderGame();
    }
    requestAnimationFrame(gameLoop);
}

// ==============================
// Pause Saat Tab Tidak Aktif
// ==============================
document.addEventListener("visibilitychange", () => {
    game.paused = document.hidden;
});

// ==============================
// Keyboard Shortcut
// ==============================
document.addEventListener("keydown", (e) => {
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
});

// ==============================
// Autosave
// ==============================
setInterval(() => {
    if (typeof saveGame === "function") {
        saveGame();
    }
}, 30000);

// ==============================
// Startup
// ==============================
window.addEventListener("load", () => {
    if (typeof initApp === "function") initApp();
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
});
