const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  blogs: {
    type: Array,
    required: true,
  },
});

userSchema.pre("save", function (next) {
  try {
    if (this.isModified("password")) {
      return next();
    } else {
      const passwordHashed = bcrypt.hashSync(this.password, 10);
      this.password = passwordHashed;
      next();
    }
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
