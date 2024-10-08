const express = require("express");

const {
  addTask,
  getAllTasks,
  getTask,
  deleteTask,
  updateTask,
} = require("../controllers/task");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", protect, getAllTasks);
router.get("/:id", protect, getTask);
router.post("/", protect, addTask);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);
module.exports = router;
