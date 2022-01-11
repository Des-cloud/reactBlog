const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const User = require("../../models/users");
require("dotenv").config();

// setting up the token (payload)
signToken = (user) => {
  return JWT.sign(
    {
      iss: "DYOR",
      sub: user.id,
      iat: new Date().getTime(),
    },
    process.env.JWT_SECRET
  );
};

router.post("/signup", async (req, res, next) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email });

  if (foundUser) {
    res.status(403).json({
      success: false,
      error: "Email is already in use",
    });
  }
  // creating a new user
  const hashSync = bcrypt.hashSync(password, 10);
  const newUser = new User({ email: email, password: hashSync, blogs: [] });
  const savedUser = await newUser.save();
  if (savedUser) {
    console.log(await bcrypt.compareSync(password, savedUser.password));
  }
  res.status(200).json({ success: true, id: newUser.id, email: newUser.email });
});

router.put("/resetPassword", async (req, res) => {
  if (req.body === undefined) {
    res
      .status(404)
      .json({ success: false, message: "Could not reset password" });
  } else {
    const { email, password, currPassword } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      if (bcrypt.compareSync(password, foundUser.password)) {
        const passwordHashed = bcrypt.hashSync(currPassword, 10);
        const query = { email: email };
        const update = {
          password: passwordHashed,
        };
        const opts = { new: true, upsert: false };
        const response = await User.findOneAndUpdate(query, update, opts);
        if (response && response.email === email) {
          res
            .status(201)
            .json({ success: true, message: "Password changed successfully" });
        } else {
          res
            .status(500)
            .json({ success: false, message: "Could not reset password" });
        }
      } else {
        res.status(400).json({ message: "Passwords don't match" });
      }
    } else {
      res.status(400).json({ message: "Wrong email" });
    }
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email });

  if (foundUser) {
    if (await bcrypt.compare(password, foundUser.password)) {
      res
        .status(200)
        .json({ success: true, email: foundUser.email, id: foundUser.id });
    } else {
      res.status(401).json({ message: "Wrong email or password" });
    }
  } else {
    res.status(400).json({ message: "Wrong email or password" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  if (id) {
    await User.deleteOne({ id: id })
      .then(() => {
        res.status(200).json({ message: "Delete Successfully", success: true });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "Delete unsuccessful", success: false });
      });
  } else {
    res.status(404).json({ message: "Page not found", success: false });
  }
});

module.exports = router;
