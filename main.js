const TAU = Math.PI * 2;

let canvas = document.getElementById('canvas'),
    fpsInterval,
    now,
    elapsed,
    then,
    startTime,
    fps = 30,
    play = true,
    iteration = 0,
    throttled = false,
    timeout = null,
    width,
    height,
    diagonalLength,
    context = canvas.getContext('2d')
;

width = canvas.width = window.innerWidth;
height = canvas.height = window.innerHeight;
const colourIndex = ~~map(fxrand(), 0, 1, 0, colours.length, 1, Ease.EASE_OUT);
const colourSet = colours[colourIndex];
const selectedColours = shuffle(colourSet.colours);
const isDarkMode = fxrand() > 0.5;
let background = isDarkMode
    ? colourSet.black
    : colourSet.white;

const controls = new Controls();
const deltaTime = new DeltaTime();
const particleFactory = new ParticleFactory(deltaTime, canvas, context);
const particleManager = new ParticleManager(canvas, context);
const player = particleFactory.make(Drone, {
    x: width / 2,
    y: height - 100,
    speed: 1,
    turningSpeed: 0.1,
    angle: 0,
    black: colourSet.black,
    white: colourSet.white
});

window.$fxhashFeatures = {
    'Colour': colourSet.name,
    'Mode': isDarkMode ? 'Dark' : 'Light'
};

window.onclick = function(event) {
    initialise();
    update();
};

window.onkeyup = function(e) {

};

window.onresize = function() {
    clearTimeout(timeout);
    timeout = setTimeout(resizeHandler, 100);
    if(throttled) return;
    resizeHandler();
    throttled = true;
    setTimeout(function() {
        throttled = false;
    }, 250);
};

window.onload = function() {
    initialise();
    startAnimating();
};

function resizeHandler() {
    initialise();
    update();
}

function initialise() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    diagonalLength = Math.sqrt(width * width + height * height);
    particleManager.reset();
    particleManager.add(player);
}

function startAnimating() {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    render();
}

function update() {
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);
    if(controls.w) {
        player.startThrusting(1);
    } else {
        if(player.isThrusting()) player.stopThrusting();
    }
    if(controls.a) {
        player.turnLeft();
    }
    if(controls.d) {
        player.turnRight();
    }
    if(controls.space) {
        // fire
    }
    particleManager.update(isDarkMode);
}

function render() {
    requestAnimationFrame(render);
    now = Date.now();
    elapsed = now - then;
    if(elapsed <= fpsInterval) return;
    then = now - (elapsed % fpsInterval);
    if(!play) return;
    update();
    deltaTime.update();
    iteration++;
}

function shuffle(arr) {
    let randomizedArray = [];
    let array = arr;
    while(array.length !== 0) {
        let rIndex = Math.floor(array.length * fxrand());
        randomizedArray.push(array[rIndex]);
        array.splice(rIndex, 1);
    }
    return randomizedArray;
}
