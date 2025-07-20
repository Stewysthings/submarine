
import type { TaskCategory } from './types';

interface FilterButtonsProps {
  category: TaskCategory;
  onCategoryChange: (category: TaskCategory) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ category, onCategoryChange }) => {
  const buttons: { key: TaskCategory; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'today', label: 'Today' },
    { key: 'thisweek', label: 'This Week' },
    { key: 'thismonth', label: 'This Month' },
    { key: 'someday', label: 'Someday' },
    { key: 'overdue', label: 'Overdue' },
    { key: 'dueSoon', label: 'Due Soon' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <div className="filter-buttons">
      {buttons.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onCategoryChange(key)}
          className={`filter-button ${category === key ? 'active' : ''}`}
          aria-pressed={category === key}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;

