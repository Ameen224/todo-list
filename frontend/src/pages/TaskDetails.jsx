// src/pages/TaskDetails.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../services/api";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const fetchTask = async () => {
    try {
      const res = await Api.get(`/tasks/${id}`);
      setTask(res.data);
      setEditTitle(res.data.title);
      setEditDesc(res.data.description || "");
    } catch (err) {
      console.error("Error fetching task:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  // Save Edit
  const handleSave = async () => {
    try {
      await Api.put(`/tasks/${id}`, { title: editTitle, description: editDesc });
      setIsEditing(false);
      fetchTask();
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  // Toggle complete
  const handleToggleComplete = async () => {
    try {
      await Api.put(`/tasks/${id}`, { completed: !task.completed });
      fetchTask();
    } catch (err) {
      console.error("Error toggling task:", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading task...</p>;
  if (!task) return <p className="text-center mt-10 text-red-500">Task not found.</p>;

  return (
  <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border">
    {isEditing ? (
      <>
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="border text-black rounded px-2 py-1 w-full mb-2"
        />
        <textarea
          value={editDesc}
          onChange={(e) => setEditDesc(e.target.value)}
          className="border text-black rounded px-2 py-1 w-full mb-2"
        />
        <button
          onClick={handleSave}
          className="bg-green-500 text-black px-4 py-2 rounded mr-2 hover:bg-green-600"
        >
          Save
        </button>
        <button
          onClick={() => setIsEditing(false)}
          className="bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </>
    ) : (
      <>
        <div className="bg-gray-50 p-6 rounded-xl shadow border">
          {/* Title */}
          <h1 className="text-3xl font-bold mb-3 text-gray-800">{task.title}</h1>

          {/* Description */}
          <p className="text-gray-600 mb-4 ">
            {task.description || "No description provided."}
          </p>

          {/* Status */}
          <p className="mb-6">
            <strong className="text-gray-700">Status:</strong>{" "}
            <span
              className={`font-medium ${
                task.completed ? "text-green-700" : "text-yellow-700"
              }`}
            >
              {task.completed ? " Completed" : " Pending"}
            </span>
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-black px-5 py-2 rounded-lg font-medium hover:bg-yellow-600 transition"
            >
              Edit
            </button>
            <button
              onClick={handleToggleComplete}
              className={`px-5 py-2 rounded-lg font-medium transition ${
                task.completed
                  ? "bg-gray-500 hover:bg-gray-600 text-black"
                  : "bg-blue-500 hover:bg-blue-600 text-black"
              }`}
            >
              {task.completed ? "Mark Pending" : "Mark Complete"}
            </button>
          </div>
        </div>
      </>
    )}

    {/* Meta info */}
    <p className="text-sm text-gray-500 mt-4">
      Created: {new Date(task.createdAt).toLocaleString()}
    </p>
    <p className="text-sm text-gray-500">
      Updated: {new Date(task.updatedAt).toLocaleString()}
    </p>

    <button
      onClick={() => navigate("/tasks")}
      className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
    >
      Back to Tasks
    </button>
  </div>
);
}
