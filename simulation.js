/* global Konva requestAnimationFrame */

"use strict";

var Simulation = function (containerName) {
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
        fill: 'gray',
        stroke: 'black',
        strokeWidth: 4
    });


    var backgroundLayer = new Konva.Layer();
    backgroundLayer.add(backGround);
    this.stage.add(backgroundLayer);
    this.planetsLayer = new Konva.Layer();
    this.stage.add(this.planetsLayer);

    this.planetList = [{
            size: 20,
            x: 102,
            y: 150,
            dx: 0.4,
            dy: 0.1,
            mass: function () {
                return this.size * this.size;
            }
        },
        {
            size: 10,
            x: 300,
            y: 100,
            dx: -1,
            dy: 2,
            mass: function () {
                return this.size * this.size;
            }
        },
        {
            size: 5,
            x: 500,
            y: 230,
            dx: 0,
            dy: 4,
            mass: function () {
                return this.size * this.size;
            }
        }];

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

        for (var i = 0; i < this.planetList.length; ++i) {
            var circle = new Konva.Circle({
                x: this.planetList[i].x,
                y: this.planetList[i].y,
                radius: this.planetList[i].size,
                fill: 'red',
                stroke: 'black',
                strokeWidth: 4
            });
            this.planetsLayer.add(circle);
        }

        this.planetsLayer.draw();
    },

    _update: function () {
        for (let i = 0; i < this.planetList.length; ++i) {
            for (var j = i + 1; j < this.planetList.length; ++j) {
                var dd = this._computeGravitationalEffect(this.planetList[i], this.planetList[j]);

                this.planetList[i].dx -= dd.ddx / this.planetList[i].mass();
                this.planetList[i].dy -= dd.ddy / this.planetList[i].mass();

                this.planetList[j].dx += dd.ddx / this.planetList[j].mass();
                this.planetList[j].dy += dd.ddy / this.planetList[j].mass();
            }
        }


        for (let i = 0; i < this.planetList.length; ++i) {
            this.planetList[i].x += this.planetList[i].dx;
            this.planetList[i].y += this.planetList[i].dy;
        }
    },

    _squaredDistance: function (a, b) {
        var dx = a.x - b.x;
        var dy = a.y - b.y;
        return (dx * dx + dy * dy);
    },

    _computeGravitationalEffect: function (a, b) {
        var massProduct = (a.size * a.size * a.size) * (b.size * b.size * b.size);
        var gravitationalConstant = 0.0003;
        var obj = {
            ddx: (a.x - b.x) * massProduct * gravitationalConstant / this._squaredDistance(a, b),
            ddy: (a.y - b.y) * massProduct * gravitationalConstant / this._squaredDistance(a, b)
        };
        return obj;
    }
}
