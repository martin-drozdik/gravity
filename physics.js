"use strict";

var Physics = {};

Physics.bodyDensity = 1.0;

Physics.bodyMass = function (body) {
    return Math.pow(body.radius, 3) * this.bodyDensity;
}

Physics.updatePosition = function (body) {
    body.position = Vector2d.sum(body.position, body.velocity);
}

Physics.gravitationConstant = 0.001;

Physics.computeForce = function (body1, body2) {
    var distance = Vector2d.difference(body1.position, body2.position);

    var factor =
        this.gravitationConstant *
        this.bodyMass(body1) *
        this.bodyMass(body2) /
        distance.squaredNorm();

    return distance.scale(factor);
}

Physics.updateVelocity = function (body, force) {
    var acceleration = force.scale(1.0 / this.bodyMass(body));
    body.velocity = Vector2d.sum(body.velocity, acceleration);
}

Physics.executeGravityInteraction = function (bodies) {
    for (let i = 0; i < bodies.length; ++i) {
        for (let j = i + 1; j < bodies.length; ++j) {
            let force = this.computeForce(bodies[i], bodies[j]);
            this.updateVelocity(bodies[i], force.makeOpposite());
            this.updateVelocity(bodies[j], force);
        }
    }

    bodies.forEach(body => {this.updatePosition(body)});
}
