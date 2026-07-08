// ==========================================
// fishRenderer.js
// Crazy Fishing Simulator
// Menggambar ikan langsung di Canvas
// ==========================================

class FishRenderer {

    constructor(ctx){
        this.ctx = ctx;
    }

    draw(fish,x,y,scale=1){

        this.ctx.save();

        this.ctx.translate(x,y);

        this.ctx.scale(scale,scale);

        this.drawShadow();

        this.drawTail(fish);

        this.drawBody(fish);

        this.drawFin(fish);

        this.drawEye();

        this.drawPattern(fish);

        this.ctx.restore();

    }

    drawShadow(){

        this.ctx.fillStyle="rgba(0,0,0,.18)";

        this.ctx.beginPath();

        this.ctx.ellipse(0,25,45,10,0,0,Math.PI*2);

        this.ctx.fill();

    }

    drawBody(fish){

        this.ctx.fillStyle=fish.color||"#4FC3F7";

        this.ctx.beginPath();

        this.ctx.ellipse(0,0,45,25,0,0,Math.PI*2);

        this.ctx.fill();

    }

    drawTail(fish){

        this.ctx.fillStyle=fish.color||"#4FC3F7";

        switch(fish.tail){

            case "fork":

                this.ctx.beginPath();

                this.ctx.moveTo(42,0);

                this.ctx.lineTo(70,-20);

                this.ctx.lineTo(58,0);

                this.ctx.lineTo(70,20);

                this.ctx.closePath();

                this.ctx.fill();

            break;

            case "round":

                this.ctx.beginPath();

                this.ctx.moveTo(42,0);

                this.ctx.quadraticCurveTo(72,0,60,24);

                this.ctx.quadraticCurveTo(55,0,60,-24);

                this.ctx.closePath();

                this.ctx.fill();

            break;

            default:

                this.ctx.beginPath();

                this.ctx.moveTo(42,0);

                this.ctx.lineTo(72,-18);

                this.ctx.lineTo(72,18);

                this.ctx.closePath();

                this.ctx.fill();

        }

    }

    drawFin(fish){

        this.ctx.fillStyle=this.darken(fish.color,25);

        this.ctx.beginPath();

        this.ctx.moveTo(-5,-15);

        this.ctx.lineTo(8,-42);

        this.ctx.lineTo(20,-10);

        this.ctx.closePath();

        this.ctx.fill();

    }

    drawEye(){

        this.ctx.fillStyle="#fff";

        this.ctx.beginPath();

        this.ctx.arc(-25,-5,5,0,Math.PI*2);

        this.ctx.fill();

        this.ctx.fillStyle="#111";

        this.ctx.beginPath();

        this.ctx.arc(-25,-5,2,0,Math.PI*2);

        this.ctx.fill();

    }

    drawPattern(fish){

        if(!fish.pattern) return;

        this.ctx.strokeStyle="rgba(255,255,255,.45)";

        this.ctx.lineWidth=2;

        if(fish.pattern==="stripe"){

            for(let i=-20;i<=20;i+=10){

                this.ctx.beginPath();

                this.ctx.moveTo(i,-18);

                this.ctx.lineTo(i,18);

                this.ctx.stroke();

            }

        }

        if(fish.pattern==="dots"){

            this.ctx.fillStyle="rgba(255,255,255,.6)";

            for(let i=-15;i<=20;i+=12){

                this.ctx.beginPath();

                this.ctx.arc(i,0,2.5,0,Math.PI*2);

                this.ctx.fill();

            }

        }

    }

    darken(color,amount){

        let col=color.replace("#","");

        let r=parseInt(col.substring(0,2),16);

        let g=parseInt(col.substring(2,4),16);

        let b=parseInt(col.substring(4,6),16);

        r=Math.max(0,r-amount);

        g=Math.max(0,g-amount);

        b=Math.max(0,b-amount);

        return `rgb(${r},${g},${b})`;

    }

}

// ==========================================
// Inisialisasi
// ==========================================

const renderer=new FishRenderer(ctx);

// ==========================================
// Contoh penggunaan
// ==========================================

// renderer.draw(fish,300,250,1.2);
