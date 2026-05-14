const app = express();

// middleware
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://careersibm-frontend.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ ADD THIS HERE (HEALTH CHECK ROUTE)
app.get("/", (req, res) => {
  res.send("🚀 CareersIBM Backend is Running");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", authRoutes);

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});