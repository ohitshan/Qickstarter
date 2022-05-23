const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const remindSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    updateId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Remind = mongoose.model("Remind", remindSchema);

module.exports = { Remind };
