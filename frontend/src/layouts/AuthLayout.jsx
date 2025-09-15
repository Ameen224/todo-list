// src/layouts/AuthLayout.jsx
import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function AuthLayout() {
  const token = localStorage.getItem("token");

  // if logged in, redirect to tasks
  if (token) {
    return <Navigate to="/tasks" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Outlet />
    </div>
  );
}

