const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const signupRoutes = require("./routes/signup.routes");
const otpRoutes = require("./routes/otp.routes");
const loginRoutes = require("./routes/login.routes");
const profileRoutes = require("./routes/profile.routes");


const app = express();
const cookieParser = require("cookie-parser");
// ================= CORS =================
const allowedOrigins = [
  "http://localhost:3000",
  "https://careersibm-frontend.vercel.app",
   "https://careersibm.co.in"
];

app.use(cors({
  origin: function (origin, callback) {

    // allow Postman / server-to-server
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("❌ Blocked CORS:", origin);
    return callback(new Error("CORS Not Allowed"));
  },
  credentials: true
}));

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// ================= STATIC FILES =================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.send("🚀 CareersIBM Backend is Running");
});


// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications",applicationRoutes);
app.use( "/api/employee", require("./routes/employeeRoutes"));
// app.use("/api/user", require("./routes/userRoutes"));
// app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api", require("./routes/signup.routes"));
app.use("/api", require("./routes/otp.routes"));
app.use("/api", require("./routes/login.routes"));
app.use("/api", require("./routes/profile.routes"));

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  })
  .catch((err) => {
    console.log("DB Error:", err);
  });