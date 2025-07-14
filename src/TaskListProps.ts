interface TaskListProps {
  activeCategory: "overdue" | "completed" | "all" | "today" | "thisweek" | "thismonth" | "someday" | "dueSoon";
  onCategoryChange: Dispatch<SetStateAction<"overdue" | "completed" | "all" | "today" | "thisweek" | "thismonth" | "someday" | "dueSoon">>;
  // ... other existing properties
}
