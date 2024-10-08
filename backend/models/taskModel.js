const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please add a Task title"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    dueDate: {
      type: String,
    },
    status: {
      type: String,
      required: [true, "Please select a status"],
      enum: ["Todo", "Inprogess", "Completed"],
      default: "Todo",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
