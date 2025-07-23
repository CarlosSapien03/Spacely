const mongoose = require("mongoose");

const spaceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    location: {
      type: String,
      required: true,
    },

    pricePerHour: {
      type: Number,
      required: true,
    },

    images: [
      {
        type: String,
        required: true,
      },
    ],

    availability: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Space", spaceSchema);
