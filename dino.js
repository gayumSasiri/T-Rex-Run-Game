import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js";

const dinoElm = document.querySelector("[data-dino]");
const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const DINO_FRAME_COUNT = 2;
const FRAME_TIME = 100;

let isJumping;
let dinoFrame;
let currentFrameTime;
let yVelocity;
export function setUpDino() {
    isJumping = false;
    dinoFrame = 0;
    currentFrameTime = 0;
    yVelocity = 0;
    setCustomProperty(dinoElm, "--bottom", 0)
    document.removeEventListener("keydown", onJump);
    document.addEventListener("keydown", onJump);
}

export function updateDino(delta, speedScale) {
    handleRun(delta,speedScale);
    handleJump(delta);
}

export function getDinoRect() {
    return dinoElm.getBoundingClientRect();
}

export function setDinoLose() {
    dinoElm.src = "imgs/dino-lose.png";
}

function handleRun(delta,speedScale) {
    if(isJumping) {
        dinoElm.src = `imgs/dino-stationary.png`;
        return;
    }

    if (currentFrameTime >= FRAME_TIME){
        dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
        dinoElm.src = `imgs/dino-run-${dinoFrame}.png`;
        currentFrameTime -= FRAME_TIME;
    }
    currentFrameTime += delta * speedScale;
}

function handleJump(delta) {
    if(!isJumping) return;

    incrementCustomProperty(dinoElm, "--bottom", yVelocity * delta);
    
    if (getCustomProperty(dinoElm, "--bottom") <= 0) {
        setCustomProperty(dinoElm, "--bottom", 0);
        isJumping = false;
    }

    yVelocity -= GRAVITY * delta;
}

function onJump(e) {
    if (e.code !== "Space" || isJumping) return;

    yVelocity = JUMP_SPEED;
    isJumping = true;
}