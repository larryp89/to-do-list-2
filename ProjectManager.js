// Class that retrieves todos
class ProjectManager {
  constructor(projectName) {
    this.projectName = projectName;
    this.projectToDos = [];
  }

  addEntry(todo) {
    this.projectToDos.push(todo);
  }

  showEntries() {
    for (let todo of this.projectToDos) {
      console.log(todo);
    }
  }
}

export { ProjectManager };
