const mongoose = require("mongoose");
const { Schema } = require("mongoose");
// const Schema = mongoose.Schema;

const postSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: Object,
    maxlength: 50,
  },
  category: {
    type: Object,
  },
  location: {
    type: String,
  },
  images: {
    type: Array,
    default: [],
  },
  videos: {
    type: Array,
    default: [],
  },
  funding: {
    type: Number,
  },
  launch: {
    type: String,
  },
  duration: {
    type: String,
  },
  description: {
    type: String,
  },
  risk: {
    type: String,
  },
  reward: {
    type: Array,
    default: [],
  },
  role: {
    type: Number,
    default: 0,
  },

  filePath: {
    type: String,
  },
  views: {
    type: Number,
    default: 0,
  },
  thumbnail: {
    type: String,
  },
  faq: {
    type: Array,
    default: [],
  },
  updates: {
    type: Array,
    default: [],
  },
  answerfaq: {
    type: Array,
    default: [],
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
