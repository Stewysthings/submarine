import type { Task } from './types';
import type { TaskListProps } from './TaskListProps'; // Import instead of defining inline

function formatDueDate(dueDate?: string, allDay?: boolean): string {
  if (!dueDate) return '';
  const date = new Date(dueDate);
  
  if (allDay) {
    return date.toLocaleDateString([], {
      dateStyle: 'short',
    });
  }
  
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
  isDueSoon,
  categoryLabels,
  editingId,
  editText,
  editDueDate,
  editPriority,
  setEditText,
  setEditDueDate,
  setEditPriority,
  saveEdit,
  cancelEdit,
  activeCategory,
  onCategoryChange,
}) => {
  // Type guard to handle undefined or invalid displayedTasks
  if (!displayedTasks || !Array.isArray(displayedTasks)) {
    return <p className="no-tasks">No tasks available</p>;
  }

  return (
    <div className="task-list-container">
      {displayedTasks.length > 0 ? (
        displayedTasks.map(([cat, tasks]) => (
          <div key={cat} className="category-section">
            <h2 className="category-heading">{categoryLabels[cat] || cat}</h2>
            <ul className="task-list">
              {tasks.map((task) => {
                const statusClass = !task.completed
                  ? isOverdue(task.dueDate, task.completed)
                    ? 'overdue'
                    : isDueSoon(task.dueDate)
                      ? 'due-soon'
                      : `priority-${task.priority}`
                  : 'completed';
                return (
                  <li
                    key={task.id}
                    className={`task-item ${statusClass}`}
                    aria-label={`Task: ${task.text}, ${isOverdue(task.dueDate, task.completed) && !task.completed ? 'Overdue' : isDueSoon(task.dueDate) && !task.completed ? 'Due soon' : task.completed ? 'Completed' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="task-checkbox"
                      aria-checked={task.completed}
                    />
                    {editingId === task.id ? (
                      <div className="edit-container" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEdit(task.id);
                            if (e.key === 'Escape') cancelEdit();
                          }}
                          className="edit-input"
                          placeholder="Update task description"
                          autoFocus
                          aria-label="Edit task description"
                        />
                        <input
                          type="datetime-local"
                          value={editDueDate}
                          onChange={(e) => setEditDueDate(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          className="date-picker"
                          aria-label="Edit due date"
                        />
                        <select
                          value={editPriority}
                          onChange={(e) => setEditPriority(e.target.value as 'low' | 'medium' | 'high')}
                          onClick={(e) => e.stopPropagation()}
                          className="priority-selector"
                          aria-label="Edit priority"
                        >
                          <option value="low">Low Priority</option>
                          <option value="medium">Medium Priority</option>
                          <option value="high">High Priority</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => saveEdit(task.id)}
                          className="save-button"
                          aria-label="Save task"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="cancel-button"
                          aria-label="Cancel edit"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <span
                          className={`task-text ${statusClass}`}
                          onDoubleClick={() => startEdit(task.id, task.text, task.dueDate || '', task.priority)}
                        >
                          {task.text} {task.dueDate && `(${formatDueDate(task.dueDate, task.allDay)})`}
                        </span>
                        <span className={`priority-label ${task.priority ? task.priority.toLowerCase() : 'low'}`}>
                          {task.priority || 'Low'}
                        </span>
                        <button
                          type="button"
                          onClick={() => startEdit(task.id, task.text, task.dueDate || '', task.priority)}
                          className="edit-button"
                          aria-label={`Edit task ${task.text}`}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteTask(task.id)}
                          className="delete-button"
                          aria-label={`Delete task ${task.text}`}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))
      ) : (
        <p className="no-tasks">No tasks found</p>
      )}
    </div>
  );
};

export default TaskList;