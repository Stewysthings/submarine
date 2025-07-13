import type { Task } from './types';
import { isOverdue, isDueSoon } from './utils';

interface TaskListProps {
  displayedTasks: [string, Task[]][];
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  startEdit: (id: string, text: string, dueDate: string, priority: 'low' | 'medium' | 'high') => void;
  isOverdue: (dueDate: string) => boolean;
  isDueSoon: (dueDate: string) => boolean;
  categoryLabels: Record<string, string>;
  editingId: string | null;
  editText: string;
  editDueDate: string;
  editPriority: 'low' | 'medium' | 'high';
  setEditText: (text: string) => void;
  setEditDueDate: (dueDate: string) => void;
  setEditPriority: (priority: 'low' | 'medium' | 'high') => void;
  saveEdit: (id: string) => void;
  cancelEdit: () => void;
  removingId: string | null;
}

function TaskList({
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
  removingId,
}: TaskListProps) {
  return (
    <div className="task-list">
      {displayedTasks.map(([category, tasks]) => (
        <div key={category} className="mb-6">
          <h2 className="text-xl font-bold text-cyan-300">{categoryLabels[category]}</h2>
          <ul className="space-y-2">
            {tasks.map((task) => {
              const statusClass = isOverdue(task.dueDate)
                ? 'overdue'
                : isDueSoon(task.dueDate)
                ? 'due-soon'
                : `priority-${task.priority}`;
              return (
                <li
                  key={task.id}
                  className={`task ${statusClass} ${removingId === task.id ? 'removing' : ''} p-2 rounded flex items-center space-x-2`}
                  aria-label={`Task: ${task.text}, ${isOverdue(task.dueDate) ? 'Overdue' : isDueSoon(task.dueDate) ? 'Due soon' : ''}`}
                >
                  {editingId === task.id ? (
                    <>
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1 p-1 bg-gray-700 text-white border border-gray-600 rounded"
                        aria-label="Edit task description"
                      />
                      <input
                        type="datetime-local"
                        value={editDueDate}
                        onChange={(e) => setEditDueDate(e.target.value)}
                        className="p-1 bg-gray-700 text-white border border-gray-600 rounded"
                        aria-label="Edit due date"
                      />
                      <select
                        value={editPriority}
                        onChange={(e) => setEditPriority(e.target.value as 'low' | 'medium' | 'high')}
                        className="p-1 bg-gray-700 text-white border border-gray-600 rounded"
                        aria-label="Edit priority"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                      <button
                        onClick={() => saveEdit(task.id)}
                        className="p-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="p-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        className="h-5 w-5"
                        aria-checked={task.completed}
                      />
                      <span className="flex-1 text-white">{task.text}</span>
                      <span className="text-gray-400">{task.dueDate}</span>
                      <span className={`priority-${task.priority}`}>{task.priority}</span>
                      <button
                        onClick={() => startEdit(task.id, task.text, task.dueDate, task.priority)}
                        className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        aria-label={`Edit task ${task.text}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
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
      ))}
    </div>
  );
}

export default TaskList;