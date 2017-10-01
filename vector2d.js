"use strict";

var Vector2d = function (x, y) {
    this.x = x;
    this.y = y;
}

Vector2d.prototype = {
    scale: function (s) {
        return new Vector2d(this.x * s, this.y * s);
    },

    squaredNorm: function () {
        return this.x * this.x + this.y * this.y;
    },

    euclideanNorm: function () {
        return Math.sqrt(this.squaredNorm());
    },

    makeOpposite: function () {
        return this.scale(-1);
    }
}

Vector2d.sum = function (left, right) {
    return new Vector2d(left.x + right.x, left.y + right.y);
}

Vector2d.difference = function (left, right) {
    return new Vector2d(left.x - right.x, left.y - right.y);
}

Vector2d.copy = function (anything) {
    return new Vector2d(anything.x, anything.y);
}
