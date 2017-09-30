"use strict";

(function () {
    window.onload = function () {
        var sim = new Simulation('arena');

        var startStopButton = document.getElementById("start-stop");
        startStopButton.onclick = function() {
            if (sim.running) {
                sim.stop();
                this.value = "Start";
            } else {
                sim.start();
                this.value = "Stop";
            }
        }
    };
})();
