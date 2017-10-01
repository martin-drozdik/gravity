"use strict";

var Body = function (position, velocity, radius) {
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
}

var SimulationState = function (bodies) {
    this.bodies = bodies;
}

var makeStartingState = function () {
    var bodies = [
            new Body(
            new Vector2d(102, 150),
            new Vector2d(0.4, 0.1),
            20),
            new Body(
            new Vector2d(300, 100),
            new Vector2d(-1, 2),
            10),
            new Body(
            new Vector2d(500, 230),
            new Vector2d(0, 4),
            5)];
    return new SimulationState(bodies);
}
