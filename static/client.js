const alertBtn = document.querySelector(".alert-button");
const emailInput = document.querySelector(".email-input");
const priceInput = document.querySelector(".price-input");

alertBtn.addEventListener("click", () => {
  axios
    .post("http://localhost:3000/", {
      userEmail: emailInput.value,
      selectedPrice: priceInput.value,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
});
