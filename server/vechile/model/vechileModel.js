// const mongoose=require('mongoose');


// const vechileSchema = new mongoose.Schema({
//   name: { type: String, default:"" },
//   type: { type: String, default: "" },
//   capacityKg: { type: Number,default:"" },
//   tyres: { type: Number, default:"" },
//   createdAt: { type: Date, default: Date.now },
//   costumerId: { type: String, default: "" },
//   fromPincode: { type: Number, default:"" },
//   toPincode: { type: Number,default:"" },
// });

// module.exports=mongoose.model("Vechile",vechileSchema);
const mongoose = require("mongoose");

const vechileSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  type: { type: String, default: "" },
  capacityKg: { type: Number, default: 0 },   // number का default number होना चाहिए
  tyres: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  costumerId: { type: String, default: "" },
  fromPincode: { type: Number, default: 0 },
  toPincode: { type: Number, default: 0 },
});

module.exports = mongoose.model("Vechile", vechileSchema);
