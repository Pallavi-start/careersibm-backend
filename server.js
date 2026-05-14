const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();

// =========================
// Middleware
// =========================
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://careersibm-frontend.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// Static uploads folder
// =========================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =========================
// Health check route (IMPORTANT)
// =========================
app.get("/", (req, res) => {
  res.send("🚀 CareersIBM Backend is Running");
});

// =========================
// Routes
// =========================
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", authRoutes);

// =========================
// MongoDB connection
// =========================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

// =========================
// Server start (Render compatible)
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});