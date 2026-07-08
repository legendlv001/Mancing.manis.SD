// =======================================
// GAME LOOP
// =======================================

function updateGame() {

    if (!isFishing) return;

    switch (gameState) {

        case "CAST":

            hook.y -= hook.speed;

            if (hook.y <= waterLine) {

                hook.y = waterLine;

                gameState = "WAIT";

                waitTimer = random(1500, 4000);

            }

        break;

        case "WAIT":

            waitTimer -= 16;

            if (waitTimer <= 0) {

                hookedFish = getRandomFish();

                gameState = "HOOKED";

                challenge = 0;

                pullBtn.classList.remove("hidden");

                showNotification("🐟 Ikan menyambar!");

            }

        break;

        case "HOOKED":

        break;

        case "PULL":

            challenge -= 0.35;

            if (challenge < 0) challenge = 0;

            updateChallengeBar();

            if (challenge >= 100) {

                catchFish();

            }

            if (challenge <= 0) {

                escapeFish();

            }

        break;

    }

}

function renderGame() {

    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawWater();

    drawFishingLine();

    drawHook();

}

function gameLoop() {

    updateGame();

    renderGame();

    requestAnimationFrame(gameLoop);

}

gameLoop();

// =======================================
// IKAN BERHASIL DITANGKAP
// =======================================

function catchFish(){

    pullBtn.classList.add("hidden");

    isFishing = false;

    gameState = "IDLE";

    addMoney(hookedFish.price);

    addXP(hookedFish.xp);

    inventory.push(hookedFish);

    showCatchCard(hookedFish);

}

// =======================================
// IKAN LEPAS
// =======================================

function escapeFish(){

    pullBtn.classList.add("hidden");

    showNotification("💨 Ikan lepas!");

    resetFishing();

}

// =======================================
// RESET
// =======================================

function resetFishing(){

    isFishing = false;

    gameState = "IDLE";

    hook.x = canvas.width/2;

    hook.y = canvas.height-100;

    challenge = 0;

    updateChallengeBar();

}

// =======================================
// MINI GAME TARIK
// =======================================

function pullFishing(){

    if(gameState!="HOOKED" && gameState!="PULL") return;

    gameState="PULL";

    challenge += 12;

    if(challenge>100) challenge=100;

    updateChallengeBar();

}

// =======================================
// CHALLENGE BAR
// =======================================

function updateChallengeBar(){

    const bar=document.getElementById("challengeProgress");

    if(bar){

        bar.style.width=challenge+"%";

    }

}

// =======================================
// HASIL TANGKAPAN
// =======================================

function showCatchCard(fish){

    document.getElementById("fishEmoji").textContent=fish.emoji;

    document.getElementById("fishName").textContent=fish.name;

    document.getElementById("fishRank").textContent=fish.rank;

    document.getElementById("fishWeight").textContent=
    fish.weight+" Kg";

    document.getElementById("fishLength").textContent=
    fish.length+" cm";

    document.getElementById("fishPrice").textContent=
    "Rp "+fish.price.toLocaleString("id-ID");

    document.getElementById("catchDate").textContent=
    new Date().toLocaleString("id-ID");

    document
        .getElementById("catchModal")
        .classList
        .remove("hidden");

}

// =======================================
// RANDOM
// =======================================

function random(min,max){

    return Math.floor(Math.random()*(max-min+1))+min;

}
