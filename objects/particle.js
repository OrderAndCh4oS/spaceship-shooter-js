class Particle {
    constructor(deltaTime, canvas, context, id, {x = 0, y = 0, speed = 1, radius = 1, angle = 0, friction = 1, colour = '#ccc'}) {
        this._canvas = canvas;
        this._context = context;
        this._deltaTime = deltaTime;
        this._id = id;
        this._radius = radius;
        this._colour = colour;
        this._position = new Vector(x, y);
        this._speed = speed;
        this._velocity = new Vector(0, 0);
        this._velocity.length = 0;
        this._velocity.angle = angle;
        this._vector = new Vector(1, 0);
        this._vector.angle = angle;
        this._friction = friction;
        this._remove = false;
    }

    get remove() {
        return this._remove;
    }

    get id() {
        return this._id;
    }

    get colour() {
        return this._colour;
    }

    get position() {
        return this._position;
    }

    get radius() {
        return this._radius;
    }

    update() {
        this.move();
    }

    move() {
        let distanceByDeltaTime = this._velocity.multiply(this._deltaTime.getTime());
        this._velocity.multiply(this._friction)
        this._position.addTo(distanceByDeltaTime);
    }

    removeParticle() {
        this._remove = true;
    }

    draw() {
        this._context.beginPath();
        this._context.arc(
            this._position.x,
            this._position.y,
            this._radius,
            0,
            2 * Math.PI
        );
        this._context.fillStyle = this._colour;
        this._context.fill();
        this._context.strokeStyle = this._colour;
        this._context.stroke();
    }

    angleTo(p2) {
        return Math.atan2(
            p2.position.y - this.position.y,
            p2.position.x - this.position.x
        );
    }

    distanceTo(p2) {
        const dx = p2.position.x - this.position.x,
            dy = p2.position.y - this.position.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    handleCollision() {
        console.log('collision');
    }

    handleOffCanvas() {
        console.log('off-canvas')
    }
}
