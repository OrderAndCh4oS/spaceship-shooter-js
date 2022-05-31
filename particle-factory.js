class ParticleFactory {
    constructor(deltaTime, canvas, context) {
        this._deltaTime = deltaTime;
        this._canvas = canvas;
        this._context = context;
    }

    make(particle, params) {
        const id = 1;
        return new particle(this._deltaTime, this._canvas, this._context, id, params)
    }
}
