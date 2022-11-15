const { getPriceData, getCryptoList } = require("./api");
const {
  getRecipients,
  updateRecipient,
} = require("./controllers/recipient-controller");
const emailFunction = require("./email");

const checkRecipientPrice = () => {
  getRecipients().then((res) => {
    let recipients = res.filter((n) => {
      return n.emailedAt < Date.now() - 60 * 60 * 1000; //one hour
    });

    getCryptoList().then((res) => {
      let cryptoList = res;
      recipients.forEach((v) => {
        let coinObj = cryptoList.find((o) => o.symbol === v.coin.toLowerCase());

        let coinCurrentPrice = coinObj.market_data.current_price.usd;
        let coinName = coinObj.name;

        if (coinCurrentPrice < v.price) {
          let price = v.price;
          let email = v.email;
          let coin = v.coin;

          emailFunction(price, email, coin, coinName, coinCurrentPrice);
          updateRecipient(v._id, Date.now());
        }
      });
    });
  });
};
// then when searching filter for timestamps that are < than date.now() - 1 hour

module.exports = checkRecipientPrice;
