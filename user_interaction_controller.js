"use strict";

var UserInteractionController = function (simulation) {

    this.simulation = simulation;
    this.stage = simulation.stage;
    this.userInteractionLayer = simulation.userInteractionLayer;

    const states = {
        ADDING_BODY: "Adding body",
        ADDING_VELOCITY: "Adding velocity",
        NOTHING: "Nothing",
    }

    this.state = states.NOTHING;

    this.getPosition = function() {
        return Vector2d.copy(this.stage.getPointerPosition())
    };

    this.stage.on('contentMousedown', () => {

        if (this.state == states.NOTHING) {
            this.state = states.ADDING_BODY;
            this.tempCircleCener = this.getPosition();
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
        } else {
            this.state = states.NOTHING;
            let velocityVector =
                Vector2d.difference(
                    this.getPosition(),
                    this.tempCircleCener)
            this.simulation.simulationState.bodies.push(
                new Body(
                    Vector2d.copy(this.tempCircleCener),
                    velocityVector.scale(0.01),
                    this.radius));
            this.userInteractionLayer.destroyChildren();
            this.userInteractionLayer.draw();
        }
    });

    this.stage.on('contentMousemove', () => {
        if (this.state == states.NOTHING)
            return;
        if (this.state == states.ADDING_BODY) {
            let edgePoint = this.getPosition();
            this.radius =
                Vector2d.difference(edgePoint, this.tempCircleCener).euclideanNorm();
            this.temporaryCircle.setAttr('radius', this.radius);
        } else {
            let edgePoint = this.getPosition();
            this.temporaryArrow.setAttr(
                'points', [this.tempCircleCener.x,
                           this.tempCircleCener.y,
                           edgePoint.x,
                           edgePoint.y]);
            this.temporaryArrow.draw();
        }
        this.userInteractionLayer.draw()
    });

    this.stage.on('contentMouseup', () => {
        if (this.state != states.ADDING_BODY)
            return;
        this.state = states.ADDING_VELOCITY
        this.tempArrowCener = this.getPosition();
        this.temporaryArrow = new Konva.Arrow({
            points: [this.tempCircleCener.x,
                     this.tempCircleCener.y,
                     this.tempCircleCener.x,
                     this.tempCircleCener.y],
            pointerLength: 10,
            pointerWidth: 10,
            fill: 'white',
            stroke: 'white',
            strokeWidth: 4
        });
        this.userInteractionLayer.add(this.temporaryArrow);
    });
}
