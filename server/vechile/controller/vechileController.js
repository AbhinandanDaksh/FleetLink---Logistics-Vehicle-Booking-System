const Vechile = require("../model/vechileModel");

const Booking = require("../../booking/model/bookingModel");
exports.addVechile = async (req, res) => {
  try {
    const { name, capacityKg, tyres, fromPincode, toPincode } = req.body;

    if (!name || !capacityKg || !tyres || !fromPincode || !toPincode) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const vehicle = new Vechile({
      name,
      capacityKg,
      tyres,
      fromPincode,
      toPincode,
    });

    await vehicle.save();
    return res.status(201).json({ success: true, vehicle });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};


exports.getAvailableVehicles = async (req, res) => {
  try {
    const { capacityKg, fromPincode, toPincode, startTime } = req.query;
console.log(req.query)
    if (!capacityKg || !fromPincode || !toPincode || !startTime) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    // simple logic: 1hr per 100km difference in pincode
    const estimatedRideDurationHours = Math.ceil(
      Math.abs(fromPincode - toPincode) / 100
    );
    const rideEndTime = new Date(
      new Date(startTime).getTime() +
        estimatedRideDurationHours * 60 * 60 * 1000
    );

    // filter vehicles
   const vehicles = await Vechile.find({
  capacityKg: { $gte: Number(capacityKg) },
  fromPincode: Number(fromPincode),
  toPincode: Number(toPincode),
});


    // check overlapping bookings
    const availableVehicles = [];
    for (let v of vehicles) {
      const overlapping = await Booking.findOne({
        vehicleId: v._id,
        $or: [
          { startTime: { $lt: rideEndTime }, endTime: { $gt: startTime } },
        ],
      });

      if (!overlapping) availableVehicles.push(v);
    }

    res.json({
      success: true,
      estimatedRideDurationHours,
      vehicles: availableVehicles,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

