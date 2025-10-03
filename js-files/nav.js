document.addEventListener("DOMContentLoaded", () => {
  const desktopNavItems = document.querySelectorAll(
    ".navbar-nav.nav-links .nav-item"
  );
  const mobileNavList = document.querySelector(".mobile-bottom-nav ul");

  // Clone items with icons for bottom nav
  desktopNavItems.forEach((item) => {
    const link = item.querySelector(".nav-link");
    const iconClass = item.getAttribute("data-icon");
    const mobileItem = document.createElement("li");
    mobileItem.classList.add("nav-item");
    mobileItem.innerHTML = `
        <a class="nav-link ${
          link.classList.contains("active") ? "active" : ""
        }" href="${link.getAttribute("href")}">
          <i class="${iconClass}"></i>
          <span>${link.textContent.trim()}</span>
        </a>`;
    mobileNavList.appendChild(mobileItem);
  });

  // Scrollspy for active link highlight
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function activateLink() {
    let scrollY = window.pageYOffset + 100; // offset for fixed navbar
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", activateLink);
});
