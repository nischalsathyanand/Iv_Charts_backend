const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DataSchema = new Schema({
  timestamp: {
    type: String,
    required: true,
  },
  implied_volatility: {
    type: String,
    required: true,
  },
  average: {
    type: String,
    required: true,
  },
});

const ScriptSchema = new Schema({
  scripts: {
    type: Map,
    of: [DataSchema],
  },
});

module.exports = mongoose.model("Script", ScriptSchema);
