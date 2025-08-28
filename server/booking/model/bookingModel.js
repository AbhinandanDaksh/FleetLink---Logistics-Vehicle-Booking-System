const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vechile", required: true },
  costumerId: { type: String,
     default:"" },
  fromPincode: { type: Number,
    default:"" },
  toPincode: { type: Number,
     default:"" },
  startTime: { type: Date,
     default:"" },
  endTime: { type: Date,
    default:"" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
