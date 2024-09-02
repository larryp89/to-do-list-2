// Class that retrieves todos
class Project {
  constructor(projectName) {
    this.projectName = projectName;
    this.projectToDos = [];
  }

  addEntry(todo) {
    this.projectToDos.push(todo);
  }

  removeToDo(toDoItem) {
    this.projectToDos = this.projectToDos.filter((todo) => todo !== toDoItem);
  }
}

export { Project };
