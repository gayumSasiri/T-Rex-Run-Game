import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js";

const SPEED = 0.05;
const groundElms = document.querySelectorAll("[data-ground]");

export function setUpGround() {
    setCustomProperty(groundElms[0], "--left", 0);
    setCustomProperty(groundElms[1], "--left", 300);
}

export function updateGround(delta, speedScale) {
    groundElms.forEach(ground => {
        incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1);

        if(getCustomProperty(ground, "--left") <= -300){
            incrementCustomProperty(ground, "--left", 600)
        }
    });
}