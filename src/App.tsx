import { useState, useEffect } from "react";
import "./App.css";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const startEditing = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id: number) => {
    if (editText.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, text: editText } : task,
        ),
      );
    }
    setEditingId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const filteredTasks = tasks.filter(
    (task) =>
      filter === "all" ||
      (filter === "active" && !task.completed) ||
      (filter === "completed" && task.completed),
  );

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task"
          onKeyPress={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>
      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            {editingId === task.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") saveEdit(task.id);
                  if (e.key === "Escape") cancelEdit();
                }}
                onBlur={() => saveEdit(task.id)}
                className="edit-input"
                autoFocus
              />
            ) : (
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
                onDoubleClick={() => startEditing(task.id, task.text)}
                className="task-text"
              >
                {task.text}
              </span>
            )}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
