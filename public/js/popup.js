const openPopup = document.querySelector("[data-product-target]");
const closePopup = document.querySelector("[data-close-button]");
const overlay = document.getElementById("overlay");

openPopup.addEventListener("click", () => {
  const popup = document.querySelector(openPopup.dataset.productTarget);
  openPopUp(popup);
});

overlay.addEventListener("click", () => {
  const popup = document.querySelector(".post-product.active");
  closePopUp(popup);
});
closePopup.addEventListener("click", () => {
  const popup = closePopup.closest(".post-product");
  closePopUp(popup);
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
