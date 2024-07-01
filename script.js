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

// Başlangıçta ball öğesini ortala
gsap.set(dot, { xPercent: -50, yPercent: -50 });
gsap.set(ball, { xPercent: -50, yPercent: -50 });

// Fare hareketini algılayan fonksiyon
document.addEventListener("mousemove", (e) => {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
  isMouseMoving = true;
  clearTimeout(idleTimer); // Zamanlayıcıyı sıfırla
  idleTimer = setTimeout(() => {
    isMouseMoving = false;
  }, 2000); // 2 saniye hareketsizlikten sonra aktif değil
});

// Dot ve ball pozisyonlarını güncelle
gsap.ticker.add(() => {
  // Dot hareketi
  dotPos.x += (mouse.x - dotPos.x) * dotRatio;
  dotPos.y += (mouse.y - dotPos.y) * dotRatio;
  gsap.set(dot, { x: dotPos.x, y: dotPos.y });

  // Ball hareketi (dot'u takip eder)
  ballPos.x += (dotPos.x - ballPos.x) * ballRatio;
  ballPos.y += (dotPos.y - ballPos.y) * ballRatio;
  gsap.set(ball, { x: ballPos.x, y: ballPos.y });

  // Fare hareketsizken ball büyüyüp küçülsün
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
function hideLoader() {
  const loader = document.querySelector(".loading");
  loader.classList.add("hidden");
}
setTimeout(hideLoader, 8000);
