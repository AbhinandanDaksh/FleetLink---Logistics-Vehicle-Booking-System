const express = require("express");
const router = express.Router();
const { bookVehicle,getBookings } = require("../../booking/controller/bookingController");

router.post("/book-vehicle", bookVehicle);
router.get("/my-bookings", getBookings);

module.exports = router;
