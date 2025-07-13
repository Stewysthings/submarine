import React, { useState } from 'react';

interface TaskInputProps {
  input: string;
  dueDate: string;
  setInput: (value: string) => void;
  setDueDate: (value: string) => void;
  addTask: (priority: 'low' | 'medium' | 'high') => void;
}


const TaskInput: React.FC<TaskInputProps> = ({
  input,
  dueDate,
  setInput,
  setDueDate,
  addTask,
}) => {
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleAdd = () => {
    if (!input.trim()) return;
    addTask(priority);
  };

  return (
    <div className="input-container">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a task"
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        className="task-input"
      />

      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="date-picker"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
        className="priority-selector"
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>

      <button type="button" onClick={handleAdd}>Add Task</button>
    </div>
  );
};

export default TaskInput;