const alertBtn = document.querySelector(".alert-button");
const emailInput = document.querySelector(".email-input");
const priceInput = document.querySelector(".price-input");
const dropdownCoin = document.querySelector(".crypto-dropdown");
const dropdownContentDiv = document.querySelector(".crypto-dropdown-content");
const currentPriceDiv = document.querySelector(".current-price-div");

async function getCryptoList() {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/",
      {}
    );

    const data = response.data;

    return data;
  } catch (error) {
    throw error;
  }
}

getCryptoList().then((response) => {
  const cryptoList = response;

  cryptoList.forEach((v, i) => {
    dropdownContentDiv.innerHTML += `
      <li id="${i}" class="crypto-li">
        <img src="${v.image.thumb}" alt="">
        <h3>${v.name}</h3>
        <h2>(${v.symbol.toUpperCase()})</h2>
      </li>
  `;
  });

  currentPriceDiv.innerHTML += `
    <p>${
      cryptoList[dropdownCoin.id].market_data.current_price.usd
    } <span>USD</span></p>
  `;

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

      dropdownCoin.setAttribute("id", `${v.id}`);

      const newDropdownImage = document.createElement("image");
      const newDropdownName = document.createElement("h3");

      newDropdownImage.innerHTML = `
      <img class="btc-img" src="${cryptoList[i].image.large}" alt="">
      `;

      newDropdownName.innerHTML = `
      <h3 class="coin-symbol">${cryptoList[i].symbol.toUpperCase()}</h3>
      `;

      dropdownCoin.replaceChild(newDropdownImage, dropdownCoin.children[0]);
      dropdownCoin.replaceChild(newDropdownName, dropdownCoin.children[1]);

      const newCurrentPrice = document.createElement("p");

      newCurrentPrice.innerHTML = `
        <p>${
          cryptoList[dropdownCoin.id].market_data.current_price.usd
        } <span>USD</span></p>
      `;

      currentPriceDiv.replaceChild(
        newCurrentPrice,
        currentPriceDiv.children[1]
      );
    });
  });
});

alertBtn.addEventListener("click", () => {
  coinName = document.querySelector(".coin-symbol").innerText;
  if (emailInput.value !== "" && priceInput.value !== "")
    axios
      .post("http://localhost:3000/", {
        email: emailInput.value,
        price: priceInput.value,
        coin: coinName,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  emailInput.value = "";
  priceInput.value = "";
});
