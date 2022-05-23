const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const blockSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    blockTarget: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Block = mongoose.model("Block", blockSchema);

module.exports = { Block };
