import React from 'react';

interface TaskInputProps {
  input: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  allDay: boolean; // Add this
  setInput: (value: string) => void;
  setDueDate: (value: string) => void;
  setPriority: (value: 'low' | 'medium' | 'high') => void;
  setAllDay: (value: boolean) => void; // Add this
  addTask: () => void;
}

const TaskInput: React.FC<TaskInputProps> = ({
  input,
  dueDate,
  priority,
  allDay, // Add this
  setInput,
  setDueDate,
  setPriority,
  setAllDay, // Add this
  addTask,
}) => {
  return (
    <div className="task-input-container mb-4">
      <div className="flex space-x-2 mb-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task"
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          className="flex-1 p-2 bg-gray-800 text-white border border-gray-600 rounded"
          aria-label="Task description"
        />
        
        <input
          type={allDay ? "date" : "datetime-local"}
          value={allDay ? dueDate.split('T')[0] : dueDate}
          onChange={(e) => {
            if (allDay) {
              // For all-day tasks, set time to noon
              setDueDate(e.target.value ? `${e.target.value}T12:00` : '');
            } else {
              setDueDate(e.target.value);
            }
          }}
          className="p-2 bg-gray-800 text-white border border-gray-600 rounded"
          aria-label="Task due date"
        />
        
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
          className="p-2 bg-gray-800 text-white border border-gray-600 rounded"
          aria-label="Task priority"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        
        <button
          type="button"
          onClick={addTask}
          className="p-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
        >
          Add Task
        </button>
      </div>
      
      {/* All Day checkbox - only show if there's a date */}
      {dueDate && (
        <div className="flex items-center space-x-2">
          <label className="flex items-center space-x-2 text-white cursor-pointer">
            <input
              type="checkbox"
              checked={allDay}
              onChange={(e) => {
                console.log('All day checkbox changed:', e.target.checked);
                setAllDay(e.target.checked);
                // If switching to all-day and there's a date, set time to noon
                if (e.target.checked && dueDate) {
                  const dateOnly = dueDate.split('T')[0];
                  setDueDate(`${dateOnly}T12:00`);
                }
              }}
              className="w-4 h-4 text-cyan-600 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500"
            />
            <span className="text-sm">All day task</span>
          </label>
        </div>
      )}
    </div>
  );
};

export default TaskInput;
