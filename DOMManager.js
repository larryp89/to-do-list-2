import { ToDoItem } from "./todoItem";
import { ToDoManager } from "./ToDoManager";
import { DialogManager } from "./DialogManager";
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

      if (event.target.matches(".edit-to-do-button")) {
        const id = parseInt(event.target.getAttribute("data-id"));
        const toDo = this.toDoManager.toDoList[id];
        const dialog = this.generateUpdateDialog(toDo);
        this.mainDiv.append(dialog);
        this.showFormDialog(dialog);
      }
    
    // TODO: correct the expand
      if (event.target.matches(".expand-button")) {
        const details = document.querySelector(".details-span");
        this.toggleTodo(details);
      }

      if (event.target.matches(".update-button")) {
        event.preventDefault();
        const id = parseInt(event.target.getAttribute("data-id"));
        console.log("clicked")

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

  generateUpdateDialog(todo) {
    // Create dialog & form
    const updateDialog = document.createElement("dialog");
    updateDialog.classList.add("to-do-dialog");

    const updateForm = document.createElement("form");
    updateForm.setAttribute("action", "");

    // Title
    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "title");
    titleLabel.textContent = "Title";
    const titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("id", "title");
    titleInput.value = todo.name;

    // Details
    const detailsLabel = document.createElement("label");
    detailsLabel.setAttribute("for", "details");
    detailsLabel.textContent = "Details";
    const detailsInput = document.createElement("textarea");
    detailsInput.setAttribute("name", "details");
    detailsInput.setAttribute("id", "details");
    detailsInput.value = todo.description;

    // Priority
    const priorityLabel = document.createElement("label");
    priorityLabel.setAttribute("for", "priority");
    priorityLabel.textContent = "Priority";
    const selectPriority = document.createElement("select");
    selectPriority.setAttribute("name", "priority");
    selectPriority.setAttribute("id", "priority");

    const firstOption = document.createElement("option");
    firstOption.setAttribute("value", "not important");
    firstOption.textContent = "Not Important";
    const secondOption = document.createElement("option");
    secondOption.setAttribute("value", "important");
    secondOption.textContent = "Important";
    if (todo.priority === "important") {
      secondOption.setAttribute("selected", "selected");
    } else {
      firstOption.setAttribute("selected", "selected");
    }

    selectPriority.appendChild(firstOption);
    selectPriority.appendChild(secondOption);

    // Due Date
    const dueDateLabel = document.createElement("label");
    dueDateLabel.setAttribute("for", "due-date");
    dueDateLabel.textContent = "Due on";
    const dateSelect = document.createElement("input");
    dateSelect.setAttribute("type", "date");
    dateSelect.setAttribute("id", "due-date");
    const toDoDate = new Date(todo.date).toISOString().split("T")[0];
    dateSelect.value = toDoDate;

    // Buttons
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    const UpdateButton = document.createElement("button");
    UpdateButton.classList.add("update-button");
    UpdateButton.setAttribute("data-id", todo.id);
    UpdateButton.textContent = "Update";

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("recancel-to-do");
    cancelButton.textContent = "Cancel";

    buttonContainer.appendChild(UpdateButton);
    buttonContainer.appendChild(cancelButton);

    // Append elements to form
    updateForm.appendChild(titleLabel);
    updateForm.appendChild(titleInput);
    updateForm.appendChild(detailsLabel);
    updateForm.appendChild(detailsInput);
    updateForm.appendChild(priorityLabel);
    updateForm.appendChild(selectPriority);
    updateForm.appendChild(dueDateLabel);
    updateForm.appendChild(dateSelect);
    updateForm.appendChild(buttonContainer);

    // Append form to dialog
    updateDialog.appendChild(updateForm);

    // Append dialog to body
    return updateDialog;
  }
}

export { DOMManager };
