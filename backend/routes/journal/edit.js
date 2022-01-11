const express = require("express");
const router = express.Router();
const User = require("../../models/users");

router.get("/", async (req, res) => {
  res.status(404).json({
    message: "Page not found",
  });
});

router.get("/:user/:id", async (req, res) => {
  const user = req.params.user;
  const id = req.params.id;
  if (user === undefined || id === undefined) {
    res.status(404).json({
      message: "Page not found",
    });
  } else {
    await User.findOne({ _id: user }, { blogs: 1, _id: 0 })
      .then((resp) => {
        const blog = resp.blogs.filter((blog) => blog.id === id);
        if (blog) res.status(200).json(blog[0]);
        else res.status(401).json({ message: "No journal with such ID found" });
      })
      .catch((err) => {
        res.status(500).json({ message: "Database error" });
      });
  }
});

router.put("/:user/:id", async (req, res) => {
  const user = req.params.user;
  const id = req.params.id;
  const { title, post } = req.body;
  const newPost = {
    id: Date.now().toString(),
    title: title,
    post: post,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };

  if (user === undefined || id === undefined) {
    res.status(404).json({
      message: "Page not found",
    });
  } else {
    const resp = await User.findOne({ _id: user }, { blogs: 1, _id: 0 });
    if (resp) {
      if (resp.blogs) {
        let oldBlogs = resp.blogs.filter((blog) => blog.id !== id);
        oldBlogs.push(newPost);
        const query = { _id: user };
        const update = { blogs: oldBlogs };
        const opts = { new: true, upsert: true };

        const result = await User.findOneAndUpdate(query, update, opts);
        if (result && result.id === user) {
          res.status(201).json({ message: "Update successful" });
        } else {
          res.status(500).json({ message: "Database error" });
        }
      } else res.status(401).json({ message: "No journal with such ID found" });
    } else res.status(401).json({ message: "No such user with such ID found" });
  }
});

router.delete("/:user/:id", async (req, res) => {
  const user = req.params.user;
  const id = req.params.id;

  if (user === undefined || id === undefined) {
    res.status(404).json({
      message: "Page not found",
    });
  } else {
    const resp = await User.findOne({ _id: user }, { blogs: 1, _id: 0 });
    if (resp) {
      if (resp.blogs) {
        let oldBlogs = resp.blogs.filter((blog) => blog.id !== id);
        const query = { _id: user };
        const update = { blogs: oldBlogs };
        const opts = { new: true, upsert: true };
        const result = await User.findOneAndUpdate(query, update, opts);
        if (result && result.id === user) {
          res.status(201).json({ message: "Delete successful" });
        } else {
          res.status(500).json({ message: "Database error" });
        }
      } else res.status(401).json({ message: "No journal with such ID found" });
    } else {
      res.status(401).json({ message: "No such user with such ID found" });
    }
  }
});

module.exports = router;
