(function () {
  'use strict';

  var SCREENSHOTS_BASE = 'assets/screenshots/';
  var SCREENSHOT_NAMES = ['1.png', '2.png', '3.png', '4.png', '5.png'];

  const installBtn = document.getElementById('installBtn');

installBtn.addEventListener('click', () => {
  installBtn.innerText = "Downloading…";
  installBtn.style.backgroundColor = "#4CAF50"; // optional: change color
});

  function loadScreenshots() {
    var track = document.getElementById('screenshotsTrack');
    if (!track) return;

    var placeholderSvg = 'data:image/svg+xml,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="355" viewBox="0 0 200 355"><rect fill="%23e8eaed" width="200" height="355"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%239aa0a6" font-family="sans-serif" font-size="14">Screenshot</text></svg>'
    );

    SCREENSHOT_NAMES.forEach(function (name, index) {
      var src = SCREENSHOTS_BASE + name;
      var div = document.createElement('div');
      div.className = 'screenshot-item';
      var img = document.createElement('img');
      img.src = src;
      img.alt = 'Screenshot ' + (index + 1);
      img.loading = 'lazy';
      img.onerror = function () {
        img.src = placeholderSvg;
        img.alt = 'Screenshot ' + (index + 1) + ' placeholder';
      };
      div.appendChild(img);
      track.appendChild(div);
    });
  }

  function initSwipeableScreenshots() {
    var wrapper = document.getElementById('screenshotsWrapper');
    var track = document.getElementById('screenshotsTrack');
    if (!wrapper || !track) return;

    var startX = 0;
    var scrollLeft = 0;

    wrapper.addEventListener('touchstart', function (e) {
      startX = e.touches[0].pageX - wrapper.offsetLeft;
      scrollLeft = wrapper.scrollLeft;
    }, { passive: true });

    wrapper.addEventListener('touchmove', function (e) {
      var x = e.touches[0].pageX - wrapper.offsetLeft;
      var walk = (x - startX) * 1.2;
      wrapper.scrollLeft = scrollLeft - walk;
    }, { passive: true });
  }

  loadScreenshots();
  initSwipeableScreenshots();
})();
