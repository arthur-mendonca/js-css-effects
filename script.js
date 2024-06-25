gsap.registerPlugin(ScrollTrigger);

const pageContainer = document.querySelector(".container");

const scroller = new LocomotiveScroll({
  el: pageContainer,
  smooth: true,
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
// Sincronizar LocomotiveScroll com ScrollTrigger
scroller.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(pageContainer, {
  scrollTop(value) {
    return arguments.length
      ? scroller.scrollTo(value, 0, 0)
      : scroller.scroll.instance.scroll.y;
  },
  getBoudingClientRect() {
    return {
      left: 0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: pageContainer.style.transform ? "transform" : "fixed",
});

window.addEventListener("load", function () {
  let pinwrap = document.querySelector(".pin-wrap");
  let pinWrapWidth = pinwrap.offsetWidth;
  let horizontalScrollLength = pinWrapWidth - this.window.innerWidth;

  gsap.to(".pin-wrap", {
    scrollTrigger: {
      scroller: pageContainer,
      scrub: true,
      trigger: "#sectionPin",
      pin: true,
      start: "top top",
      end: pinWrapWidth,
    },
    x: -horizontalScrollLength,
  });

  ScrollTrigger.addEventListener("refresh", () => scroller.update());

  ScrollTrigger.refresh();
});

const timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".anima",
    scroller: pageContainer,
    start: "top 50%",
    end: "bottom 10%",
    scrub: 2,
    // markers: true,
  },
});

timeline.fromTo(".anima", { scale: 6 }, { scale: 0.6 }, 0);
timeline.fromTo(".anima", { opacity: 10 }, { opacity: 0 }, 0);
