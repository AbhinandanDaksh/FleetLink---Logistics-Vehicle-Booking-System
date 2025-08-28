const express = require("express");
const dotenv = require("dotenv");
const { connect } = require("./config");
const vechileRoutes = require("./vechile/route/vechileRoute");
const bookingRoutes = require("./booking/route/bookingRoutes");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// ✅ Enable CORS for all origins
app.use(cors());

// DB connect
connect();

// Routes
app.get("/", (req, res) => {
  res.send("🚀 db is connected successfully!");
});

app.use("/api/vechile", vechileRoutes);
app.use("/api/booking", bookingRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
