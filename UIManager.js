import { ToDoItem } from "./todoItem";
import { ToDoManager } from "./ToDoManager";
import { DialogManager } from "./DialogManager";
import { FormManager } from "./FormManager";

class UIManager {
  constructor() {
    this.mainDiv = document.querySelector(".main");
    this.dialogManager = new DialogManager();
    this.initializeEventListeners();
    this.toDoManager = new ToDoManager();
    this.formManager = new FormManager();
  }

  initializeEventListeners() {
    document.body.addEventListener("click", (event) => {
      if (event.target.matches(".add-to-do")) {
        this.dialogManager.showDialog(this.dialogManager.addToDoDialog);
      }

      if (event.target.matches(".submit-to-do")) {
        event.preventDefault();
        this.dialogManager.closeDialog(this.dialogManager.addToDoDialog);
        const { title, details, priority, date } =
          this.formManager.getFormData();
        const newTodo = new ToDoItem(title, details, priority, date);
        this.toDoManager.addToDO(newTodo);
        this.toDoManager.assignID();
        this.formManager.clearAddToDoForm();
        this.clearPage();
        this.showTodoList();
      }

      if (event.target.matches(".cancel-to-do")) {
        event.preventDefault();
        this.formManager.clearAddToDoForm();
        this.dialogManager.closeDialog(this.dialogManager.addToDoDialog);
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

      if (event.target.matches(".edit-to-do-button")) {
        const id = parseInt(event.target.getAttribute("data-id"));
        const toDo = this.toDoManager.toDoList[id];
        const dialog = this.dialogManager.generateUpdateDialog(
          this.formManager.createUpdateForm(toDo)
        );
        this.mainDiv.append(dialog);
        this.dialogManager.showDialog(dialog);
      }

      // TODO: correct the expand
      if (event.target.matches(".expand-button")) {
        const details = document.querySelector(".details-span");
        this.toggleTodo(details);
      }

      if (event.target.matches(".update-button")) {
        event.preventDefault();
        // get the ID of of the target(same as array index)
        const id = parseInt(event.target.getAttribute("data-id"));
        //
        const { title, details, priority, date } =
          this.formManager.getFormData();
        this.toDoManager.editToDo(id, title, details, date, priority);
        this.clearPage();
        this.showTodoList();
      }

      if (event.target.matches(".recancel-to-do")) {
        event.preventDefault();
        console.log("clicked");
      }
    });
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

    const details = document.createElement("span");
    details.classList = "details-span";
    details.textContent = `Details: ${todo.description}`;
    details.setAttribute("hidden", "true");
    titleDateDiv.append(details);

    toDoWrapper.appendChild(titleDateDiv);

    const expandButton = document.createElement("button");
    expandButton.textContent = "*";
    expandButton.className = "expand-button";
    toDoWrapper.appendChild(expandButton);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-to-do-button";
    editButton.setAttribute("data-id", todo.id);
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

  toggleTodo(div) {
    div.toggleAttribute("hidden");
  }
}

export { UIManager };
