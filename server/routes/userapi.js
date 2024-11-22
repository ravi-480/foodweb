const express = require("express");
const user = require("../models/user");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Token = require("../models/token");
const SECRET_KEY = "sdsdbsdsksd";

//api/user/adduser
//api/user/adduser
router.post("/adduser", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({
          sts: 1,
          msg: "Email already exists. Please use a different email.",
        });
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new user({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    return res
      .status(201)
      .json({ sts: 0, msg: "User registered successfully.", savedUser });
  } catch (error) {
    console.error("Error during registration:", error);
    return res
      .status(500)
      .json({ sts: 2, msg: "Internal server error.", error });
  }
});

// login
router.post("/userlogin", async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ sts: 1, msg: "Email and password are required." });
  }

  try {
    // Check if user exists
    const login = await user.findOne({ email });
    if (!login) {
      return res.json({ sts: 1, msg: "Email not found." });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, login.password);
    if (!isPasswordValid) {
      return res.json({ sts: 2, msg: "Password does not match." });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: login._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    const tokenSave = new Token({
      userid: login._id,
      token,
      expiresAt,
    });
    const uname = login.name;
    const uemail = login.email;
    await tokenSave.save();
    return res
      .status(200)
      .json({ sts: 0, msg: "Login successful.", uname, token, uemail });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ sts: 3, msg: "Internal server error." });
  }
});
router.get("/viewuser", async (req, res) => {
  try {
    const users = await user.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/checktoken", async (req, res) => {
  const token = req.body.token;
  try {
    const tokencheck = await Token.findOne({ token });
    if (!token) {
      return res.json({ tokensts: 1 });
    } else {
      return res.json({ tokensts: 0 });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
