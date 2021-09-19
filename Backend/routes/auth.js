const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../MiddleWare/fetchUser");

const JWT_SECRET = "mgmahi555";

let success = false;

// * ########## Route 1 ########## *
// TODO: Create a user using POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("username", "Enter a valid username").isLength({ min: 3 }),
    body("email", "Enter a valid email address").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // ! If there are any errors, return bad request and the errors
    const errors = validationResult(req);
    success = false;
    if (!errors.isEmpty())
      return res.status(400).json({ success, errors: errors.array() });

    // TODO: Check wheather the email exists already.
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;
        return res.status(400).json({
          success,
          error: "Sorry, A user with this email already exists.",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: secPass,
      });

      // res.json(user);

      const data = {
        user: { id: user.id },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken: authToken });
    } catch (err) {
      console.log(err.message);
    }
  }
);

// * ########## Route 2 ########## *
// TODO: Authenticate a user using POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    // body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email address").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // ! If there are any errors, return bad request and the errors
    const errors = validationResult(req);
    success = false;
    if (!errors.isEmpty())
      return res.status(400).json({ success, errors: errors.array() });

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      success = false;
      if (!user)
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials!",
        });

      const passCampare = bcrypt.compare(password, user.password);
      if (!passCampare)
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials!",
        });

      const data = {
        user: { id: user.id },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// * ########## Route 3 ########## *
// TODO: Get loggedin user details using POST "/api/auth/getuser". No login required
router.post("/getuser", fetchUser, async (req, res) => {
  console.log("Hello");
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
