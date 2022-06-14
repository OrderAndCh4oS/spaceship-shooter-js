class Drone extends Particle {
    kills = 0;
    thrust = null;
    thrusting = false;
    thrustPower = 0;
    turningSpeed = 1;
    colour = '#1d1d23';
    darkColour = '#e6ebec';

    constructor(deltaTime, canvas, context, id, {x, y, speed, turningSpeed, angle, black, white}) {
        super(deltaTime, canvas, context, id, {x, y, speed, angle})
        this.turningSpeed = turningSpeed;
        this.darkColour = white;
        this.colour = black;
    }

    update() {
        this.move();
        this.updateThrust();
        this.accelerate(this.thrust);
    }

    updateThrust() {
        this.thrust = new Vector(0, 0);
        if(this.isThrusting()) {
            this.thrust.length = this._speed * this.thrustPower;
        } else {
            this.thrust.length = 0;
        }
        this.thrust.angle = this._vector.angle;
    }

    accelerate(acceleration) {
        this._velocity.addTo(acceleration);
    }

    draw(isDarkMode) {
        this._context.translate(this._position.x, this._position.y);
        this._context.rotate(this._vector.angle);
        this._context.beginPath();
        this._context.moveTo(12, 0);
        this._context.lineTo(-12, -7);
        this._context.lineTo(-12, 7);
        this._context.lineTo(12, 0);
        if(this.thrusting) {
            this._context.moveTo(-12, 0);
            this._context.lineTo(-15, 0);
        }
        this._context.strokeStyle = isDarkMode ? this.darkColour : this.colour;
        this._context.stroke();
        this._context.fillStyle = isDarkMode ? this.darkColour : this.colour;
        this._context.fill();
        this._context.font = '11px Verdana';
        this._context.fillText(this.kills, -12, -12);
        this._context.fillStyle = isDarkMode ? this.colour : this.darkColour;
        this._context.fillText(this.id, -7, 5);
        this._context.setTransform(1, 0, 0, 1, 0, 0);
    }

    incrementAngle(increment) {
        this._vector.angle += increment;
    }

    startThrusting(thrustPower) {
        this.thrustPower = thrustPower;
        this.thrusting = true;
    }

    stopThrusting() {
        this.thrustPower = 0;
        this.thrusting = false;
    }

    isThrusting() {
        return this.thrusting;
    }

    turnLeft() {
        const turn = this.turningSpeed;
        this.incrementAngle(-turn);
    }

    turnRight() {
        const turn = this.turningSpeed;
        this.incrementAngle(turn);
    }

    handleOffCanvas() {
        this.returnToCanvas();
    }

    returnToCanvas() {
        if(this.position.x > this._canvas.width) {
            this.position.x = 0;
        }
        if(this.position.x < 0) {
            this.position.x = this._canvas.width;
        }
        if(this.position.y > this._canvas.height) {
            this.position.y = 0;
        }
        if(this.position.y < 0) {
            this.position.y = this._canvas.height;
        }
    }
}
