// ======================================================
// LOVE HEART
// Bölüm 1
// ======================================================

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const yu = document.getElementById("yu");

function resize(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

window.addEventListener("resize",resize);

resize();



const WORD="I love you";

const TOTAL=1800;



let heart=[];

let finished=false;

let startTime=performance.now();




function heartPoint(t){

    const x=16*Math.pow(Math.sin(t),3);

    const y=

        13*Math.cos(t)
        -5*Math.cos(2*t)
        -2*Math.cos(3*t)
        -Math.cos(4*t);

    return{

        x,
        y

    };

}




function createHeart(){

    heart=[];

    const scale=Math.min(canvas.width,canvas.height)/42;

    for(let i=0;i<TOTAL;i++){

        const t=Math.random()*Math.PI*2;

        const p=heartPoint(t);

        const depth=Math.random();

        heart.push({

            x:canvas.width/2+p.x*scale*depth,

            y:canvas.height/2-p.y*scale*depth,

            visible:false,

            alpha:0,

            targetAlpha:0.55+Math.random()*0.45,

            size:10+Math.random()*4,

            twinkle:Math.random()*Math.PI*2

        });

    }

}

createHeart();
heart.sort(() => Math.random() - 0.5);
// ======================================================
// LOVE HEART
// Bölüm 2
// ======================================================

let visibleCount = 0;

function updateHeart() {

    const elapsed = (performance.now() - startTime) / 1000;

    // İlk başta yavaş, sonra giderek hızlanır
    const speed = Math.min(25 + elapsed * elapsed * 12, 220);

    visibleCount += speed / 60;

    const count = Math.min(Math.floor(visibleCount), heart.length);

    for (let i = 0; i < count; i++) {

        const p = heart[i];

        p.visible = true;

        p.alpha += (p.targetAlpha - p.alpha) * 0.08;

    }

    if (count >= heart.length) {

        finished = true;

        yu.style.opacity = 1;

    }

} 
// ======================================================
// LOVE HEART
// Bölüm 3
// ======================================================

function draw() {

    updateHeart();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = "#ff4d6d";

    for (const p of heart) {

        if (!p.visible) continue;

        ctx.globalAlpha = p.alpha;

        ctx.font = `${p.size}px Arial`;

        ctx.fillText(
            WORD,
            p.x,
            p.y
        );

    }

    ctx.globalAlpha = 1;

    requestAnimationFrame(draw);

}

draw();
