const mongoose = require("mongoose");

const databaseSchema = new mongoose.Schema({
      batch: {
        type: Number,
        required: true,
      },
      scholarID: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
      },
      phNo: {
        type: Number,
      },
      linkedin: {
        type: String,
      },
      presentStatus: {
        type: String,
      }
});

const batchData = mongoose.model("batchData", databaseSchema, "batchDatas");

module.exports = batchData;
