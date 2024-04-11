const mongoose = require("mongoose");

const niftySchema = mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  impliedVolatility: {
    type: Number,
    required: true,
  },
  average: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Nifty", niftySchema);
