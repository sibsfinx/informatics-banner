'use strict';

import './styles/styles.sass';

(function() {
  const times = new Array();
  let fps;
  let avgFps;
  let fpsSum = 0;
  let avgCounter = 0;
  let checkFps = true;

  function refreshLoop() {
    if (!checkFps) return false;
    window.requestAnimationFrame(() => {
      const now = performance.now();
      while (times.length > 0 && times[0] <= now - 1000) {
        times.shift();
      }
      times.push(now);
      fps = times.length;
      avgCounter++;
      fpsSum = fpsSum + fps;
      avgFps = fpsSum/avgCounter;
      console.log(avgFps);
      refreshLoop();
    });
  }

  refreshLoop();
  setTimeout(() => {
    checkFps = false;
  }, 3000);

})();
