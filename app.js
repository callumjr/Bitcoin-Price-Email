async function getData() {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/coins/bitcoin",
    {}
  );
  const data = response.data;
  console.log(data);
}

const response = getData();
