const alertBtn = document.querySelector(".alert-button");
const emailInput = document.querySelector(".email-input");
const priceInput = document.querySelector(".price-input");
const dropdownCoin = document.querySelector(".crypto-dropdown");
const dropdownContentDiv = document.querySelector(".crypto-dropdown-content");

async function getCryptoList() {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/",
      {}
    );

    const data = response.data;
    console.log(data);

    return data;
  } catch (error) {
    throw error;
  }
}

getCryptoList().then((response) => {
  const cryptoList = response;

  cryptoList.forEach((v) => {
    dropdownContentDiv.innerHTML += `
      <li class="crypto-li">
        <img src="${v.image.thumb}" alt="">
        <h3>${v.name}</h3>
        <h2>(${v.symbol.toUpperCase()})</h2>
      </li>
  `;
  });

  dropdownCoin.addEventListener("click", () => {
    if (dropdownContentDiv.style.visibility !== "visible") {
      dropdownContentDiv.style.visibility = "visible";
    } else {
      dropdownContentDiv.style.visibility = "hidden";
    }
  });

  document.querySelectorAll(".crypto-li").forEach((v, i) => {
    v.addEventListener("click", (e) => {
      e.preventDefault();

      const newDropdownImage = document.createElement("image");
      const newDropdownName = document.createElement("h3");

      newDropdownImage.innerHTML = `
      <img class="btc-img" src="${cryptoList[i].image.large}" alt="">
      `;

      newDropdownName.innerHTML = `
      <h3>${cryptoList[i].symbol.toUpperCase()}</h3>
      `;

      dropdownCoin.replaceChild(newDropdownImage, dropdownCoin.children[0]);
      dropdownCoin.replaceChild(newDropdownName, dropdownCoin.children[1]);
    });
  });
});

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
