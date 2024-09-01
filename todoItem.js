class ToDoItem {
  constructor(name, description, priority, dueDate) {
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.date = dueDate;
    this.isComplete = false;
    this.id;
    this.project = null
  }
}

export { ToDoItem };
