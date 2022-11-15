const Recipient = require("../models/recipient");
const emailFunction = require("../email");

//get all recipients
const getRecipients = async () => {
  const recipients = await Recipient.find({}).sort();
  return recipients;
};

//create recipient
const createRecipient = async (req, res) => {
  const { email, price, coin } = req.body;
  try {
    const recipient = await Recipient.create({
      email,
      price,
      coin,
      emailedAt: 0,
    });
    res.status(200).json(recipient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateRecipient = async (id, criteria) => {
  const recipient = await Recipient.findOneAndUpdate(
    { _id: id },
    { emailedAt: criteria }
  );
};

module.exports = {
  createRecipient,
  getRecipients,
  updateRecipient,
};
