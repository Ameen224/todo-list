// bakend/controllers/taskController.js
const Task = require('../models/Tasks');



exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        if(!title  || !description){
            return res.status(400).json({message:'All fields are required'});
        }
        const newTask = new Task({title,description,user:req.user.id})

        await newTask.save()
        res.status(201).json({message:'task created',newTask})
    }
    catch (err) {
        console.error("Create Task error:", err);
        res.status(500).json({ message: "server error" });
    }
}

exports.getallTasks = async (req, res) => {
    try {
        const tasks = await Task.find({user:req.user.id});
        res.status(200).json({tasks})
    } catch (err) {
        console.error("Get All Tasks error:", err);
        res.status(500).json({ message: "server error" });
    }
}


exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Error fetching task", error: err.message });
  }
};



exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;

        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: "task not found" });
        }
        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "unauthorized" });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        if (completed !== undefined) {
            task.completed = completed;
        }

        await task.save();
        res.status(200).json({ message: "task updated", task });
    } catch (err) {
        console.error("Update Task error:", err);
        res.status(500).json({ message: "server error" });
    }
}


exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task", error: err.message });
  }
};

exports.toggleTaskCompletion = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    task.completed = !task.completed; // toggle status
    await task.save();

    res.json({ message: "Task status updated", task });
  } catch (err) {
    res.status(500).json({ message: "Error updating task", error: err.message });
  }
};


