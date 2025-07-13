import { useState, useMemo } from 'react';
import './App.css';
import type { Task } from './types';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import FilterButtons from './components/FilterButtons';
import { isOverdue, isDueSoon, categorizeTask, categoryLabels } from './utils';
import { useTaskManager } from './hooks/useTaskManager';
import React from 'react';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: string | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error: Error) {
    this.setState({ error: error.message });
  }

  render() {
    if (this.state.error) return <div className="error">Error: {this.state.error}</div>;
    return this.props.children;
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
    removingId,
  } = useTaskManager();

  const [category, setCategory] = useState<
    'all' | 'today' | 'thisweek' | 'thismonth' | 'someday' | 'overdue' | 'dueSoon'
  >('all');
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');

  const categorizedTasks = useMemo(() => {
    const categories: Record<string, Task[]> = {
      overdue: [],
      dueSoon: [],
      today: [],
      thisweek: [],
      thismonth: [],
      someday: [],
    };
    tasks
      .filter((task) => !task.completed)
      .forEach((task) => {
        if (isOverdue(task.dueDate)) {
          categories.overdue.push(task);
        } else if (isDueSoon(task.dueDate)) {
          categories.dueSoon.push(task);
        } else {
          const cat = categorizeTask(task);
          categories[cat].push(task);
        }
      });
    return categories;
  }, [tasks]);

  const displayedTasks: [string, Task[]][] =
    category === 'all'
      ? Object.entries(categorizedTasks)
      : [[category, categorizedTasks[category] || []]];

  console.log('App is rendering, number of tasks:', tasks.length);

  return (
    <ErrorBoundary>
      <div className="app">
        <h1>To-Do List</h1>
        <p>Submarine is surfacing…</p>
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
          }}
        />
        <FilterButtons category={category} setCategory={setCategory} />
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
          cancelEdit={() => setEditingState({ id: null, text: '', dueDate: '', priority: 'low' })}
          removingId={removingId}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;