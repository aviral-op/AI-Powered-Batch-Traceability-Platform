require("dotenv").config();

const Batch = require("./models/Batch");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const verifyToken = require("./middleware/authMiddleware");
const rateLimit = require("express-rate-limit");
const passport = require("passport");
const session = require("express-session");
const aiRoutes = require("./routes/aiRoutes");
require("./config/passport");

const app = express();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    message: "Too many requests. Please try again after 15 minutes.",
  },
});

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "googleauthsecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;

const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

dns.resolveSrv("_mongodb._tcp.cluster0.vcssyr3.mongodb.net", (err, addresses) => {
  console.log("DNS Error:", err);
  console.log("Addresses:", addresses);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));



// 1. GET All Batches
app.get("/api/batches", async (req, res) => {
  try {
    const batches = await Batch.find();
    res.status(200).json(batches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 6. SEARCH Batch
app.get("/api/batches/search", async (req, res) => {
  try {

    const q = req.query.q || "";

   const result = await Batch.find({
  $or: [
    { batchId: { $regex: q, $options: "i" } },
    { product: { $regex: q, $options: "i" } },
  ],
});
    res.status(200).json(result);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. GET Single Batch
app.get("/api/batches/:id", async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id);

    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    res.status(200).json(batch);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. POST Batch
app.post("/api/batches", verifyToken, async (req, res) => {
  try {
   const batch = new Batch({
  batchId: req.body.batchId,
  product: req.body.product,
  quantity: req.body.quantity,
  unit: req.body.unit,
  status: req.body.status,
  });

    const savedBatch = await batch.save();

    res.status(201).json(savedBatch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. PUT Batch
app.put("/api/batches/:id", verifyToken, async (req, res) => {
  try {

    const batch = await Batch.findByIdAndUpdate(
      req.params.id,
     {
       batchId: req.body.batchId,
       product: req.body.product,
       quantity: req.body.quantity,
       unit: req.body.quantity,
       status: req.body.status,
     },
      { new: true } // updated document return karega
    );

    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    res.status(200).json(batch);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 5. DELETE Batch
app.delete("/api/batches/:id",verifyToken,async (req, res) => {
  try {

    const batch = await Batch.findByIdAndDelete(req.params.id);

    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    res.status(204).send();

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/seed", async (req, res) => {
  await Batch.deleteMany({});

  await Batch.insertMany([
  {
    batchId: "HB001",
    product: "Tulsi Essential Oil",
    quantity: 500,
    unit: "L",
    status: "Approved",
  },
  {
    batchId: "HB002",
    product: "Neem Oil",
    quantity: 300,
    unit: "L",
    status: "Pending",
  },
  {
    batchId: "HB003",
    product: "Ashwagandha Powder",
    quantity: 250,
    unit: "Kg",
    status: "Approved",
  },
  {
    batchId: "HB004",
    product: "Lemongrass Oil",
    quantity: 450,
    unit: "L",
    status: "Rejected",
  },
  {
    batchId: "HB005",
    product: "Aloe Vera Gel",
    quantity: 600,
    unit: "Kg",
    status: "Pending",
  },
]);

  res.send("Database Seeded");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});