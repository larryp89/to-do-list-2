// stores and manages all todo items
import { compareAsc } from "date-fns";

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
  }

  // sort todo list by date
  sortByDate() {
    this.allToDos.sort((a,b)=>compareAsc(a.date, b.date))
  }

  assignID() {
    for (let todo of this.allToDos) {
      todo.id = this.allToDos.indexOf(todo);
    }
  }

  deleteToDo(id) {
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
  // set the current project name
  setCurrentProject(projectManager) {
    this.currentProject = projectManager;
  }

  getCurrentProject() {
    return this.currentProject;
  }

  addProject(projectName) {
    this.projects.push(projectName);
  }

  // check for duplicate project
  checkDuplicate(newProject) {
    for (let proj of this.projects) {
      if (proj === newProject) {
        return true;
      }
    }
    return false;
  }
}

export { ToDoManager };
