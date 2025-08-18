import React from "react";
import { Link, Outlet } from "react-router-dom";

export function Sidebar() {
  return (
    <div className="flex h-screen">
      {/* Sidebar menu */}
      <aside className="w-64 bg-blue-600 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <Link to="dashboard" className="hover:bg-blue-500 p-2 rounded">
            Dashboard
          </Link>
          <Link to="course" className="hover:bg-blue-500 p-2 rounded">
            Users
          </Link>
         
        </nav>
      </aside>

      {/* Main content area */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
    
        <Outlet /> {/* Nested routes will render here */}
      </main>
    </div>
  );
}
