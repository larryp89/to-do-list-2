import { Project } from "./ProjectManager";
// stores and manages all todo items

class ToDoManager {
  constructor() {
    this.allToDos = [];
    this.projects = [];
    this.currentProject = null;
  }

  // add todo to alltodos & Project instance todolist
  addToDo(todo) {
    this.allToDos.push(todo);
    this.assignID();
    console.log(this.allToDos);
    this.getCurrentProject().addEntry(todo);
  }

  assignID() {
    for (let todo of this.allToDos) {
      todo.id = this.allToDos.indexOf(todo);
    }
  }

  deleteToDo(id) {
    const todo = this.allToDos.find((todo) => todo.id === id);
    this.getCurrentProject().removeToDo(todo);
    this.allToDos = this.allToDos.filter((todo) => todo.id !== id);
  }

  editToDo(id, title, description, duedate, priority) {
    for (let todo of this.allToDos) {
      if (todo.id === id) {
        todo.name = title;
        todo.description = description;
        todo.date = duedate;
        todo.priority = priority;
      }
    }
  }

  // create a project and add it to the list
  createProject(projectName) {
    const newProject = new Project(projectName);
    this.projects.push(newProject);
    return newProject;
  }

  // set the current project name
  setCurrentProject(projectManager) {
    this.currentProject = projectManager;
  }

  getCurrentProject() {
    return this.currentProject;
  }

  // check for duplicate project
  checkDuplicate(newProject) {
    for (let proj of this.projects) {
      if (proj.projectName === newProject) {
        return true;
      }
    }
    return false;
  }

  findProject(project) {
    for (let proj of this.projects) {
      if (proj.projectName === project) {
        return proj;
      }
    }
    return false;
  }
}

export { ToDoManager };
