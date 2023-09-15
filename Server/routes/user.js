const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Update user
router.put("/:id", async (req, resp) => {
  try {
    const loggedInUserId = req.params.id; // Assuming the user ID is available in req.user

    if (req.body.userId === loggedInUserId || req.body.isAdmin) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }

      const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

      if (!user) {
        return resp.status(404).json({ error: "User not found." });
      }

      resp.status(200).json({ message: "Account has been updated!" });
    } else {
      resp.status(403).json({ error: "You can update only your account!" });
    }
  } catch (err) {
    resp.status(500).json({ error: "An error occurred while updating the user.", specificError: err.message });
  }
});

// Delete user
router.delete("/:id", async (req, resp) => {

  const loggedInUserId = req.params.id; // Assuming the user ID is available in req.user

  if (req.body.userId === loggedInUserId || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      resp.status(200).json({ message: "Account has been deleted" });
    } catch (err) {
      resp.status(500).json({ error: "An error occurred while updating the user.", specificError: err.message });
    }
  } else {
    resp.status(403).json({ error: "You can delete only your account!" });
  }
});

// Get a user

router.get('/', async (req, resp) => {

  const userId=req.query.userId;
  const username=req.query.username
console.log(username)
  try {
    const user = userId 
    ? await User.findById(userId)
    : await User.findOne({username:username})
    const { password, isAdmin, updatedAt, ...other } = user._doc // we will be passing the other fields apart from the three fields we have defined
    resp.status(200).json(other);
  } catch (err) {
    resp.status(500).json(err);
  }

});

// Follow a user

router.put('/:id/follow', async (req, resp) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);  //the one who is unfollowing someone
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } })
        resp.status(200).json("User has been followed")
      } else {
        resp.status(403).json("You already follow this user")
      }
    } catch (err) {
      resp.status(500).json(err);
    }

  } else {
    resp.status(403).json("you cannot follow yourself")
  }
})

// Unfollow a user

router.put('/:id/unfollow', async (req, resp) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);  //the one who is unfollowing someone
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } })
        resp.status(200).json("User has been unfollowed")
      } else {
        resp.status(403).json("You donot follow this user")
      }
    } catch (err) {
      resp.status(500).json(err);
    }

  } else {
    resp.status(403).json("you cannot unfollow yourself")
  }
})



module.exports = router;
