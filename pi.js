"use strict"
let targetFPS = 30;

const piDisplay = document.createElement("h1");
const iterationDisplay = document.createElement("b");
const iterationsPerFrameDisplay = document.createElement("p");
const targetFpsLabel = document.createElement("label");
const targetFPSInput = document.createElement("input");
targetFpsLabel.textContent = "Target fps (less fps = faster pi): ";
targetFpsLabel.setAttribute("for", "fpsInput");
targetFPSInput.id = "fpsInput";
targetFPSInput.type = "number";
targetFPSInput.min = 1;
targetFPSInput.value = targetFPS;
targetFPSInput.addEventListener("input", evt=>targetFPS = parseInt(targetFPSInput.value));
document.body.appendChild(piDisplay);
document.body.appendChild(iterationDisplay);
document.body.appendChild(iterationsPerFrameDisplay);
document.body.appendChild(targetFpsLabel);
document.body.appendChild(targetFPSInput);

let iterationIndex = 0;
let currentPi = 0;
let iterationsPerFrame = 10000;
const iterationsVariation = 1.1;
let lastStamp = 0;
async function findPi(frameStamp){
    const frameTime = frameStamp - lastStamp;
    lastStamp = frameStamp;

    if(frameTime>(1000/targetFPS)){
        iterationsPerFrame /= iterationsVariation;
    }else{
        iterationsPerFrame *= iterationsVariation;
    }
    iterationsPerFrame = Math.round(iterationsPerFrame);

    for(let ind = 0; ind < iterationsPerFrame; ind++){
        const res = 1 / (iterationIndex * 2 + 1);
        if(iterationIndex % 2 === 0){
            currentPi += res;
        }else{
            currentPi -= res;
        }
        
        //next
        iterationIndex += 1;
    }
    displayRes();
    requestAnimationFrame(findPi);
}
function displayRes(){
    //display
    piDisplay.textContent = currentPi*4;
    iterationDisplay.textContent = "iteration count: " + iterationIndex;
    iterationsPerFrameDisplay.textContent = "iterations per frame: " + iterationsPerFrame;
    // requestAnimationFrame(displayRes);
}

findPi();