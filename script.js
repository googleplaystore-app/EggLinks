(function () {
  'use strict';

  var APK_URL = 'assets/apk/app-release.apk';
  var SCREENSHOTS_BASE = 'assets/screenshots/';
  var SCREENSHOT_NAMES = ['1.png', '2.png', '3.png', '4.png', '5.png'];

  function initInstallButton() {
    var apkUrl = APK_URL;
    function doInstall() {
      var a = document.createElement('a');
      a.href = apkUrl;
      a.download = 'app-release.apk';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    var btn = document.getElementById('installBtn');
    if (btn) btn.addEventListener('click', doInstall);
    var btnDesktop = document.getElementById('installBtnDesktop');
    if (btnDesktop) btnDesktop.addEventListener('click', doInstall);
  }

  function loadScreenshots() {
    var track = document.getElementById('screenshotsTrack');
    if (!track) return;

    var placeholderSvg = 'data:image/svg+xml,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="355" viewBox="0 0 200 355"><rect fill="%23f1f3f4" width="200" height="355"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%239aa0a6" font-family="sans-serif" font-size="13">Screenshot</text></svg>'
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

  initInstallButton();
  loadScreenshots();
  initSwipeableScreenshots();
})();
