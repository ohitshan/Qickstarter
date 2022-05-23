const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = mongoose.Schema(
  {
    user: {
      type: Object,
      default: [],
    },
    data: {
      type: Object,
      default: [],
    },
    rewards: {
      type: Object,
      default: [],
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = { Payment };
