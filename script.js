//navbar
const open = document.querySelector(".container");
const close = document.querySelector(".close");
var tl = gsap.timeline({ defaults: { duration: 1, ease: "expo.inOut" } });
open.addEventListener("click", () => {
  if (tl.reversed()) {
    tl.play();
  } else {
    tl.to("nav", { right: 0 })
      .to("nav", { height: "100vh" }, "-=.1")
      .to(
        "nav ul li a",
        { opacity: 1, pointerEvents: "all", stagger: 0.2 },
        "-=.8"
      )
      .to(".close", { opacity: 1, pointerEvents: "all" }, "-=.8")
      .to("nav h2", { opacity: 1 }, "-=1")
      .to(".delayed-image", { display: "block", opacity: 1 }, "-=.3");
  }
});

close.addEventListener("click", () => {
  tl.reverse();
});

const clear = (el) => {
  const dad = el.parentElement;
  for (i of dad.children) {
    i.className = "";
  }
};
//pointer 
var mouse = { x: 0, y: 0 };
var dotPos = { x: 0, y: 0 };
var ballPos = { x: 0, y: 0 };
var dotRatio = 0.2;
var ballRatio = 0.1;
var dot = document.getElementById("dot");
var ball = document.getElementById("ball");
var isMouseMoving = false;
var idleTimer;
var ballAnimation;
gsap.set(dot, { xPercent: -50, yPercent: -50 });
gsap.set(ball, { xPercent: -50, yPercent: -50 });
document.addEventListener("mousemove", (e) => {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
  isMouseMoving = true;
  clearTimeout(idleTimer); 
  idleTimer = setTimeout(() => {
    isMouseMoving = false;
  }, 2000); 
});
gsap.ticker.add(() => {
  dotPos.x += (mouse.x - dotPos.x) * dotRatio;
  dotPos.y += (mouse.y - dotPos.y) * dotRatio;
  gsap.set(dot, { x: dotPos.x, y: dotPos.y });
  ballPos.x += (dotPos.x - ballPos.x) * ballRatio;
  ballPos.y += (dotPos.y - ballPos.y) * ballRatio;
  gsap.set(ball, { x: ballPos.x, y: ballPos.y });
  if (!isMouseMoving && !ballAnimation) {
    ballAnimation = gsap
      .timeline({ repeat: -1, yoyo: true, ease: "power1.inOut" })
      .to(ball, { scale: 1.2, duration: 0.75 });
  } else if (isMouseMoving && ballAnimation) {
    ballAnimation.kill();
    ballAnimation = null;
    gsap.to(ball, { scale: 1, duration: 0.75, ease: "power1.inOut" });
  }
});
//loader
function hideLoader() {
  const loader = document.querySelector(".loading");
  loader.classList.add("hidden");
}
setTimeout(hideLoader, 8000);
//snowfake
document.addEventListener("DOMContentLoaded", function () {
  const snowContainer = document.querySelector(".snow-container");

  const particlesPerThousandPixels = 0.1;
  const fallSpeed = 1.25;
  const pauseWhenNotActive = true;
  const maxSnowflakes = 200;
  const snowflakes = [];

  let snowflakeInterval;
  let isTabActive = true;

  function resetSnowflake(snowflake) {
    const size = Math.random() * 5 + 1;
    const viewportWidth = window.innerWidth - size; // Adjust for snowflake size
    const viewportHeight = window.innerHeight;

    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.left = `${Math.random() * viewportWidth}px`; // Constrain within viewport width
    snowflake.style.top = `-${size}px`;

    const animationDuration = (Math.random() * 3 + 2) / fallSpeed;
    snowflake.style.animationDuration = `${animationDuration}s`;
    snowflake.style.animationTimingFunction = "linear";
    snowflake.style.animationName =
      Math.random() < 0.5 ? "fall" : "diagonal-fall";

    setTimeout(() => {
      if (parseInt(snowflake.style.top, 10) < viewportHeight) {
        resetSnowflake(snowflake);
      } else {
        snowflake.remove(); // Remove when it goes off the bottom edge
      }
    }, animationDuration * 1000);
  }

  function createSnowflake() {
    if (snowflakes.length < maxSnowflakes) {
      const snowflake = document.createElement("div");
      snowflake.classList.add("snowflake");
      snowflakes.push(snowflake);
      snowContainer.appendChild(snowflake);
      resetSnowflake(snowflake);
    }
  }

  function generateSnowflakes() {
    const numberOfParticles =
      Math.ceil((window.innerWidth * window.innerHeight) / 1000) *
      particlesPerThousandPixels;
    const interval = 5000 / numberOfParticles;

    clearInterval(snowflakeInterval);
    snowflakeInterval = setInterval(() => {
      if (isTabActive && snowflakes.length < maxSnowflakes) {
        requestAnimationFrame(createSnowflake);
      }
    }, interval);
  }

  function handleVisibilityChange() {
    if (!pauseWhenNotActive) return;

    isTabActive = !document.hidden;
    if (isTabActive) {
      generateSnowflakes();
    } else {
      clearInterval(snowflakeInterval);
    }
  }

  generateSnowflakes();

  window.addEventListener("resize", () => {
    clearInterval(snowflakeInterval);
    setTimeout(generateSnowflakes, 1000);
  });

  document.addEventListener("visibilitychange", handleVisibilityChange);
});
