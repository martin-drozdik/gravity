"use strict";

var Simulation = function (containerName, simulationState) {
    this.simulationState = simulationState;

    this.stage = new Konva.Stage({
        container: containerName,
        width: 800,
        height: 800
    });

    var backGround = new Konva.Rect({
        x: 0,
        y: 0,
        width: 1600,
        height: 1600,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 4
    });

    var backgroundLayer = new Konva.Layer();
    backgroundLayer.add(backGround);
    this.stage.add(backgroundLayer);
    this.planetsLayer = new Konva.Layer();
    this.stage.add(this.planetsLayer);
    this.userInteractionLayer = new Konva.Layer();
    this.stage.add(this.userInteractionLayer);

    this.start();
}

Simulation.prototype = {
    tick: function () {
        if (!this.running) {
            return;
        }
        this._update();
        this._render();
        requestAnimationFrame(this.tick.bind(this));
    },

    start: function () {
        this.running = true;
        this.tick();
    },

    stop: function () {
        this.running = false;
    },

    _render: function () {
        this.planetsLayer.removeChildren();

        let bodies = this.simulationState.bodies;
        for (var i = 0; i < bodies.length; ++i) {
            var circle = new Konva.Circle({
                x: bodies[i].position.x,
                y: bodies[i].position.y,
                radius: bodies[i].radius,
                fill: 'red',
                stroke: 'black',
                strokeWidth: 4
            });
            this.planetsLayer.add(circle);
        }

        this.planetsLayer.draw();
    },

    _update: function () {
        Physics.executeGravityInteraction(this.simulationState.bodies);
    },
}
