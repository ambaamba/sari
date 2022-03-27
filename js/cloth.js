const physics_accuracy = 20,
    mouse_influence = 10,
    mouse_cut = 6,
    gravity = 1200,
    cloth_height = 40,
    cloth_width = 120,
    start_y = 10,
    spacing = 7,
    tear_distance = 60;

var Point = function (x, y) {
    this.x = x;
    this.y = y;
    this.px = x;
    this.py = y;
    this.vx = 0;
    this.vy = 0;
    this.pin_x = null;
    this.pin_y = null;
    this.constraints = [];
    //added - remember where this point was originally so we can get the right bit of the img
    this.origx = x;
    this.origy = y;
};

Point.prototype.update = function (delta) {

    if (mouse.down) {

        var diff_x = this.x - mouse.x,
            diff_y = this.y - mouse.y,
            dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y);

        if (mouse.button == 1) {

            if (dist < mouse_influence) {
                this.px = this.x - (mouse.x - mouse.px) * 1.8;
                this.py = this.y - (mouse.y - mouse.py) * 1.8;
            }

        } else if (dist < mouse_cut) this.constraints = [];
    }

    this.add_force(0, gravity);

    delta *= delta;
    nx = this.x + ((this.x - this.px) * .99) + ((this.vx / 2) * delta);
    ny = this.y + ((this.y - this.py) * .99) + ((this.vy / 2) * delta);

    this.px = this.x;
    this.py = this.y;

    this.x = nx;
    this.y = ny;

    this.vy = this.vx = 0
};

Point.prototype.draw = function (ctx, canvas) {

    if (this.constraints.length <= 0) return;

    var i = this.constraints.length;
    while (i--) this.constraints[i].draw(ctx, canvas);
};

Point.prototype.resolve_constraints = function () {

    if (this.pin_x != null && this.pin_y != null) {

        this.x = this.pin_x;
        this.y = this.pin_y;
        return;
    }

    var i = this.constraints.length;
    while (i--) this.constraints[i].resolve();

    this.x > boundsx ? this.x = 2 * boundsx - this.x : 1 > this.x && (this.x = 2 - this.x);
    this.y < 1 ? this.y = 2 - this.y : this.y > boundsy && (this.y = 2 * boundsy - this.y);
};

Point.prototype.attach = function (point) {

    this.constraints.push(
        new Constraint(this, point)
    );
};

Point.prototype.remove_constraint = function (lnk) {

    var i = this.constraints.length;
    while (i--)
        if (this.constraints[i] == lnk) this.constraints.splice(i, 1);
};

Point.prototype.add_force = function (x, y) {

    this.vx += x;
    this.vy += y;
};

Point.prototype.pin = function (pinx, piny) {
    this.pin_x = pinx;
    this.pin_y = piny;
};


var Constraint = function (p1, p2) {

    this.p1 = p1;
    this.p2 = p2;
    this.length = spacing;
};

Constraint.prototype.resolve = function () {

    var diff_x = this.p1.x - this.p2.x,
        diff_y = this.p1.y - this.p2.y,
        dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y),
        diff = (this.length - dist) / dist;

    if (dist > tear_distance) this.p1.remove_constraint(this);

    var px = diff_x * diff * 0.7;
    var py = diff_y * diff * 0.5;

    this.p1.x += px;
    this.p1.y += py;
    this.p2.x -= px;
    this.p2.y -= py;
};

let num = 0;
Constraint.prototype.draw = function (ctx, canvas) {
    ctx.drawImage(canvas, this.p1.origx, this.p1.origy, spacing, spacing, this.p1.x, this.p1.y, spacing + 1, spacing + 1);
};

var Cloth = function () {
    this.points = [];

    var start_x = canvas.width / 2 - cloth_width * spacing / 2;
    // alert(start_x);

    for (var y = 0; y <= cloth_height; y++) {

        for (var x = 0; x <= cloth_width; x++) {

            var p = new Point(start_x + x * spacing, start_y + y * spacing);

            x != 0 && p.attach(this.points[this.points.length - 1]);
            y == 0 && p.pin(p.x, p.y);
            y != 0 && p.attach(this.points[x + (y - 1) * (cloth_width + 1)])

            this.points.push(p);
        }
    }
};

Cloth.prototype.update = function () {
    var i = physics_accuracy;

    while (i--) {
        var p = this.points.length;
        while (p--) this.points[p].resolve_constraints();
    }

    i = this.points.length;
    while (i--) this.points[i].update(.016);
};

Cloth.prototype.draw = function (ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    var i = this.points.length;
    while (i--) this.points[i].draw(ctx, canvas);

    ctx.stroke();
};

function update(ctx, canvas, cloth) {
    cloth.update();
    cloth.draw(ctx, canvas);

    requestAnimFrame(update(ctx, canvas, cloth));
}