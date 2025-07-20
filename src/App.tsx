

import { useState, useMemo } from 'react';
import './AppLayout.css';
import './ButtonStyles.css';
import './TaskStyles.css';
import './FormStyles.css';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import FilterButtons from './FilterButtons';
import { isOverdue, isDueSoon, categorizeTask, categoryLabels } from './utils';
import { useTaskManager } from './hooks/useTaskManager';
import React from 'react';
import type { Task, TaskCategory } from './types';

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
    cancelEdit,
  } = useTaskManager();
  const [category, setCategory] = useState<TaskCategory>('all');
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');
  const [allDay, setAllDay] = useState(false);
  const [recurrence, setRecurrence] = useState<'none' | 'daily' | 'weekly' | 'monthly'>('none');

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
        categories.completed.push(task);
      } else if (isOverdue(task.dueDate, task.completed, task.allDay)) {
        categories.overdue.push(task);
      } else if (isDueSoon(task.dueDate, task.allDay)) {
        categories.dueSoon.push(task);
      } else {
        const cat = categorizeTask(task);
        categories[cat].push(task);
      }
    });

    return categories;
  }, [tasks]);

  const displayedTasks: [string, Task[]][] = useMemo(() => {
    if (!categorizedTasks) return [];
    const nonEmptyCategories = Object.entries(categorizedTasks).filter(([_, tasks]) => tasks.length > 0);
    return category === 'all'
      ? nonEmptyCategories
      : [[category, categorizedTasks[category] ?? []]];
  }, [category, categorizedTasks]);

  return (
    <ErrorBoundary>
      <div className="app">
        <h1>To-Do List</h1>
        <p className="submarine-message">Submarine is surfacing…</p>
        <div className="input-container">
          <TaskInput
            input={input}
            dueDate={dueDate}
            priority={priority}
            allDay={allDay}
            recurrence={recurrence}
            setInput={setInput}
            setDueDate={setDueDate}
            setPriority={setPriority}
            setAllDay={setAllDay}
            setRecurrence={setRecurrence}
            addTask={() => {
              addTask(input, dueDate, priority, allDay, recurrence);
              setInput('');
              setDueDate('');
              setPriority('low');
              setAllDay(false);
              setRecurrence('none');
              setCategory('all');
            }}
          />
        </div>
        <FilterButtons category={category} onCategoryChange={setCategory} />
        <TaskList
          displayedTasks={displayedTasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          startEdit={(id: string, text: string, dueDate: string | undefined, priority: 'low' | 'medium' | 'high', allDay: boolean, recurrence: 'none' | 'daily' | 'weekly' | 'monthly') => {
            startEdit(id, text, dueDate, priority, allDay, recurrence);
          }}
          isOverdue={(dueDate?: string, completed?: boolean, allDay?: boolean) => {
            return isOverdue(dueDate, completed || false, allDay || false);
          }}
          isDueSoon={(dueDate?: string, allDay?: boolean) => {
            return isDueSoon(dueDate, allDay || false);
          }}
          categoryLabels={categoryLabels}
          editingId={editingState.id}
          editText={editingState.text}
          editDueDate={editingState.dueDate}
          editPriority={editingState.priority}
          editAllDay={editingState.allDay || false}
          editRecurrence={editingState.recurrence || 'none'}
          setEditText={(value: React.SetStateAction<string>) =>
            setEditingState({ ...editingState, text: typeof value === 'function' ? value(editingState.text) : value })}
          setEditDueDate={(value: React.SetStateAction<string>) =>
            setEditingState({ ...editingState, dueDate: typeof value === 'function' ? value(editingState.dueDate) : value })}
          setEditPriority={(value: React.SetStateAction<'low' | 'medium' | 'high'>) =>
            setEditingState({ ...editingState, priority: typeof value === 'function' ? value(editingState.priority) : value })}
          setEditAllDay={(value: React.SetStateAction<boolean>) =>
            setEditingState({ ...editingState, allDay: typeof value === 'function' ? value(editingState.allDay || false) : value })}
          setEditRecurrence={(value: React.SetStateAction<'none' | 'daily' | 'weekly' | 'monthly'>) =>
            setEditingState({ ...editingState, recurrence: typeof value === 'function' ? value(editingState.recurrence || 'none') : value })}
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
