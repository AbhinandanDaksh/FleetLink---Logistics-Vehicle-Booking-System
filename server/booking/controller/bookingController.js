const Vechile = require("../../vechile/model/vechileModel");

const Booking = require("../../booking/model/bookingModel")

// Book a vehicle
exports.bookVehicle = async (req, res) => {
  try {
    const { vehicleId, costumerId, fromPincode, toPincode, startTime } = req.body;

    const vehicle = await Vechile.findById(vehicleId);
    if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });

    const estimatedRideDurationHours = Math.ceil(Math.abs(fromPincode - toPincode) / 100);
    const endTime = new Date(new Date(startTime).getTime() + estimatedRideDurationHours * 60 * 60 * 1000);

    // check overlapping booking
    const overlapping = await Booking.findOne({
      vehicleId,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
      ]
    });

    if (overlapping) {
      return res.status(409).json({ success: false, message: "Vehicle already booked for this slot" });
    }

    const booking = new Booking({ vehicleId, costumerId, fromPincode, toPincode, startTime, endTime });
    await booking.save();

    res.status(201).json({ success: true, booking });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get all bookings for a customer
exports.getBookings = async (req, res) => {
  try {
    const { costumerId } = req.query; // customerId frontend से आएगा
    console.log(costumerId)
    if (!costumerId) {
      return res.status(400).json({ success: false, message: "Missing customerId" });
    }

    const bookings = await Booking.find({ costumerId })
      .populate("vehicleId", "name capacityKg tyres");
console.log(bookings)
    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

