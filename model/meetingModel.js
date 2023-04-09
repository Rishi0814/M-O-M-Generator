const mongoose = require("mongoose");

const meetingSchema = mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    emails: {
      type: Array,
      required: true,
    },
    mom: {
      type: String,
      // required: true,
    },
    Date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "meetings" }
);

const meeting = mongoose.model("meetings", meetingSchema);

module.exports = meeting;
