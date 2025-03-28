import React, { useState } from "react";
import { useRole } from "./RoleContext";

export default function Dashboard() {
  const { role } = useRole();
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("Low");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("Pending");
  const [activePage, setActivePage] = useState("Dashboard"); // Controls which page is shown

  const handleAddTask = () => {
    if (!taskName || !deadline) {
      alert("Please fill all fields");
      return;
    }
    const newTask = { id: Date.now(), taskName, priority, deadline, status };
    setTasks([...tasks, newTask]);
    setTaskName("");
    setPriority("Low");
    setDeadline("");
    setStatus("Pending");
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleCompleteTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status: "Completed" } : task)));
  };

  // Function to render content dynamically
  const renderContent = () => {
    if (activePage === "Dashboard") {
      return (
        <div>
          <h2>Dashboard ({role})</h2>
          <p>Welcome to the Task Management Dashboard! Select "Tasks" from the sidebar to manage your tasks.</p>
        </div>
      );
    }

    if (activePage === "Tasks") {
      return (
        <div>
          <h2>Task List ({role})</h2>

          {role === "Admin" && (
            <div style={styles.taskForm}>
              <input type="text" placeholder="Task Name" value={taskName} onChange={(e) => setTaskName(e.target.value)} style={styles.input} />
              <select value={priority} onChange={(e) => setPriority(e.target.value)} style={styles.input}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} style={styles.input} />
              <select value={status} onChange={(e) => setStatus(e.target.value)} style={styles.input}>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
              <button onClick={handleAddTask} style={styles.addButton}>Add Task</button>
            </div>
          )}

          {tasks.length === 0 ? <p>No tasks found</p> : (
            <ul style={styles.taskList}>
              {tasks.map((task) => (
                <li key={task.id} style={styles.taskItem}>
                  <strong>{task.taskName}</strong><br />
                  Priority: {task.priority} <br />
                  Deadline: {task.deadline} <br />
                  Status: {task.status} <br />
                  {role === "Admin" && <button onClick={() => handleDeleteTask(task.id)} style={styles.deleteButton}>Delete</button>}
                  {role === "User" && task.status !== "Completed" && (
                    <button onClick={() => handleCompleteTask(task.id)} style={styles.completeButton}>Mark as Completed</button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>Task Manager</h2>
        <button onClick={() => setActivePage("Dashboard")} style={styles.sidebarButton}>🏠 Dashboard</button>
        <button onClick={() => setActivePage("Tasks")} style={styles.sidebarButton}>📝 Tasks</button>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>{renderContent()}</div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    width: "80vw",
    height: "80vh",
    fontFamily: "Arial, sans-serif",
  },
  sidebar: {
    width: "220px",
    backgroundColor: "#0F52BA",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#ffffff",
  },
  sidebarButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#0047AB",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "10px",
    textAlign: "left",
    fontSize: "16px",
  },
  mainContent: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#89CFF0",
    overflowY: "auto",
  },
  taskForm: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  addButton: {
    padding: "10px",
    backgroundColor: "#349ce4",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  taskList: {
    listStyle: "none",
    padding: 0,
  },
  taskItem: {
    border: "1px solid gray",
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "#FFFFFF",
  },
  deleteButton: {
    padding: "6px",
    backgroundColor: "#8B0000",
    color: "#fff",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "5px",
  },
  completeButton: {
    padding: "6px",
    backgroundColor: "#77dd77",
    color: "#fff",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "5px",
  },
};
