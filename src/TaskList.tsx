import React from 'react';
import type { Task } from './types';

// 🕒 Highlight tasks due within 24 hours
const isDueSoon = (dueDate?: string): boolean => {
  if (!dueDate) return false;
  const now = new Date().getTime();
  const due = new Date(dueDate).getTime();
  return due > now && due <= now + 24 * 60 * 60 * 1000;
};

interface TaskListProps {
  displayedTasks: [string, Task[]][];
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  startEdit: (id: number, text: string, dueDate?: string) => void;
  isOverdue: (dueDate?: string) => boolean;
  categoryLabels: Record<string, string>;
  editingId: number | null;
  editText: string;
  editDueDate: string;
  setEditText: (text: string) => void;
  setEditDueDate: (date: string) => void;
  saveEdit: () => void;
  cancelEdit: () => void;
}

function formatDueDate(dueDate?: string): string {
  if (!dueDate) return '';
  const date = new Date(dueDate);
  return date.toLocaleString([], {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

const TaskList: React.FC<TaskListProps> = ({
  displayedTasks,
  toggleTask,
  deleteTask,
  startEdit,
  isOverdue,
  categoryLabels,
  editingId,
  editText,
  editDueDate,
  setEditText,
  setEditDueDate,
  saveEdit,
  cancelEdit,
}) => {
  return (
    <>
      {displayedTasks.some(([_, tasks]) => tasks.length > 0) ? (
        displayedTasks.map(([cat, tasks]) => (
          <div key={cat} className="category-section">
            <h2>{categoryLabels[cat] || cat}</h2>
            <ul className="task-list">
              {tasks.map((task) => {
                const statusClass = !task.completed
                  ? isOverdue(task.dueDate)
                    ? 'overdue'
                    : isDueSoon(task.dueDate)
                      ? 'due-soon'
                      : ''
                  : '';

                return (
                  <li key={task.id} className={`task-item ${statusClass}`}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />

                    {/* Edit mode */}
                    {editingId === task.id ? (
                      <div className="edit-container" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEdit();
                            if (e.key === 'Escape') cancelEdit();
                          }}
                          onBlur={saveEdit}
                          className="edit-input"
                          placeholder="Update task description"
                          autoFocus
                        />
                        <input
                          type="date"
                          value={editDueDate}
                          onChange={(e) => setEditDueDate(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          className="date-picker"
                        />
                        <button type="button" onClick={saveEdit}>Save</button>
                        <button type="button" onClick={cancelEdit}>Cancel</button>
                      </div>
                    ) : (
                      <span
                        className={`task-text ${statusClass}`}
                        onDoubleClick={() => startEdit(task.id, task.text, task.dueDate)}
                      >
                        {task.text} {task.dueDate && `(${formatDueDate(task.dueDate)})`}
                      </span>
                    )}

                    <button type="button" onClick={() => deleteTask(task.id)}>Delete</button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))
      ) : (
        <p>No tasks found</p>
      )}
    </>
  );
};

export default TaskList;