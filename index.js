function fitElementToParent(el, padding) {
  var timeout = null;
  function resize() {
    if (timeout) clearTimeout(timeout);
    anime.set(el, { scale: 1 });
    var pad = padding || 0;
    var parentEl = el.parentNode;
    var elOffsetWidth = el.offsetWidth - pad;
    var parentOffsetWidth = parentEl.offsetWidth;
    var ratio = parentOffsetWidth / elOffsetWidth;
    timeout = setTimeout(anime.set(el, { scale: ratio }), 10);
  }
  resize();
  window.addEventListener("resize", resize);
}

var logoAnimation = (function () {
  var logoAnimationEl = document.querySelector(".logo-animation");
  var logoEl = logoAnimationEl.querySelectorAll(".logo");
  fitElementToParent(logoAnimationEl);

  function createKeyframes(value) {
    var keyframes = [];
    for (var i = 0; i < 30; i++) keyframes.push({ value: value });
    return keyframes;
  }

  function animateShape(el) {
    var animation = anime
      .timeline({
        targets: el,
        duration: function () {
          return anime.random(600, 1000);
        },
        complete: function (anim) {
          animateShape(anim.animatables[0].target);
        },
      })
      .add(
        {
          translateX: createKeyframes(function () {
            return anime.random(200, 1000);
          }),
          translateY: createKeyframes(function () {
            return anime.random(200, 500);
          }),
          rotate: createKeyframes(function () {
            return anime.random(0, 360);
          }),
          scale: createKeyframes(function () {
            return anime.random(1, 20);
          }),
        },
        0
      );
  }

  for (var i = 0; i < logoEl.length; i++) {
    animateShape(logoEl[i]);
  }
})();
