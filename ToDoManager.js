// stores and manages all todo items
import { compareAsc } from "date-fns";

class ToDoManager {
  constructor() {
    this.allToDos = localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : [];
    this.projects = localStorage.getItem("projects")
      ? JSON.parse(localStorage.getItem("projects"))
      : [];
    this.currentProject = null;
    this.loadDefaultData()
  }

  loadDefaultData() {
    if (this.projects.length === 0) {
      // Add default projects
      this.addProject("Home");
      this.addProject("Work");

      // Add default todos
      this.addToDo({
        name: "Buy groceries",
        description: "Milk, Bread, Eggs",
        date: "2024-09-04",
        priority: "High",
        project: "Home",
      });
      this.addToDo({
        name: "Complete report",
        description: "Finish the quarterly report",
        date: "2024-09-05",
        priority: "Medium",
        project: "Work",
      });
    }
  }

  // add todo to alltodos & Project instance todolist
  addToDo(todo) {
    this.allToDos.push(todo);
    this.assignID();
    this.setLocalStorage;
    console.log(this.allToDos);
  }

  // sort todo list by date
  sortByDate() {
    this.allToDos.sort((a, b) => compareAsc(a.date, b.date));
  }

  assignID() {
    for (let todo of this.allToDos) {
      todo.id = this.allToDos.indexOf(todo);
    }
  }

  deleteToDo(id) {
    this.allToDos = this.allToDos.filter((todo) => todo.id !== id);
    this.setLocalStorage();
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
    this.setLocalStorage();
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
    this.setLocalStorage();
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

  deleteProjectToDos(projectName) {
    // Filter out todos that belong to the project being deleted
    this.allToDos = this.allToDos.filter(
      (item) => item.project !== projectName
    );
    this.setLocalStorage();
  }

  deleteProject(projectName) {
    // Filter out the project being deleted from the projects list
    this.projects = this.projects.filter((project) => project !== projectName);
    this.setLocalStorage();
  }

  setLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(this.allToDos));
    localStorage.setItem("projects", JSON.stringify(this.projects));
  }

  getLocalStorage() {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      this.allToDos = storedTodos;
    }

    const storedProjects = JSON.parse(localStorage.getItem("projects"));
    if (storedProjects) {
      this.projects = storedProjects;
    }
  }
}

export { ToDoManager };
