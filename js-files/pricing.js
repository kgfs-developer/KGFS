// === CONFIGURATION ===
const WHATSAPP_PHONE = "919798107150";
const UPI_ID = "kumaramankushwaha@ybl";
const UPI_QR_SRC = "../images/QR_CODE.jpg";

// === DOM Elements ===
const billingToggle = document.getElementById("billingToggleSub");
const toggleTrack = document.querySelector(".toggle-track");
const toggleDot = document.querySelector(".toggle-dot");

const upiModal = document.getElementById("upiModal");
const upiQr = document.getElementById("upiQr");
const upiIdText = document.getElementById("upiIdText");
const upiIntent = document.getElementById("upiIntent");
const whatsappConfirm = document.getElementById("whatsappConfirm");
const copyUpi = document.getElementById("copyUpi");
const closeUpi = document.getElementById("closeUpi");

// === Billing Toggle Logic ===
billingToggle?.addEventListener("change", () => {
  const isYearly = billingToggle.checked;
  toggleTrack.style.background = isYearly ? "#4a6bff" : "#e6e6e6";
  toggleDot.style.transform = isYearly ? "translateX(24px)" : "translateX(0)";

  document.querySelectorAll(".price-monthly").forEach(el => el.style.display = isYearly ? "none" : "inline");
  document.querySelectorAll(".price-yearly").forEach(el => el.style.display = isYearly ? "inline" : "none");
});

// === WhatsApp Subscribe Buttons ===
document.querySelectorAll(".btn-subscribe").forEach(btn => {
  btn.addEventListener("click", () => {
    const plan = btn.dataset.plan;
    const priceMonth = btn.dataset.priceMonth;
    const priceYear = btn.dataset.priceYear;
    const isYearly = billingToggle.checked;

    const priceText = isYearly ? `₹${priceYear} (yearly)` : `₹${priceMonth} / month`;
    const message = `Hi, I want to subscribe to the *${plan}* plan — ${priceText}. Please confirm next steps.\nName: \nContact: `;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`, "_blank");
  });
});

// === UPI Modal Buttons ===
document.querySelectorAll(".btn-upi").forEach(btn => {
  btn.addEventListener("click", () => {
    const plan = btn.dataset.plan;
    const priceMonth = btn.dataset.priceMonth;
    const priceYear = btn.dataset.priceYear;
    const isYearly = billingToggle.checked;
    const amount = isYearly ? priceYear : priceMonth;

    // Update modal info
    upiQr.src = UPI_QR_SRC;
    upiIdText.textContent = UPI_ID;

    // Generate UPI deep link
    upiIntent.href = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent("KGFs Consultant")}&am=${encodeURIComponent(amount)}&cu=INR&tn=${encodeURIComponent(plan + " subscription")}`;

    // Generate WhatsApp confirm link
    const confirmMsg = `Hi, I have completed the payment for *${plan}* plan (₹${amount}). Please verify my payment.`;
    whatsappConfirm.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(confirmMsg)}`;

    // Show modal
    upiModal.style.display = "flex";
  });
});

// === Copy UPI ID ===
copyUpi?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(UPI_ID);
    copyUpi.textContent = "Copied ✓";
    setTimeout(() => (copyUpi.textContent = "Copy UPI ID"), 2000);
  } catch {
    alert("Copy failed — please copy manually: " + UPI_ID);
  }
});

// === Close Modal ===
closeUpi?.addEventListener("click", () => (upiModal.style.display = "none"));
upiModal?.addEventListener("click", e => {
  if (e.target === upiModal) upiModal.style.display = "none";
});

// === Auto Close Modal When WhatsApp Button Clicked ===
whatsappConfirm?.addEventListener("click", () => {
  upiModal.style.display = "none";
});

// === Init Defaults ===
upiQr.src = UPI_QR_SRC;
upiIdText.textContent = UPI_ID;
