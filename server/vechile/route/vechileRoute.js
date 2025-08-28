const {addVechile, getAvailableVehicles} = require("../controller/vechileController");
const express = require("express");
const router = express.Router();

router.post("/add-vechile", addVechile);

router.get("/available", getAvailableVehicles);

module.exports = router;