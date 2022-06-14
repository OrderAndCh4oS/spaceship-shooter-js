class ParticleManager {
    _particles = [];
    _canvas;

    constructor(canvas) {
        this._canvas = canvas;
    }

    reset() {
        this._particles = [];
    }

    add(particle) {
        this._particles.push(particle);
    }

    update(isDarkMode) {
        this._particles = this._particles
            .filter(p => {
                p.draw(isDarkMode);
                p.update();
                this.collisionDetection(p);
                if(this.isOffCanvas(p)) p.handleOffCanvas();

                return !p.remove
            });
    }

    collisionDetection(particle) {
        for(const p2 of this._particles) {
            if(this.didCollide(particle, p2)) particle.handleCollision(p2);
        }
    }

    isOffCanvas(particle) {
        return (
            particle.position.x > (this._canvas.width + particle.radius) ||
            particle.position.x < (0 - particle.radius) ||
            particle.position.y > (this._canvas.height + particle.radius) ||
            particle.position.y < (0 - particle.radius)
        );
    }

    didCollide(p1, p2) {
        return p1.id !== p2.id && p1.distanceTo(p2) < p1.radius + p2.radius;
    }
}
