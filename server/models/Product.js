const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      maxlength: 50,
    },
    description: {
      type: String,
    },
    productionInfo: {
      type: String,
    },
    awardHistory: {
      type: String,
    },

    images: {
      type: Array,
      default: [],
    },
    genres: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

productSchema.index(
  {
    title: "text",
    description: "text",
  },
  {
    weights: {
      title: 5,
      description: 1,
    },
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
