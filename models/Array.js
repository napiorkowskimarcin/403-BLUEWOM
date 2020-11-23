const mongoose = require("mongoose");
const { Schema } = mongoose;
const currencyArray = new Schema({
  name: { type: String },
  currencyArray: { type: Array },
});

module.exports = mongoose.model("currencyArray", currencyArray);
