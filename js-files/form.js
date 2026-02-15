const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyk10z1dxm5WWdakd_-aqEd22MU_a0BUcEg-ZyTL-nbAMZwDfC1BR2uo9gSWFxJwz0z/exec";

// Handle custom service dropdown
document.querySelectorAll(".dropdown-item").forEach((item) => {
  item.addEventListener("click", function () {
    const value = this.getAttribute("data-value");
    const text = this.textContent;
    document.getElementById("selectedService").textContent = text;
    document.getElementById("service").value = value;

    // Remove error state
    const dropdownBtn = document
      .getElementById("serviceDropdown")
      .closest(".dropdown");
    dropdownBtn.classList.remove("is-invalid");
    dropdownBtn.nextElementSibling?.classList.remove("d-block");
  });
});

// Validation helper
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
};

// Show alert
const showAlert = (type, message) => {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.role = "alert";
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

  const formContainer = document
    .getElementById("contactForm")
    .closest(".col-lg-8");
  formContainer.insertBefore(alertDiv, document.getElementById("contactForm"));

  setTimeout(() => {
    alertDiv.remove();
  }, 6000);
};

// Form submission
document
  .getElementById("contactForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const service = document.getElementById("service");
    const message = document.getElementById("message");
    const submitBtn = this.querySelector('button[type="submit"]');

    let isValid = true;

    // Validate name
    if (!name.value.trim()) {
      name.classList.add("is-invalid");
      isValid = false;
    } else {
      name.classList.remove("is-invalid");
    }

    // Validate email
    if (!email.value.trim() || !validateEmail(email.value)) {
      email.classList.add("is-invalid");
      isValid = false;
    } else {
      email.classList.remove("is-invalid");
    }

    // Validate phone (optional)
    if (phone.value.trim() && !validatePhone(phone.value)) {
      phone.classList.add("is-invalid");
      isValid = false;
    } else {
      phone.classList.remove("is-invalid");
    }

    // Validate service
    const dropdownBtn = document
      .getElementById("serviceDropdown")
      .closest(".dropdown");
    if (!service.value) {
      dropdownBtn.classList.add("is-invalid");
      dropdownBtn.nextElementSibling?.classList.add("d-block");
      isValid = false;
    } else {
      dropdownBtn.classList.remove("is-invalid");
      dropdownBtn.nextElementSibling?.classList.remove("d-block");
    }

    // Validate message
    if (!message.value.trim()) {
      message.classList.add("is-invalid");
      isValid = false;
    } else {
      message.classList.remove("is-invalid");
    }

    // Validate reCAPTCHA
    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
      showAlert("danger", "❌ Please verify the reCAPTCHA.");
      return;
    }

    if (!isValid) return;

    // Disable button and show spinner
    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
          Name: name.value.trim(),
          Email: email.value.trim(),
          Phone: phone.value.trim(),
          Service: service.value,
          Message: message.value.trim(),
          recaptchaToken: recaptchaResponse,
        }),
      });

      const result = await response.json();

      if (result.success) {
        showAlert(
          "success",
          "✅ Thank you! Your message has been sent successfully. We will contact you shortly.",
        );

        // Reset form
        this.reset();
        document.getElementById("selectedService").textContent =
          "Select a service";
        document.getElementById("service").value = "";

        // Reset reCAPTCHA
        grecaptcha.reset();
      } else {
        showAlert(
          "danger",
          `❌ ${result.message || "An error occurred. Please try again."}`,
        );
      }
    } catch (error) {
      console.error("Form submission error:", error);
      showAlert(
        "danger",
        "❌ Network error. Please check your connection and try again.",
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });

// Real-time input validation
["name", "email", "phone", "message"].forEach((id) => {
  document.getElementById(id).addEventListener("input", function () {
    if (this.value.trim()) {
      this.classList.remove("is-invalid");
    }
  });
});
