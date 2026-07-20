const express = require("express");
const router = express.Router();

const { generateQualityReport } = require("../controllers/aiController");

// POST /api/ai/quality-report
router.post("/quality-report", generateQualityReport);

module.exports = router;