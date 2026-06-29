require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// In-memory data
let batches = [
  { id: 1, name: "HB001", status: "Approved" },
  { id: 2, name: "HB002", status: "Pending" },
  { id: 3, name: "HB003", status: "Approved" }
];

// 1. GET All Batches
app.get("/api/batches", (req, res) => {
  res.status(200).json(batches);
});

// 6. SEARCH Batch
app.get("/api/batches/search", (req, res) => {

  const q = req.query.q || "";

  const result = batches.filter(batch =>
    batch.name.toLowerCase().includes(q.toLowerCase())
  );

  res.status(200).json(result);
});

// 2. GET Single Batch
app.get("/api/batches/:id", (req, res) => {
  const batch = batches.find(
    b => b.id === parseInt(req.params.id)
  );

  if (!batch) {
    return res.status(404).json({ message: "Batch not found" });
  }

  res.status(200).json(batch);
});

// 3. POST Batch
app.post("/api/batches", (req, res) => {

  const newBatch = {
    id: batches.length + 1,
    name: req.body.name,
    status: req.body.status
  };

  batches.push(newBatch);

  res.status(201).json(newBatch);
});

// 4. PUT Batch
app.put("/api/batches/:id", (req, res) => {

  const batch = batches.find(
    b => b.id === parseInt(req.params.id)
  );

  if (!batch) {
    return res.status(404).json({ message: "Batch not found" });
  }

  batch.name = req.body.name;
  batch.status = req.body.status;

  res.status(200).json(batch);
});

// 5. DELETE Batch
app.delete("/api/batches/:id", (req, res) => {

  const index = batches.findIndex(
    b => b.id === parseInt(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({ message: "Batch not found" });
  }

  batches.splice(index, 1);

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});