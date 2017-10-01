"use strict";

var UserInteractionController = function (simulation) {

    this.simulation = simulation;
    this.stage = simulation.stage;
    this.userInteractionLayer = simulation.userInteractionLayer;

    this.addingBody = false;
    this.addingVelocity = false;

    this.stage.on('contentMousedown', () => {
        this.addingBody = true;
        this.tempCircleCener = Vector2d.copy(this.stage.getPointerPosition());
        this.temporaryCircle = new Konva.Circle({
            x: this.tempCircleCener.x,
            y: this.tempCircleCener.y,
            radius: 10,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4
        });
        this.userInteractionLayer.add(this.temporaryCircle);
        this.temporaryCircle.draw();
    });

    this.stage.on('contentMousemove', () => {
        if (!this.addingBody)
            return;
        let edgePoint = Vector2d.copy(this.stage.getPointerPosition());
        this.radius = Vector2d.difference(edgePoint, this.tempCircleCener).euclideanNorm();
        this.temporaryCircle.setAttr('radius', this.radius);
        this.userInteractionLayer.draw()
    });

    this.stage.on('contentMouseup', () => {
        this.addingBody = false;
        this.simulation.simulationState.bodies.push(
            new Body(
                Vector2d.copy(this.tempCircleCener),
                new Vector2d(0, 0),
                this.radius));
        this.userInteractionLayer.destroyChildren();
        this.userInteractionLayer.draw();
    });
}
