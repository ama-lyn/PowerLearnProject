const openPopup = document.querySelectorAll("[data-product-target]");
const closePopup = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

openPopup.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = document.querySelector(button.dataset.productTarget);
    openPopUp(popup);
  });
});

overlay.addEventListener("click", () => {
  const popup = document.querySelector(".post-product.active");
  closePopUp(popup);
});

closePopup.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = closePopup.closest(".post-product");
    closePopUp(popup);
  });
});

function openPopUp(popup) {
  if (popup == null) return;
  popup.classList.add("active");
  overlay.classList.add("active");
}

function closePopUp(popup) {
  if (popup == null) return;
  popup.classList.remove("active");
  overlay.classList.remove("active");
}
