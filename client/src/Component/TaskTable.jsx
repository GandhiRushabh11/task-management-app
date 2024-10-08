import React, { useState } from "react";

function TaskTable({ tasks, updateTask, deleteTask }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Todo",
  });

  const handleEditClick = (task) => {
    setEditingTaskId(task._id);
    setEditedTask({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleUpdateTask = (id) => {
    updateTask(id, editedTask);
    setEditingTaskId(null);
  };

  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr className="bg-gray-200">
          <th className="py-2 px-4 border-b">Title</th>
          <th className="py-2 px-4 border-b">Description</th>
          <th className="py-2 px-4 border-b">Due Date</th>
          <th className="py-2 px-4 border-b">Status</th>
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task._id} className="border-b">
            <td className="py-2 px-4">
              {editingTaskId === task._id ? (
                <input
                  type="text"
                  name="title"
                  value={editedTask.title}
                  onChange={handleInputChange}
                  className="p-1 border rounded"
                  required
                />
              ) : (
                task.title
              )}
            </td>
            <td className="py-2 px-4">
              {editingTaskId === task._id ? (
                <textarea
                  name="description"
                  value={editedTask.description}
                  onChange={handleInputChange}
                  className="p-1 border rounded"
                  required
                />
              ) : (
                task.description
              )}
            </td>
            <td className="py-2 px-4">
              {editingTaskId === task._id ? (
                <input
                  type="date"
                  name="dueDate"
                  value={editedTask.dueDate}
                  onChange={handleInputChange}
                  className="p-1 border rounded"
                />
              ) : (
                task.dueDate
              )}
            </td>
            <td className="py-2 px-4">
              {editingTaskId === task._id ? (
                <select
                  name="status"
                  value={editedTask.status}
                  onChange={handleInputChange}
                  className="p-1 border rounded"
                >
                  <option value="Todo">Todo</option>
                  <option value="Inprogess">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              ) : (
                task.status
              )}
            </td>
            <td className="py-2 px-4">
              {editingTaskId === task._id ? (
                <>
                  <button
                    onClick={() => handleUpdateTask(task._id)}
                    className="bg-green-500 hover:bg-green-600 text-white p-1 rounded mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTaskId(null)}
                    className="bg-gray-500 hover:bg-gray-600 text-white p-1 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEditClick(task)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-1 rounded"
                  >
                    Delete
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskTable;
