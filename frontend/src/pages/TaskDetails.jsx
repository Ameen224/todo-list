// src/pages/TaskDetails.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../services/api";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTask = async () => {
    try {
      const res = await Api.get(`/tasks/${id}`);
      setTask(res.data);
    } catch (err) {
      console.error("Error fetching task:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading task...</p>;
  if (!task) return <p className="text-center mt-10 text-red-500">Task not found.</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{task.title}</h1>
      <p className="text-gray-700 mb-2">{task.description || "No description"}</p>
      <p className="mb-2">
        <strong>Status:</strong>{" "}
        <span className={task.completed ? "text-green-600" : "text-yellow-600"}>
          {task.completed ? "Completed ✅" : "Pending ⏳"}
        </span>
      </p>
      <p className="text-sm text-gray-500">
        Created: {new Date(task.createdAt).toLocaleString()}
      </p>
      <p className="text-sm text-gray-500">
        Updated: {new Date(task.updatedAt).toLocaleString()}
      </p>

      <button
        onClick={() => navigate("/tasks")}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Back to Tasks
      </button>
    </div>
  );
}
