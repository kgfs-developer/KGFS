// === CONFIGURATION ===
const WHATSAPP_PHONE = "91XXXXXXXXXX"; // e.g., 919876543210
const UPI_ID = "YOUR_UPI_ID"; // e.g., yourname@upi
const UPI_QR_SRC = "YOUR_UPI_QR.png"; // path to your QR image

// === DOM Elements ===
const billingToggle = document.getElementById("billingToggleSub");
const toggleTrack = document.querySelector(".toggle-track");
const toggleDot = document.querySelector(".toggle-dot");

const upiModal = document.getElementById("upiModal");
const upiQr = document.getElementById("upiQr");
const upiIdText = document.getElementById("upiIdText");
const upiIntent = document.getElementById("upiIntent");
const copyUpi = document.getElementById("copyUpi");
const closeUpi = document.getElementById("closeUpi");

// === Billing Toggle Logic ===
billingToggle?.addEventListener("change", () => {
  const isYearly = billingToggle.checked;

  toggleTrack.style.background = isYearly ? "#4a6bff" : "#e6e6e6";
  toggleDot.style.transform = isYearly ? "translateX(24px)" : "translateX(0)";

  document.querySelectorAll(".price-monthly").forEach((el) => {
    el.style.display = isYearly ? "none" : "inline";
  });
  document.querySelectorAll(".price-yearly").forEach((el) => {
    el.style.display = isYearly ? "inline" : "none";
  });
});

// === WhatsApp Subscribe Buttons ===
document.querySelectorAll(".btn-subscribe").forEach((btn) => {
  btn.addEventListener("click", () => {
    const plan = btn.dataset.plan || "Plan";
    const priceMonth = btn.dataset.priceMonth;
    const priceYear = btn.dataset.priceYear;
    const isYearly = billingToggle.checked;

    const priceText = isYearly
      ? priceYear
        ? `₹${priceYear} (yearly)`
        : "Yearly"
      : priceMonth
      ? `₹${priceMonth} / month`
      : "Monthly";

    const message = `Hi, I want to subscribe to the *${plan}* plan — ${priceText}. Please confirm next steps.\nName: \nContact: `;
    const encoded = encodeURIComponent(message);
    const link = `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
    window.open(link, "_blank");
  });
});

// === UPI Modal ===
document.querySelectorAll(".btn-upi").forEach((btn) => {
  btn.addEventListener("click", () => {
    const plan = btn.dataset.plan || "Plan";
    upiQr.src = UPI_QR_SRC;
    upiIdText.textContent = UPI_ID;
    upiIntent.href = `upi://pay?pa=${encodeURIComponent(
      UPI_ID
    )}&pn=${encodeURIComponent("KGFs Consultant")}&tn=${encodeURIComponent(
      plan + " subscription"
    )}`;
    upiModal.style.display = "flex";
  });
});

copyUpi?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(UPI_ID);
    copyUpi.textContent = "Copied ✓";
    setTimeout(() => (copyUpi.textContent = "Copy UPI ID"), 2000);
  } catch (e) {
    alert("Copy failed — please copy manually: " + UPI_ID);
  }
});

closeUpi?.addEventListener("click", () => (upiModal.style.display = "none"));
upiModal?.addEventListener("click", (e) => {
  if (e.target === upiModal) upiModal.style.display = "none";
});

// === Init ===
upiQr.src = UPI_QR_SRC;
upiIdText.textContent = UPI_ID;
