const Task = require("../models/taskModel");
const asyncHandler = require("express-async-handler");

exports.addTask = asyncHandler(async (req, res) => {
  const { title, description, duedate, status } = req.body;

  // Stroing User from request header
  const userID = req.user._id;

  // Validate Task Title & description

  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: "Please provide an title and description",
    });
  }

  const task = await Task.create({
    title,
    description,
    duedate,
    status,
    user: userID,
  });

  res.status(200).json({
    success: true,
    data: task,
  });
});

exports.getAllTasks = asyncHandler(async (req, res) => {
  // Stroing User from request header
  const userID = req.user._id;

  const task = await Task.find({
    user: userID,
  });

  res.status(200).json({
    success: true,
    data: task,
  });
});

exports.getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404).json({
      success: false,
      message: `Task not Found with id of ${req.params.id}`,
    });
  }
  res.status(200).json({
    success: true,
    data: task,
  });
});

exports.deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404).json({
      success: false,
      message: `Task not Found with id of ${req.params.id}`,
    });
  }

  //Making sure user is task owner
  if (task.user.toString() !== req.user.id) {
    return res.status(401).json({
      success: false,
      message: `User ${req.params.id} is not authorized to delete this task`,
    });
  }
  await task.deleteOne();
  res.status(200).json({
    success: true,
    data: task,
  });
});

exports.updateTask = asyncHandler(async (req, res) => {
  let task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404).json({
      success: false,
      message: `Task not Found with id of ${req.params.id}`,
    });
  }

  //Making sure user is task owner
  if (task.user.toString() !== req.user.id) {
    return res.status(401).json({
      success: false,
      message: `User ${req.params.id} is not authorized to delete this task`,
    });
  }

  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: task,
  });
});
