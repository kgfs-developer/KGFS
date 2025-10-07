const backToTop = document.getElementById("backToTop");
const buttons = document.querySelectorAll(".floating-btn");

// Show Back to Top only after scrolling
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

backToTop.style.display = "none";

// Staggered slide-in animation
buttons.forEach((btn, index) => {
  setTimeout(() => {
    btn.style.transition = "transform 0.5s ease, opacity 0.5s ease";
    btn.style.transform = "translateX(0)";
    btn.style.opacity = "1";
  }, index * 200); // delay 200ms per button
});
