const mongoose = require("mongoose");
const videoSchema = mongoose.Schema(
  {
    productId: {
      type: String,
    },

    episode: {
      type: String,
    },

    filePath: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    duration: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

module.exports = { Video };
