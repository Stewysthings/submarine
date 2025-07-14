// Import React hooks and components for the app
import { useState, useMemo } from 'react';
import './AppLayout.css'; // Import layout styles
import './ButtonStyles.css'; // Import button styles
import './TaskStyles.css'; // Import task-related styles
import './FormStyles.css'; // Import form and input styles
import TaskInput from './TaskInput'; // Input component for adding tasks
import TaskList from './TaskList'; // Component to display tasks
import FilterButtons from './FilterButtons'; // Filter buttons component
import { isOverdue, isDueSoon, categorizeTask, categoryLabels } from './utils'; // Utility functions
import { useTaskManager } from './hooks/useTaskManager'; // Custom task management hook
import React from 'react'; // React library
import type { Task, TaskCategory } from './types';

/* ErrorBoundary class to catch and display JavaScript errors gracefully */
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: string | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: null }; // Initialize error state
  }

  componentDidCatch(error: Error) {
    this.setState({ error: error.message }); // Update state with error message
  }

  render() {
    if (this.state.error) return <div className="error">Error: {this.state.error}</div>; // Show error if present
    return this.props.children; // Render children if no error
  }
}

function App() {
  const {
    tasks,
    editingState,
    setEditingState,
    addTask,
    deleteTask,
    toggleTask,
    startEdit,
    saveEdit,
    cancelEdit,
  } = useTaskManager(); // Destructure task management functions and state

  const [category, setCategory] = useState<TaskCategory>('all'); // State to manage active filter category

  const [input, setInput] = useState(''); // State for task input text
  const [dueDate, setDueDate] = useState(''); // State for task due date
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low'); // State for task priority

  // Memoize task categorization to improve performance
  const categorizedTasks = useMemo(() => {
    const categories: Record<string, Task[]> = {
      completed: [],
      overdue: [],
      dueSoon: [],
      today: [],
      thisweek: [],
      thismonth: [],
      someday: [],
    };
    tasks.forEach((task) => {
      if (task.completed) {
        categories.completed.push(task); // Categorize completed tasks
      } else if (isOverdue(task.dueDate, task.completed)) {
        categories.overdue.push(task); // Categorize overdue tasks
      } else if (isDueSoon(task.dueDate)) {
        categories.dueSoon.push(task); // Categorize due soon tasks
      } else {
        const cat = categorizeTask(task);
        categories[cat].push(task); // Categorize other tasks
      }
    });
    return categories;
  }, [tasks]);

  // Memoize displayed tasks with a default value
  const displayedTasks: [string, Task[]][] = useMemo(() => {
    if (!categorizedTasks) return []; // Default to empty array if categorizedTasks is undefined
    const nonEmptyCategories = Object.entries(categorizedTasks).filter(([_, tasks]) => tasks.length > 0);
    return category === 'all'
      ? nonEmptyCategories
      : [[category, categorizedTasks[category] ?? []]]; // Use nullish coalescing for safety
  }, [category, categorizedTasks]);

  console.log('App is rendering, number of tasks:', tasks.length); // Log rendering details

  return (
    <ErrorBoundary>
      <div className="app">
        <h1>To-Do List</h1>
        <p className="submarine-message">Submarine is surfacing…</p>
        <TaskInput
          input={input}
          dueDate={dueDate}
          priority={priority}
          setInput={setInput}
          setDueDate={setDueDate}
          setPriority={setPriority}
          addTask={() => {
            addTask(input, dueDate, priority);
            setInput('');
            setDueDate('');
            setPriority('low');
            setCategory('all'); // Reset to show all tasks after adding
          }}
        />
        <FilterButtons category={category} onCategoryChange={setCategory} />
        <TaskList
          displayedTasks={displayedTasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          startEdit={startEdit}
          isOverdue={isOverdue}
          isDueSoon={isDueSoon}
          categoryLabels={categoryLabels}
          editingId={editingState.id}
          editText={editingState.text}
          editDueDate={editingState.dueDate}
          editPriority={editingState.priority}
          setEditText={(text) => setEditingState({ ...editingState, text })}
          setEditDueDate={(dueDate) => setEditingState({ ...editingState, dueDate })}
          setEditPriority={(priority) => setEditingState({ ...editingState, priority })}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
          activeCategory={category}
          onCategoryChange={setCategory}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
