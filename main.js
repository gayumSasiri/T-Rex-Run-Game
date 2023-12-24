import { setUpGround, updateGround } from './ground.js';
import { setUpDino, updateDino } from './dino.js';
import { setUpCactus, updateCactus } from './cactus.js';

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCERESE = 0.00001;

const worldElm = document.querySelector("[data-world]");
const scoreElm = document.querySelector("[data-score]");
const startScreenElm = document.querySelector("[data-start-screen]");


setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);
document.addEventListener("keydown", handleStart, { once: true });

setUpGround();
let lastTime;
let speedScale;
let score;

function update(time){
    if( lastTime == null) {
        lastTime = time;
        window.requestAnimationFrame(update);
        return;
    }
    const delta = time - lastTime;

    updateGround(delta, speedScale);
    updateDino(delta, speedScale);
    updateCactus(delta,speedScale);
    updateSpeedScale(delta);
    updateScore(delta);

    lastTime = time;
    window.requestAnimationFrame(update);
}

function updateSpeedScale(delta) {
    speedScale += delta * SPEED_SCALE_INCERESE;
}

function updateScore(delta) {
    score  += delta * 0.01;
    scoreElm.textContent = Math.floor(score);
}

function handleStart() {
    lastTime = null;
    speedScale = 1;
    score = 0;
    setUpGround();
    setUpDino();
    startScreenElm.classList.add("hide");
    window.requestAnimationFrame(update);
}

function setPixelToWorldScale() {
    let worldToPixelScale;
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT){
        worldToPixelScale = window.innerWidth / WORLD_WIDTH;
    }else {
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
    }

    worldElm.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
    worldElm.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}
