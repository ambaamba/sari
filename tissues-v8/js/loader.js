window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1e3 / 60)
    }

let curCanvas = document.getElementById('canvas0')
let curCtx = curCanvas.getContext('2d')

let imgCanvas = document.getElementById('canvas-ref')
let imgCtx = imgCanvas.getContext('2d')

curCanvas.width = parent.innerWidth
curCanvas.height = parent.innerHeight

// imgCanvas.width = window.innerWidth
// imgCanvas.height = window.innerHeight




// Reference image
const img = new Image();

img.onload = () => {
    imgCanvas.width = img.naturalWidth
    imgCanvas.height = img.naturalHeight
    imgCtx.clearRect(0, 0, imgCanvas.width, imgCanvas.height);
    imgCtx.drawImage(img, 0, 0);
}


curCtx.strokeStyle = '#555'

let mouse = {
    cut: 8,
    influence: 50,
    down: false,
    button: 1,
    x: 0,
    y: 0,
    px: 0,
    py: 0
}

class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.px = x
        this.py = y
        this.vx = 0
        this.vy = 0
        this.pinX = null
        this.pinY = null
        this.origx = x;
        this.origy = y;
        canvas1
        this.constraints = []
    }

    update(delta) {
        if (this.pinX && this.pinY) return this

        if (mouse.down) {
            let dx = this.x - mouse.x
            let dy = this.y - mouse.y
            let dist = Math.sqrt(dx * dx + dy * dy)

            if (mouse.button === 1 && dist < mouse.influence) {
                this.px = this.x - (mouse.x - mouse.px)
                this.py = this.y - (mouse.y - mouse.py)
            } else if (dist < mouse.cut) {
                this.constraints = []
            }
        }

        this.addForce(0, gravity)

        let nx = this.x + (this.x - this.px) * friction + this.vx * delta
        let ny = this.y + (this.y - this.py) * friction + this.vy * delta

        this.px = this.x
        this.py = this.y

        this.x = nx
        this.y = ny

        this.vy = this.vx = 0

        if (this.x >= curCanvas.width) {
            this.px = curCanvas.width + (curCanvas.width - this.px) * bounce
            this.x = curCanvas.width
        } else if (this.x <= 0) {
            this.px *= -1 * bounce
            this.x = 0
        }

        if (this.y >= curCanvas.height) {
            this.py = curCanvas.height + (curCanvas.height - this.py) * bounce
            this.y = curCanvas.height
        } else if (this.y <= 0) {
            this.py *= -1 * bounce
            this.y = 0
        }

        return this
    }

    draw() {
        let i = this.constraints.length
        while (i--) this.constraints[i].draw()
    }

    resolve() {
        if (this.pinX && this.pinY) {
            this.x = this.pinX
            this.y = this.pinY
            return
        }

        this.constraints.forEach((constraint) => constraint.resolve())
    }

    attach(point) {
        this.constraints.push(new Constraint(this, point))
    }

    free(constraint) {
        this.constraints.splice(this.constraints.indexOf(constraint), 1)
    }

    addForce(x, y) {
        this.vx += x
        this.vy += y
    }

    pin(pinx, piny) {
        this.pinX = pinx
        this.pinY = piny
    }
}

class Constraint {
    constructor(p1, p2) {
        this.p1 = p1
        this.p2 = p2
        this.length = spacing
    }

    resolve() {
        let dx = this.p1.x - this.p2.x
        let dy = this.p1.y - this.p2.y
        let dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < this.length) return

        let diff = (this.length - dist) / dist

        if (dist > tearDist) this.p1.free(this)

        let mul = diff * 0.5 * (1 - this.length / dist)

        let px = dx * mul
        let py = dy * mul

        !this.p1.pinX && (this.p1.x += px)
        !this.p1.pinY && (this.p1.y += py)
        !this.p2.pinX && (this.p2.x -= px)
        !this.p2.pinY && (this.p2.y -= py)

        return this
    }

    draw() {
        curCtx.drawImage(imgCanvas, this.p1.origx, this.p1.origy, 
            spacing, spacing, this.p1.x, this.p1.y, spacing + 1, spacing + 1);
    }
}

class Cloth {
    constructor() {
        this.points = []

        let startX = curCanvas.width / 2 - (clothWidth * spacing / 2)
        
        console.log("Start x", startX);
        for (let y = 0; y <= clothHeight; y++) {
            for (let x = 0; x <= clothWidth; x++) {
                let point = new Point(startX + x * spacing, 5 + y * spacing)
                y === 0 && point.pin(point.x, point.y)
                x !== 0 && point.attach(this.points[this.points.length - 1])
                y !== 0 && point.attach(this.points[x + (y - 1) * (clothWidth + 1)])

                this.points.push(point)
            }
        }
    }

    update(delta) {
        let i = accuracy

        while (i--) {
            this.points.forEach((point) => {
                point.resolve()
            })
        }

        curCtx.beginPath()
        this.points.forEach((point) => {
            point.update(delta * delta).draw()
        })
        curCtx.stroke()
    }
}

function setMouse(e) {
    if (curCanvas === null) return;

    let rect = curCanvas.getBoundingClientRect()
    mouse.px = mouse.x
    mouse.py = mouse.y
    mouse.x = e.clientX - rect.left * 0.5
    mouse.y = e.clientY - rect.top
}

function bindEvents(c) {
    if (curCanvas === null) return;

    c.onmousedown = (e) => {
        mouse.button = e.which
        mouse.down = true
        setMouse(e)
    }
    c.onmousemove = setMouse
    c.onmouseup = () => (mouse.down = false)
    c.oncontextmenu = (e) => e.preventDefault()
}

function load_canvas(id) {
    console.log("Loading canvas ", id);
    switch(id) {
        case 0:
            canvas0();
            break;
        case 1:
            canvas1();
            break;
        case 2:
            canvas2();
            break;
        default:
            break;
    }
    console.log("Binding mouse events");
    bindEvents(curCanvas)
}

window.onload = function () {
    load_canvas(0) // Ne pas modifier
}