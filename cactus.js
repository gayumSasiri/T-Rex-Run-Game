import { setCustomProperty } from "./updateCustomProperty.js";

const SPEED = 0.0;
const CACTUS_INTERVAL_MIN = 500;
const CACTUS_INTERVAL_MAX = 2000;
const worldElm = document.querySelector("[data-world]");

let nextCactusTime;
export function setUpCactus() {
    nextCactusTime = CACTUS_INTERVAL_MIN;
}

export function updateCactus(delta, speedScale) {
    document.querySelectorAll("[data-cactus]");

    if(nextCactusTime <= 0) {
        createCactus();
        nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale;
    }
    nextCactusTime -= delta;
}

function createCactus() {
    const cactus = document.createElement("div");
    cactus.dataset.cactus = true;
    cactus.src = `imgs/cactus.png`;
    cactus.classList.add("cactus");
    setCustomProperty(cactus, "--left", 100);
    worldElm.append("cactus");
}

function randomNumberBetween(min,max) {
    
}