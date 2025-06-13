import { useState, useEffect } from 'react';
import './App.css';
import type { Task } from './types';

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [editDueDate, setEditDueDate] = useState('');
  const [category, setCategory] = useState<'all' | 'today' | 'thisweek' | 'thismonth' | 'someday'>('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: input,
          completed: false,
          dueDate: dueDate || undefined,
        },
      ]);
      setInput('');
      setDueDate('');
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEdit = (id: number, text: string, dueDate?: string) => {
    setEditingId(id);
    setEditText(text);
    setEditDueDate(dueDate || '');
  };

  const saveEdit = (id: number) => {
    if (editText.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === id
            ? { ...task, text: editText, dueDate: editDueDate || undefined }
            : task
        )
      );
      cancelEdit();
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
    setEditDueDate('');
  };

  // Date setup
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const weekEnd = new Date(today);
  weekEnd.setDate(today.getDate() + (6 - today.getDay())); // Saturday

  const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const categoryLabels: Record<string, string> = {
  today: 'Today',
  thisweek: 'This Week',
  thismonth: 'This Month',
  someday: 'Someday',
};


  const categorizeTask = (task: Task): 'today' | 'thisweek' | 'thismonth' | 'someday' => {
    if (!task.dueDate) return 'someday';

    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);

    if (due.getTime() === today.getTime()) return 'today';
    if (due <= weekEnd) return 'thisweek';
    if (due <= monthEnd) return 'thismonth';
    return 'someday';
  };

  const categorizedTasks: Record<string, Task[]> = {
    today: [],
    thisweek: [],
    thismonth: [],
    someday: [],
  };

  tasks
    .filter((task) => !task.completed)
    .forEach((task) => {
      const cat = categorizeTask(task);
      categorizedTasks[cat].push(task);
    });

  const displayedTasks = category === 'all'
    ? Object.entries(categorizedTasks)
    : [[category, categorizedTasks[category]]];

  return (
    <div className="app">
      <h1>To-Do List</h1>

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task"
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="filter-buttons">
        <button onClick={() => setCategory('all')}>All</button>
        <button onClick={() => setCategory('today')}>Today</button>
        <button onClick={() => setCategory('thisweek')}>This Week</button>
        <button onClick={() => setCategory('thismonth')}>This Month</button>
        <button onClick={() => setCategory('someday')}>Someday</button>
      </div>

      {displayedTasks.map(([cat, tasks]) => (
        <div key={cat} className="category-section">
          <h2>{categoryLabels[cat]}</h2>

          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className="task-item">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                {editingId === task.id ? (
                  <div className="edit-container">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveEdit(task.id);
                        if (e.key === 'Escape') cancelEdit();
                      }}
                      className="edit-input"
                      autoFocus
                    />
                    <input
                      type="date"
                      value={editDueDate}
                      onChange={(e) => setEditDueDate(e.target.value)}
                      className="form-control"
                    />
                    <button onClick={() => saveEdit(task.id)}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </div>
                ) : (
                  <span
                    onDoubleClick={() => startEdit(task.id, task.text, task.dueDate)}
                    className="task-text"
                    style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                  >
                    {task.text} {task.dueDate && `(${task.dueDate})`}
                  </span>
                )}
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
