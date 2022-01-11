const mongoose = require("mongoose");
const schemaOptions = {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
};

const JournalSchema = new mongoose.Schema(
  {
    title: {
      required: [true, "Please add a title"],
      type: String,
      trim: true,
      maxlength: [50, "Title cannot exceed 50 characters"],
      default: "Untitled",
    },
    post: {
      type: String,
      required: [true, "Content cannot be empty"],
    },
    year: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    day: {
      type: Number,
      required: true,
    },
  },
  schemaOptions
);

const journalModel = mongoose.model("journals", JournalSchema);

module.exports = journalModel;
