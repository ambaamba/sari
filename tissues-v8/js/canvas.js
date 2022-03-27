function canvas0 () {
    curCanvas = document.getElementById('canvas0')
    curCtx = curCanvas.getContext('2d')
    img.src = './img/img0.png';

    let cloth = new Cloth()

    console.log("Loaded canvas ", 0)

    ; (function update(time) {
        if (currentProduct != 0) return;

        curCtx.clearRect(0, 0, curCanvas.width, curCanvas.height)
        cloth.update(0.016)
        window.requestAnimFrame(update)
    })(0)
}

function canvas1 () {
    curCanvas = document.getElementById('canvas1')
    curCtx = curCanvas.getContext('2d')
    img.src = './img/img1.png';

    let cloth = new Cloth()

    console.log("Loaded canvas ", 1)

    ; (function update(time) {
        if (currentProduct != 1) return;

        curCtx.clearRect(0, 0, curCanvas.width, curCanvas.height)
        cloth.update(0.016)
        window.requestAnimFrame(update)
    })(0)
}

function canvas2 () {
    curCanvas = document.getElementById('canvas2')
    curCtx = curCanvas.getContext('2d')
    img.src = './img/img2.png';

    let cloth = new Cloth()

    console.log("Loaded canvas ", 2)

    ; (function update(time) {
        if (currentProduct != 2) return;

        curCtx.clearRect(0, 0, curCanvas.width, curCanvas.height)
        cloth.update(0.016)
        window.requestAnimFrame(update)
    })(0)
}

function canvas3 () {
    curCanvas = document.getElementById('canvas3')
    curCtx = curCanvas.getContext('2d')
    img.src = './img/img0.png';

    let cloth = new Cloth()

    console.log("Loaded canvas ", 3)

    ; (function update(time) {
        if (currentProduct != 3) return;

        curCtx.clearRect(0, 0, curCanvas.width, curCanvas.height)
        cloth.update(0.016)
        window.requestAnimFrame(update)
    })(0)
}

function canvas4 () {
    curCanvas = document.getElementById('canvas4')
    curCtx = curCanvas.getContext('2d')
    img.src = './img/img2.png';

    let cloth = new Cloth()

    console.log("Loaded canvas ", 4)

    ; (function update(time) {
        if (currentProduct != 4) return;

        curCtx.clearRect(0, 0, curCanvas.width, curCanvas.height)
        cloth.update(0.016)
        window.requestAnimFrame(update)
    })(0)
}

function canvas5 () {
    curCanvas = document.getElementById('canvas5')
    curCtx = curCanvas.getContext('2d')
    img.src = './img/img2.png';

    let cloth = new Cloth()

    console.log("Loaded canvas ", 5)

    ; (function update(time) {
        if (currentProduct != 5) return;

        curCtx.clearRect(0, 0, curCanvas.width, curCanvas.height)
        cloth.update(0.016)
        window.requestAnimFrame(update)
    })(0)
}

function canvas6 () {
    curCanvas = document.getElementById('canvas6')
    curCtx = curCanvas.getContext('2d')
    img.src = './img/img3.png';

    let cloth = new Cloth()

    console.log("Loaded canvas ", 6)

    ; (function update(time) {
        if (currentProduct != 6) return;

        curCtx.clearRect(0, 0, curCanvas.width, curCanvas.height)
        cloth.update(0.016)
        window.requestAnimFrame(update)
    })(0)
}
function canvas7 () {
    curCanvas = document.getElementById('canvas7')
    curCtx = curCanvas.getContext('2d')
    img.src = './img/img3.png';

    let cloth = new Cloth()

    console.log("Loaded canvas ", 7)

    ; (function update(time) {
        if (currentProduct != 7) return;

        curCtx.clearRect(0, 0, curCanvas.width, curCanvas.height)
        cloth.update(0.016)
        window.requestAnimFrame(update)
    })(0)
}
function canvas8 () {
    curCanvas = document.getElementById('canvas8')
    curCtx = curCanvas.getContext('2d')
    img.src = './img/img3.png';

    let cloth = new Cloth()

    console.log("Loaded canvas ", 8)

    ; (function update(time) {
        if (currentProduct != 8) return;

        curCtx.clearRect(0, 0, curCanvas.width, curCanvas.height)
        cloth.update(0.016)
        window.requestAnimFrame(update)
    })(0)
}