class DroneManager {
    _canvas;
    _context;
    _drones = [];

    constructor(canvas, context) {
        this._canvas = canvas
        this._context = context
    }

    get drones() {
        return this._drones;
    }

    reset() {
        this._drones = [];
    }

    add(drone) {
        this._drones.push(drone);
    }

    update(isDarkMode) {
        this._drones = shuffle(this._drones);
        this._drones = this._drones.map(d => {
            d.update();
            this._returnToCanvas(d);
            d.draw(this._context, isDarkMode);
            return d;
        });
    }
}
