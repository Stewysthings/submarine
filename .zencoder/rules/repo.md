---
description: Repository Information Overview
alwaysApply: true
---

# Submarine Task Manager Information

## Summary
Submarine is a React-based task management application built with TypeScript and Vite. It provides a to-do list functionality with features like task categorization, due dates, priorities, and filtering options. Tasks can be created, edited, deleted, and marked as completed, with data persisted in the browser's localStorage.

## Structure
- **src/**: Contains all source code for the application
  - **hooks/**: Custom React hooks for state management
  - **assets/**: Static assets for the application
  - **components/**: React components (TaskList, TaskInput, FilterButtons, etc.)
  - **styles/**: CSS files for styling components
- **public/**: Static assets served directly by the web server
- **.zencoder/**: Documentation and configuration files

## Language & Runtime
**Language**: TypeScript 5.8.3
**Framework**: React 18.2.0
**Build System**: Vite 6.3.5
**Package Manager**: Yarn

## Dependencies
**Main Dependencies**:
- react: ^18.2.0
- react-dom: ^18.2.0

**Development Dependencies**:
- typescript: ~5.8.3
- vite: ^6.3.5
- @vitejs/plugin-react: ^4.4.1
- eslint: ^9.26.0
- prettier: ^3.5.3
- typescript-eslint: ^8.32.1
- Various ESLint plugins for React

## Build & Installation
```bash
# Install dependencies
yarn

# Development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Lint code
yarn lint
```

## Main Components
**Entry Point**: src/main.tsx
**Core Components**:
- App.tsx: Main application component
- TaskList.tsx: Displays tasks grouped by categories
- TaskInput.tsx: Form for adding new tasks
- FilterButtons.tsx: Filtering interface for tasks

## State Management
**Custom Hooks**:
- useTaskManager: Manages task CRUD operations and localStorage persistence
- useTaskFormState: Manages form state for task creation/editing

## Data Model
**Task Interface**:
- id: string
- text: string
- description?: string
- dueDate?: string (ISO date string)
- allDay?: boolean
- completed: boolean
- priority: 'low' | 'medium' | 'high'
- createdAt?: string

**Task Categories**:
- completed
- overdue
- dueSoon
- today
- thisweek
- thismonth
- someday