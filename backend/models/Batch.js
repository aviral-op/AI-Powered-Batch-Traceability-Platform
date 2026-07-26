const mongoose = require("mongoose");

const BatchSchema = new mongoose.Schema({
  batchId: {
    type: String,
    required: true,
    unique: true,
  },

  product: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Batch", BatchSchema);