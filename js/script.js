// mouse follower start
gsap.set(".ball", {xPercent: -50, yPercent: -50});

const ball = document.querySelector(".ball");
const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const mouse = { x: pos.x, y: pos.y };
const speed = 0.30;

const xSet = gsap.quickSetter(ball, "x", "px");
const ySet = gsap.quickSetter(ball, "y", "px");

window.addEventListener("mousemove", e => {    
  mouse.x = e.x;
  mouse.y = e.y;  
});

gsap.ticker.add(() => {
  const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio()); 
  
  pos.x += (mouse.x - pos.x) * dt;
  pos.y += (mouse.y - pos.y) * dt;
  xSet(pos.x);
  ySet(pos.y);
});

$(function() {
  $('.mouse-follower--focused').mouseover(function() {
    gsap.to(
      '.ball',
      {
        duration: 0.5,
        width: 50,
        width: "3.125rem",
        height: 50,
        height: "3.125rem",
        ease: 'back'
      }
    );
  }).mouseout(function() {
    gsap.to(
      '.ball',
      {
        duration: 0.5,
        width: 8,
        width: "0.5rem",
        height: 8,
        height: "0.5rem",
        ease: 'back'
      }
    );
  });
// mouse follower end

// menu start
  var toggleScrolltriggerFlag = true;
  
  $('.menu-ham').click(function() {
    $('.submenu').stop().slideToggle('fast');
    $('#menu-background').stop().slideToggle('fast');

    if (toggleScrolltriggerFlag === true) {
      ScrollTrigger.disable();
      toggleScrolltriggerFlag = false;
    } else {
      ScrollTrigger.enable();
      toggleScrolltriggerFlag = true;
    }
    
    return false;
  });

  $('.submenu').click(function() {
    $('.submenu').stop().slideToggle('fast');
    $('#menu-background').stop().slideToggle('fast');
    
    ScrollTrigger.enable();
    toggleScrolltriggerFlag = true;

    return false;
  });
});
// menu end

// slider start
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const showDemo = () => {
  gsap.utils.toArray('.moving-box-wrap').forEach((section, index) => {
    const w = section.querySelector('.moving-box');
    const [x, xEnd] = (index % 2) ? ['100%', (w.scrollWidth - section.offsetWidth) * -1] : [w.scrollWidth * -1, 0];
    gsap.fromTo(w, {  x  }, {
      x: xEnd,
      scrollTrigger: {
        trigger: section, 
        scrub: 0.1
      }
    });
  });
}

document.addEventListener(`DOMContentLoaded`, function(e) {
  showDemo();
});

const $accordion = document.querySelector('.accordion');

const $accordionStopperTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: $accordion,
    start: "top top",
    end: "+=250",
    toggleAction: "play play none reset",
    pin: true
  }
});
// slider end

// moving text start
const $movingText = document.querySelector('.moving-text');

gsap.to($movingText,
  {
    x: "-667.5rem",
    duration: 15,
    repeat: -1,
    ease: "linear"
  }
)
// moving text end

// scroll vertical start
let smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 2,
  normalizeScroll: true,
  ignoreMobileResize: true,
  smoothTouch: 0.1, // very important code for mobile.
  effects: true,
});

const originalSpeedsMax = [];
const originalSpeedsMobile = [];
const $targets = gsap.utils.toArray(".switch");

const mediaQuery = "(max-width: 768px)";
const mediaQueryList = window.matchMedia(mediaQuery);

mediaQueryList.addEventListener("change", onChange);

onChange(mediaQueryList);

function onChange(event) {
  smoother.effects().forEach(effect => {
    $targets.forEach(t => {
      if (t === effect.trigger) {
        effect.kill();
      }
    });
  });

  if (event.matches) {
    $targets.forEach((t) => {
      originalSpeedsMobile.push(t.getAttribute("data-mobile"));
      t.removeAttribute("data-mobile");
    });

    $targets.forEach((t, i) => {
      smoother.effects(t, { speed: originalSpeedsMobile[i] });
    });
  } else {
    $targets.forEach((t) => {
      originalSpeedsMax.push(t.getAttribute("data-max"));
      t.removeAttribute("data-max");
    });

    $targets.forEach((t, i) => {
      smoother.effects(t, { speed: originalSpeedsMax[i] });
    });
  }
}

const $scrollVerticalBackground = document.querySelector('.scroll-v__background');
const $scrollVSection = document.querySelector(`.scroll-v-section`);
const $scrollHSection = document.querySelector(`.scroll-h-section`);

gsap.to($scrollVerticalBackground, {
  opacity: 1,
  scrollTrigger: {
    trigger: $scrollVerticalBackground,
    start: "top top",
    end: "bottom top",
    endTrigger: $scrollHSection,
    toggleAction: "restart pause resume reset",
    pin: true,
  }
});
// scroll vertical end

// scroll horizontal start
const $scrollHorizontalBackground = document.querySelector('.scroll-h__background--pinned');
const $scrollHorizontalBackgroundImage = document.querySelector('.scroll-h__background');
const $scrollHorizontalArchDoor = document.querySelector('.scroll-h__arch-door');
const $scrollHorizontalImageWrap = document.querySelector('.scroll-h__img-wrap');
const $scrollHorizontalImages = document.querySelectorAll('.scroll-h__img-wrap img');

const $brochureSection = document.querySelector(`.brochure-section`);

const scrollHorizontalTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: $scrollHSection,
    start: "top top",
    end: "bottom top",
    endTriger: $brochureSection,
    toggleAction: "restart pause resume reset",
    pin: true,
    scrub: 1.5,
  }
});

scrollHorizontalTimeline.from($scrollHorizontalBackground, {
  duration: 16,
  opacity: 0
});

scrollHorizontalTimeline.to($scrollHorizontalBackgroundImage, {
  duration: 40,
  scale: 1.3,
  yPercent: -15,
  ease: "ease.in"
}, 24);

scrollHorizontalTimeline.to($scrollHorizontalArchDoor, {
  duration: 40,
  scale: 5,
  ease: "ease.in"
}, 24);

scrollHorizontalTimeline.to($scrollHorizontalArchDoor, {
  duration: 4,
  opacity: 0,
  ease: "ease.in"
}, 36);

scrollHorizontalTimeline.to($scrollHorizontalImageWrap, {
  duration: 120,
  xPercent: -(50 * ($scrollHorizontalImages.length - 1)),
  ease: "none"
}, 36);
// scroll horizontal end

// footer animation start
const $brochureContainer = document.querySelector('.brochure__img-wrap');
const $brochure01 = document.querySelector('.brochure__img-01');
const $brochure02 = document.querySelector('.brochure__img-02');
const $brochure03 = document.querySelector('.brochure__img-03');

const $brochureSpacerBottom = document.querySelector(`.brochure__spacer-bottom`);

const footerAnimationTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: $brochureContainer,
    start: "top 10%",
    end: "top center",
    endTrigger: $brochureSpacerBottom,
    toggleAction: "restart pause resume reset",
    pin: true,
    scrub: 1.5,
  }
});

footerAnimationTimeline.to($brochure01, {
  duration: 3,
  rotate: -20,
  xPercent: -10.41666666666667,
  transformOrigin: "bottom center"
}, 0);

footerAnimationTimeline.to($brochure02, {
  duration: 3,
  yPercent: -2.604166666666667
}, 0)

footerAnimationTimeline.to($brochure03, {
  duration: 3,
  rotate: 20,
  xPercent: 10.41666666666667,
  transformOrigin: "bottom center"
}, 0);
// footer animation end