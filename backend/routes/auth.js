const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt") //for hashing the password
const jwt = require('jsonwebtoken'); //token generation
const crypto = require('crypto');//token generation



//Register
router.post("/register", async (req, resp) => {
  if (req.body.username && req.body.email && req.body.password) {
    console.log("Signup Request Body:", req.body);

    try {
      let existingUser = await User.findOne({ email: req.body.email });

      //hashing the password using bcrypt and creating new password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password, salt)

      //check if user is alredy registered
      if (existingUser) {
        resp.status(409).json({ error: "User with this email already exists" });
      } else {

        //creating new user
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        });


        let savedUser = await newUser.save();
        savedUser = savedUser.toObject();
        delete savedUser.password;  //remove password from our response

        resp.json({ user: savedUser });
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
      resp.status(500).send("An error occurred during signup.");
    }
  } else {
    resp.status(400).json({ error: "username, email, and password are required" });
  }
})


//login

//secret key for token generation
const secretKey = crypto.randomBytes(32).toString('hex');
console.log("Secret Key:", secretKey);

router.post("/login", async (req, resp) => {
  if (req.body.email && req.body.password) {
    console.log("Login Request Body:", req.body);

    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        resp.status(404).json({ error: "user not found" });
        return
      }

      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        resp.status(400).json({ error: "wrong password" });
        return;
      }

      if (user && validPassword) {
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '24h' });
        resp.json({ user, token });
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      resp.status(500).send("An error occurred during login.");
      return
    }
  } else {
    resp.status(400).json({ error: "Email and password are required" });
    return;
  }
})



module.exports = router