class ToDoItem {
  constructor(name, description, priority, dueDate) {
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.date = dueDate;
    this.status;
    this.isComplete = false;
    this.dataAttribute;
    this.id;
  }
}

export { ToDoItem };
