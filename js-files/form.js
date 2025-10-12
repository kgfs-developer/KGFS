
  // Handle custom service dropdown
  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function () {
      const value = this.getAttribute('data-value');
      const text = this.textContent;
      document.getElementById('selectedService').textContent = text;
      document.getElementById('service').value = value;
      
      // Remove error state
      const dropdownBtn = document.getElementById('serviceDropdown').closest('.dropdown');
      dropdownBtn.classList.remove('is-invalid');
      dropdownBtn.nextElementSibling?.classList.remove('d-block');
    });
  });

  // Form submission
  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = true;

    // Validate name
    const name = document.getElementById('name');
    if (!name.value.trim()) {
      name.classList.add('is-invalid');
      isValid = false;
    } else {
      name.classList.remove('is-invalid');
    }

    // Validate email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
      email.classList.add('is-invalid');
      isValid = false;
    } else {
      email.classList.remove('is-invalid');
    }

    // Validate service
    const service = document.getElementById('service');
    const dropdownBtn = document.getElementById('serviceDropdown').closest('.dropdown');
    if (!service.value) {
      dropdownBtn.classList.add('is-invalid');
      dropdownBtn.nextElementSibling?.classList.add('d-block');
      isValid = false;
    } else {
      dropdownBtn.classList.remove('is-invalid');
      dropdownBtn.nextElementSibling?.classList.remove('d-block');
    }

    // Validate message
    const message = document.getElementById('message');
    if (!message.value.trim()) {
      message.classList.add('is-invalid');
      isValid = false;
    } else {
      message.classList.remove('is-invalid');
    }

    if (!isValid) return;

    // Build WhatsApp message
    const whatsappMessage = `
Hello! I'm ${name.value.trim()}.

📧 Email: ${email.value.trim()}
🛠️ Service: ${service.value}
💬 Project: ${message.value.trim()}
    `.trim();

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/919798107150?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');

    // Optional: Reset form
    this.reset();
    document.getElementById('selectedService').textContent = 'Select a service';
    document.getElementById('service').value = '';
  });

  // Real-time input validation
  ['name', 'email', 'message'].forEach(id => {
    document.getElementById(id).addEventListener('input', function () {
      if (this.value.trim()) {
        this.classList.remove('is-invalid');
      }
    });
  });
