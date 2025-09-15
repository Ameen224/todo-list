// src/pages/Tasks.jsx
// src/pages/Tasks.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../services/api";
import Navbar from "../components/Navbar";

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newTask, setNewTask] = useState("");
    const [newDisc, setNewDisc] = useState("");

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

    // Delete task
    const handleDelete = async (id) => {
        try {
            await Api.delete(`/tasks/${id}`);
            fetchTasks();
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    };

    if (loading)
        return (
            <p className="text-center mt-10 text-gray-600">Loading tasks...</p>
        );

    return (
        <div>
            <Navbar />
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
                    <ul className="space-y-4">
                        {tasks.map((task) => (
                            <li
                                key={task._id}
                                className={`p-5 rounded-xl shadow-md border-l-8 transition-all duration-300 hover:shadow-lg flex justify-between items-center bg-white ${task.completed ? "border-l-green-500" : "border-l-yellow-500"
                                    }`}
                            >
                                {/* Task Info */}
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-800">{task.title}</h3>
                                    <p className="text-sm mt-1 text-gray-600">
                                        <strong>Status:</strong>{" "}
                                        <span
                                            className={`font-medium ${task.completed ? "text-green-600" : "text-yellow-600"
                                                }`}
                                        >
                                            {task.completed ? " Completed" : " Pending"}
                                        </span>
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3">
                                    <Link
                                        to={`/tasks/${task._id}`}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition"
                                    >
                                        View
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(task._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>


                )}
            </div>
        </div>
    );
}
