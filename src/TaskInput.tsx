import React from 'react';

interface TaskInputProps {
  input: string;
  dueDate: string;
  setInput: (value: string) => void;
  setDueDate: (value: string) => void;
  addTask: () => void;
}

const TaskInput: React.FC<TaskInputProps> = ({
  input,
  dueDate,
  setInput,
  setDueDate,
  addTask,
}) => {
  return (
    <div className="input-container">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a task"
        onKeyDown={(e) => e.key === 'Enter' && addTask()}
        className="task-input"
      />
      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="date-picker"
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};

export default TaskInput;