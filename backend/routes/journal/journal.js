const express = require("express");
const router = express.Router();
const User = require("../../models/users");

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await User.findOne({ _id: id })
    .then((resp) => {
      res.status(200).json(resp.blogs);
    })
    .catch((err) => {
      res.status(500).json({ message: "Database error" });
    });
});

router.post("/:id", async (req, res) => {
  const id = req.params.id;
  if (req.body === undefined) {
    res.status(404).json({ success: false, message: "Could not save Post" });
  } else {
    const newPost = {
      id: Date.now().toString(),
      title: req.body.title,
      post: req.body.post,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
    };
    const resp = await User.findOne({ _id: id }, { blogs: 1, _id: 0 });
    if (resp) {
      if (resp.blogs) {
        const query = { _id: id };
        const update = {
          blogs: [...resp.blogs, newPost],
        };
        const opts = { new: true, upsert: false };
        const response = await User.findOneAndUpdate(query, update, opts);
        if (response && response.id === id) {
          res
            .status(200)
            .json({ success: true, message: "Blog posted successfully" });
        } else {
          res
            .status(500)
            .json({ success: false, message: "Could not post blog" });
        }
      } else {
        res.status(403).json({ message: "No blog found" });
      }
    } else {
      res.status(401).json({ message: "No such user with such ID found" });
    }
  }
});

module.exports = router;
