const router= require("express").Router();
const User=require("../models/User")
const bcrypt= require("bcrypt") //for hashing the password

//register
router.post("/register", async(req,resp)=>{
    if (req.body.username && req.body.email && req.body.password) {
        console.log("Signup Request Body:", req.body);
    
        try {
          let existingUser = await User.findOne({ email: req.body.email });
    
          //hashing the password using bcrypt and creating new password
          const salt= await bcrypt.genSalt(10)
          const hashedPassword= await bcrypt.hash(req.body.password,salt)

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
  
module.exports= router