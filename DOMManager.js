import { ToDoItem } from "./todoItem";
import { ToDoManager } from "./ToDoManager";

class DOMManager {
  constructor() {
    this.toDoDialog = document.querySelector(".to-do-dialog");
    this.projectDialog = document.querySelector(".project-dialog");
    this.initializeEventListeners();
    this.toDoManager = new ToDoManager()
  }

  initializeEventListeners() {
    const addToDoButton = document.querySelector(".add-to-do");
    const submitToDoButton = document.querySelector(".submit-to-do");
    const cancelToDoButton = document.querySelector(".cancel-to-do");
    const addProjectButton = document.querySelector(".add-project");
    const submitProjectButton = document.querySelector(".create-project");
    const cancelProjectButton = document.querySelector(".cancel-project");

    if (addToDoButton) {
      addToDoButton.addEventListener("click", () =>
        this.showFormDialog(this.toDoDialog)
      );
    }

    if (submitToDoButton) {
      submitToDoButton.addEventListener("click", (event) => {
        event.preventDefault();
        this.closeFormDialog(this.toDoDialog);
        this.getToDoData();
        this.clearToDoForm();
      });
    }

    if (cancelToDoButton) {
      cancelToDoButton.addEventListener("click", (event) => {
        event.preventDefault();
        this.clearToDoForm();
        this.closeFormDialog(this.toDoDialog);
      });
    }

    if (addProjectButton) {
      addProjectButton.addEventListener("click", () => {
        this.showFormDialog(this.projectDialog);
      });
    }

    if (submitProjectButton) {
      submitProjectButton.addEventListener("click", (event) => {
        event.preventDefault();
        this.closeFormDialog(this.projectDialog);
        this.clearProjectForm();
      });
    }

    if (cancelProjectButton) {
      cancelProjectButton.addEventListener("click", (event) => {
        event.preventDefault;
        this.closeFormDialog(this.projectDialog);
        this.clearProjectForm();
      });
    }
  }

  showFormDialog(dialog) {
    dialog.showModal();
  }

  closeFormDialog(dialog) {
    dialog.close();
  }

  clearToDoForm() {
    document.querySelector("#title").value = "";
    document.querySelector("#details").value = "";
  }

  clearProjectForm() {
    document.querySelector(".project-name").value = "";
  }

  getToDoData() {
    // get form data and create toDo 
    const title = document.querySelector("#title").value;
    const details = document.querySelector("#details").value;
    const priority = document.querySelector("#priority").value;
    const dueDate = document.querySelector("#due-date").value;
    const newTodo = new ToDoItem(title, details, priority, dueDate);
  }
}

export { DOMManager };
