// Dashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskTable from "./TaskTable";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Todo",
  });
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [filter, tasks]);

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchTasks = async () => {
    try {
      setError("");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/tasks`,
        config
      );
      setTasks(res.data.data);
    } catch (error) {
      setError("Failed to fetch tasks. Please try again later.");
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      setError("");
      console.log(newTask.dueDate);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/tasks`,
        newTask,
        config
      );
      setNewTask({
        title: "",
        description: "",
        dueDate: "",
        status: "Todo",
      });
      fetchTasks();
    } catch (error) {
      setError("Failed to create task. Please try again.");
    }
  };

  const deleteTask = async (id) => {
    try {
      setError("");
      await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`, config);
      fetchTasks();
    } catch (error) {
      setError("Failed to delete task. Please try again.");
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      setError("");
      await axios.put(
        `${import.meta.env.VITE_API_URL}/tasks/${id}`,
        updatedTask,
        config
      );
      fetchTasks();
    } catch (error) {
      setError("Failed to update task. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const filterTasks = () => {
    if (filter === "all") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter((task) => task.status === filter));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-6 rounded shadow-md max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Task Management</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={createTask}>
          <div className="space-y-4 mb-4">
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={newTask.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              name="description"
              placeholder="Task Description"
              value={newTask.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="date"
              name="dueDate"
              value={newTask.dueDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />

            <div className="mb-4">
              <label htmlFor="status" className="block mb-1">
                Status
              </label>
              <select
                name="status"
                value={newTask.status}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="Todo">Todo</option>
                <option value="Inprogess">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full"
            >
              Add Task
            </button>
          </div>
        </form>
        {/* Filter */}
        <div className="flex justify-around mb-4">
          <button
            onClick={() => setFilter("all")}
            className={`p-2 rounded ${
              filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("Todo")}
            className={`p-2 rounded ${
              filter === "Todo" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Todo
          </button>
          <button
            onClick={() => setFilter("Inprogess")}
            className={`p-2 rounded ${
              filter === "Inprogess" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setFilter("Completed")}
            className={`p-2 rounded ${
              filter === "Completed" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Completed
          </button>
        </div>

        {filteredTasks.length === 0 && !error && (
          <p className="text-center text-gray-500">No tasks found.</p>
        )}

        <TaskTable
          tasks={filteredTasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
}

export default Dashboard;
