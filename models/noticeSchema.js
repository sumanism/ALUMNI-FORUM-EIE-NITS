const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  noticeHead: {
    type: String,
    required: true,
  }
});

const noticeData = mongoose.model("noticeData", noticeSchema, "noticeDatas");

module.exports = noticeData;
