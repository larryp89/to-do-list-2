import { ToDoItem } from "./todoItem";
import { ToDoManager } from "./ToDoManager";
import { format } from "date-fns";

class DOMManager {
  constructor() {
    this.mainDiv = document.querySelector(".main");
    this.toDoDialog = document.querySelector(".to-do-dialog");
    this.projectDialog = document.querySelector(".project-dialog");
    this.initializeEventListeners();
    this.toDoManager = new ToDoManager();
  }

  initializeEventListeners() {
    document.body.addEventListener("click", (event) => {
      if (event.target.matches(".add-to-do")) {
        this.showFormDialog(this.toDoDialog);
      }

      if (event.target.matches(".submit-to-do")) {
        event.preventDefault();
        this.closeFormDialog(this.toDoDialog);
        this.toDoManager.addToDO(this.getFormData());
        this.toDoManager.assignID();
        this.clearToDoForm();
        this.clearPage();
        this.showTodoList();
      }

      if (event.target.matches(".cancel-to-do")) {
        event.preventDefault();
        this.clearToDoForm();
        this.closeFormDialog(this.toDoDialog);
      }

      if (event.target.matches(".add-project")) {
        this.showFormDialog(this.projectDialog);
      }

      if (event.target.matches(".create-project")) {
        event.preventDefault();
        this.closeFormDialog(this.projectDialog);
        this.clearProjectForm();
      }

      if (event.target.matches(".cancel-project")) {
        event.preventDefault();
        this.closeFormDialog(this.projectDialog);
        this.clearProjectForm();
      }

      if (event.target.matches(".delete-to-do-button")) {
        // get the data-id and use it to delete the to from array
        const id = parseInt(event.target.getAttribute("data-id"));
        this.toDoManager.deleteToDo(id);
        this.showTodoList();
      }

      if(event.target.matches(".edit-to-do-button")){
        console.log("edit clcked")
      }
    });
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

  getFormData() {
    // get form data and create toDo
    const title = document.querySelector("#title").value;
    const details = document.querySelector("#details").value;
    const priority = document.querySelector("#priority").value;
    const dueDate = document.querySelector("#due-date").value;

    // convert & tidy due date
    const formattedDate = format(new Date(dueDate), "MM/dd/yyyy");
    const newTodo = new ToDoItem(title, details, priority, formattedDate);
    return newTodo;
  }

  showTodoList() {
    this.clearPage();
    // make a card for each todo
    for (let todo of this.toDoManager.toDoList) {
      this.mainDiv.append(this.createToDoCard(todo));
    }
  }

  createToDoCard(todo) {
    // create to do div
    const toDoWrapper = document.createElement("div");
    toDoWrapper.className = "to-do-wrapper";

    const titleDateDiv = document.createElement("div");
    titleDateDiv.className = "title-date-div";

    // create elements for div and append
    const title = document.createElement("span");
    title.className = "title-span";
    title.textContent = todo.name;
    titleDateDiv.appendChild(title);

    const date = document.createElement("span");
    date.className = "date-span";
    date.textContent = `Complete by: ${todo.date}`;
    titleDateDiv.appendChild(date);

    toDoWrapper.appendChild(titleDateDiv);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-to-do-button";
    toDoWrapper.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-to-do-button";
    deleteButton.setAttribute("data-id", todo.id);
    toDoWrapper.appendChild(deleteButton);

    this.setCardBackground(todo, toDoWrapper);
    return toDoWrapper;
  }

  setCardBackground(todo, toDoWrapper) {
    const red = "rgb(227, 116, 116)";
    const yellow = "rgb(237 242 145)";
    const blue = "rgb(88, 206, 224)";
    const green = "rgb(43, 173, 11";
    switch (todo.status) {
      case "Urgent":
        toDoWrapper.style.backgroundColor = red;
        break;
      case "Non-urgent":
        toDoWrapper.style.backgroundColor = yellow;
        break;
      case "Delegate":
        toDoWrapper.style.backgroundColor = blue;
        break;
      case "Discard":
        toDoWrapper.style.backgroundColor = green;
        break;
    }
  }

  clearPage() {
    this.mainDiv.innerHTML = "";
  }
}

export { DOMManager };
