const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipientSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    coin: {
      type: String,
      required: true,
    },
    coinId: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipient", recipientSchema);
