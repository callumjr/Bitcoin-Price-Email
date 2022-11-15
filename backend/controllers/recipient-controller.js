const Recipient = require("../models/recipient");
const emailCode = require("../app");

//create recipient
const createRecipient = async (req, res) => {
  const { email, price, coin, coinId } = req.body;
  try {
    const recipient = await Recipient.create({
      email,
      price,
      coin,
      coinId,
    });
    res.status(200).json(recipient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

  emailCode.emailFunction(price, email, coinId);
};

module.exports = {
  createRecipient,
};
