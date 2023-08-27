const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Update user
router.put("/:id", async (req, resp) => {
  console.log(req.body)
  try {
    const loggedInUserId = req.params.id; // Assuming the user ID is available in req.user

    if (req.body.userId === loggedInUserId || req.user.isAdmin) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }

      const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

      if (!updatedUser) {
        return resp.status(404).json({ error: "User not found." });
      }

      resp.status(200).json({ message: "Account has been updated!", user: updatedUser });
    } else {
      resp.status(403).json({ error: "You can update only your account or must be an admin." });
    }
  } catch (err) {
    console.error("Error updating user:", err);
    resp.status(500).json({ error: "An error occurred while updating the user.", specificError: err.message });
  }
});

// Delete user
// Get a user
// Follow a user
// Unfollow a user

module.exports = router;
