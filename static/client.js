const alertBtn = document.querySelector(".alert-button");
const emailInput = document.querySelector(".email-input");
const priceInput = document.querySelector(".price-input");

alertBtn.addEventListener("click", () => {
  fetch("http://localhost:3000/").then((response) => {
    console.log(response);
  });
});
