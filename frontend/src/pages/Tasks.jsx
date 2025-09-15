// src/pages/Tasks.jsx
import React, { useEffect, useState } from "react";
import Api from "../services/api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState("");
  const [newDisc, setNewDisc] = useState("");
  const [editingTask, setEditingTask] = useState(null); // track editing task
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await Api.get("/tasks");
      setTasks(res.data.tasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      await Api.post("/tasks", { title: newTask, description: newDisc });
      setNewTask("");
      setNewDisc("");
      fetchTasks();
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // Toggle complete
  const handleToggleComplete = async (id, completed) => {
    try {
      await Api.put(`/tasks/${id}`, { completed: !completed });
      fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await Api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Start editing
  const startEditing = (task) => {
    setEditingTask(task._id);
    setEditTitle(task.title);
    setEditDesc(task.description || "");
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingTask(null);
    setEditTitle("");
    setEditDesc("");
  };

  // Save edit
  const handleSaveEdit = async (id) => {
    try {
      await Api.put(`/tasks/${id}`, { title: editTitle, description: editDesc });
      cancelEditing();
      fetchTasks();
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading tasks...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="flex flex-col gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter task title"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Enter task description"
          value={newDisc}
          onChange={(e) => setNewDisc(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </form>

      {/* Task List */}
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet.</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="p-4 bg-white rounded shadow flex justify-between items-center"
            >
              {editingTask === task._id ? (
                <div className="flex flex-col gap-2 w-full">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                  <input
                    type="text"
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleSaveEdit(task._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task._id, task.completed)}
                      className="h-5 w-5"
                    />
                    <span
                      className={task.completed ? "line-through text-gray-500" : ""}
                    >
                      {task.title}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditing(task)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
