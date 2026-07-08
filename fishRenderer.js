// ==========================================
// fishRenderer.js
// Crazy Fishing Simulator
// ==========================================

"use strict";

class FishRenderer {

    constructor(ctx) {

        this.ctx = ctx;

    }

    draw(fish, x, y, scale = 1) {

        const ctx = this.ctx;

        ctx.save();

        ctx.translate(x, y);

        ctx.scale(scale, scale);

        // Warna berdasarkan rarity
        let color = "#9CA3AF";

        switch (fish.rarity) {

            case "Common":
                color = "#9CA3AF";
                break;

            case "Uncommon":
                color = "#22C55E";
                break;

            case "Rare":
                color = "#3B82F6";
                break;

            case "Epic":
                color = "#A855F7";
                break;

            case "Legendary":
                color = "#F59E0B";
                break;

            case "Mythic":
                color = "#EF4444";
                break;

        }

        // Badan ikan
        ctx.fillStyle = color;

        ctx.beginPath();

        ctx.ellipse(

            0,

            0,

            40,

            20,

            0,

            0,

            Math.PI * 2

        );

        ctx.fill();

        // Ekor
        ctx.beginPath();

        ctx.moveTo(-40, 0);

        ctx.lineTo(-60, -15);

        ctx.lineTo(-60, 15);

        ctx.closePath();

        ctx.fill();

        // Sirip atas
        ctx.beginPath();

        ctx.moveTo(-5, -15);

        ctx.lineTo(10, -30);

        ctx.lineTo(20, -15);

        ctx.closePath();

        ctx.fill();

        // Sirip bawah
        ctx.beginPath();

        ctx.moveTo(-5, 15);

        ctx.lineTo(10, 30);

        ctx.lineTo(20, 15);

        ctx.closePath();

        ctx.fill();

        // Mata
        ctx.fillStyle = "#FFFFFF";

        ctx.beginPath();

        ctx.arc(

            22,

            -5,

            5,

            0,

            Math.PI * 2

        );

        ctx.fill();

        ctx.fillStyle = "#000000";

        ctx.beginPath();

        ctx.arc(

            22,

            -5,

            2,

            0,

            Math.PI * 2

        );

        ctx.fill();

        // Mulut
        ctx.strokeStyle = "#000000";

        ctx.lineWidth = 2;

        ctx.beginPath();

        ctx.moveTo(

            35,

            4

        );

        ctx.lineTo(

            28,

            6

        );

        ctx.stroke();

        ctx.restore();

    }

}
