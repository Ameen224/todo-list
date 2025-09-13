// bakend/controllers/taskController.js

const express = require("express");
const {
  createTask,
  getallTasks,
  getTaskById,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
} = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createTask);
router.get("/", getallTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/toggle", toggleTaskCompletion);


module.exports = router;
