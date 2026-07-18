const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    message: "Too many requests. Please try again after 15 minutes.",
  },
});

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

// Register Route
router.post("/register", authLimiter ,  registerUser);

// Login Route
router.post("/login", authLimiter ,  loginUser);

const passport = require("passport");

router.get(
  "/google",
  (req, res, next) => {
    console.log("GOOGLE ROUTE HIT");
    next();
  },
 passport.authenticate("google", {
  scope: ["profile", "email"],
  prompt: "select_account",
})
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: true,
  }),
  (req, res) => {
    console.log("AFTER AUTH");

    const token = jwt.sign(
      {
        id: req.user._id,
        email: req.user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("TOKEN CREATED");
    console.log(token);

    console.log("REDIRECTING...");

    res.redirect(`http://localhost:5173/oauth-success?token=${token}`);
  }
);

module.exports = router;