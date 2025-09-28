window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  const backToTop = document.getElementById("backToTop");

  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
    backToTop.classList.add("show");
  } else {
    navbar.classList.remove("scrolled");
    backToTop.classList.remove("show");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: "smooth",
      });

      // Update active nav link
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active");
      });
      this.classList.add("active");
    }
  });
});

// Back to top button
document.getElementById("backToTop").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // In a real application, you would send this data to a server
  alert(
    `Thank you, ${name}! Your message has been sent. I'll get back to you soon.`
  );

  // Reset form
  this.reset();
});

// Animate progress bars when skills section is in view
const skillBars = document.querySelectorAll(".progress-bar");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        skillBars.forEach((bar) => {
          bar.style.width = bar.getAttribute("aria-valuenow") + "%";
        });
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const skillsSection = document.querySelector("#skills");
if (skillsSection) {
  observer.observe(skillsSection);
}

// Set active nav link based on scroll position
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", function () {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Dark mode toggle
const modeToggle = document.getElementById("modeToggle");
const icon = modeToggle.querySelector("i");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedMode = localStorage.getItem("theme-mode");

function setMode(dark) {
  if (dark) {
    document.body.classList.add("dark-mode");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
    modeToggle.classList.remove("btn-outline-secondary");
    modeToggle.classList.add("btn-warning");
  } else {
    document.body.classList.remove("dark-mode");
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
    modeToggle.classList.remove("btn-warning");
    modeToggle.classList.add("btn-outline-secondary");
  }
  localStorage.setItem("theme-mode", dark ? "dark" : "light");
}

setMode(savedMode ? savedMode === "dark" : prefersDark);

modeToggle.addEventListener("click", () => {
  setMode(!document.body.classList.contains("dark-mode"));
});
