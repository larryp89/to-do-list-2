import { ToDoItem } from "./todoItem";
import { ToDoManager } from "./ToDoManager";
import { DialogManager } from "./DialogManager";
import { FormManager } from "./FormManager";
import { ProjectManager } from "./ProjectManager";

const MAINDIV = document.querySelector(".main");
const HIGHPRIORITY = document.querySelector(".high-priority");
const MEDIUMPRIORITY = document.querySelector(".medium-priority");
const LOWPRIORITY = document.querySelector(".low-priority");
const CURRENTPROJECTS = document.querySelector(".current-projects");

class UIManager {
  constructor() {
    this.dialogManager = new DialogManager();
    this.toDoManager = new ToDoManager();
    this.formManager = new FormManager();
    this.projects = [];

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    document.body.addEventListener("click", (event) => {
      if (event.target.matches(".home-group")) {
        this.showHome();
      }
      // priority event listeners
      if (event.target.matches(".high-priority")) {
        this.showHighPriority();
      }
      if (event.target.matches(".medium-priority")) {
        this.showMediumPriority();
      }
      if (event.target.matches(".low-priority")) {
        this.showLowPriority();
      }

      if (event.target.matches(".add-to-do")) {
        this.dialogManager.showDialog(this.dialogManager.addToDoDialog);
      }

      if (event.target.matches(".submit-to-do")) {
        event.preventDefault();
        const { title, details, priority, date } =
          this.formManager.getAddFormData();
        const newTodo = new ToDoItem(title, details, priority, date);

        // this.toDoManager.setStatus(newTodo);
        this.toDoManager.addToDO(newTodo);
        this.toDoManager.assignID();
        this.formManager.clearForm(this.formManager.addToDoForm);
        this.dialogManager.closeDialog(this.dialogManager.addToDoDialog);
        this.clearPage();
        this.showTodoList(this.toDoManager.toDoList);
      }

      if (event.target.matches(".cancel-to-do")) {
        event.preventDefault();
        this.formManager.clearForm(this.formManager.addToDoForm);
        this.dialogManager.closeDialog(this.dialogManager.addToDoDialog);
      }

      if (event.target.matches(".add-project")) {
        this.dialogManager.showDialog(this.dialogManager.addProjectDialog);
      }

      // create new project object
      if (event.target.matches(".create-project")) {
        event.preventDefault();
        this.dialogManager.closeDialog(this.dialogManager.addProjectDialog);
        const newProject = new ProjectManager(
          this.formManager.getProjectName()
        );
        this.projects.push(newProject);
        this.addProjectButton(newProject);
        this.formManager.clearForm(this.formManager.projectForm);
      }

      if (event.target.matches(".cancel-project")) {
        event.preventDefault();
        this.formManager.clearForm(this.formManager.projectForm);
        this.dialogManager.closeDialog(this.dialogManager.addProjectDialog);
      }

      if (event.target.matches(".delete-to-do-button")) {
        // get the data-id and use it to delete the to from array
        const id = parseInt(event.target.getAttribute("data-id"));
        this.toDoManager.deleteToDo(id);
        this.toDoManager.assignID();
        this.showTodoList(this.toDoManager.toDoList);
      }

      if (event.target.matches(".edit-to-do-button")) {
        const id = parseInt(event.target.getAttribute("data-id"));
        const toDo = this.toDoManager.toDoList[id];
        const updateForm = this.formManager.createUpdateForm(toDo);
        const dialog = this.dialogManager.generateUpdateDialog();
        dialog.appendChild(updateForm);
        MAINDIV.append(dialog);
        this.dialogManager.showDialog(dialog);
      }

      if (event.target.matches(".expand-button")) {
        const toDoWrapper = event.target.closest(".to-do-wrapper");
        const details = toDoWrapper.querySelector(".details-span");
        this.toggleTodo(details);
      }

      if (event.target.matches(".update-button")) {
        event.preventDefault();
        // get the ID of of the target(same as array index)
        const id = parseInt(event.target.getAttribute("data-id"));
        const { title, details, priority, date } =
          this.formManager.getUpdateFormData();
        this.toDoManager.editToDo(id, title, details, date, priority);
        this.clearPage();
        this.showTodoList(this.toDoManager.toDoList);
      }

      if (event.target.matches(".recancel-to-do")) {
        event.preventDefault();
        this.formManager.clearForm(this.formManager.updateToDoForm);
        this.dialogManager.closeDialog(this.dialogManager.updateToDoDialog);
      }
    });

    this.dialogManager.addToDoDialog.addEventListener("cancel", (event) => {
      this.formManager.clearForm(this.formManager.addToDoForm);
    });
  }

  showTodoList(toDoList) {
    this.clearPage();
    // make a card for each todo
    for (let todo of toDoList) {
      MAINDIV.append(this.createToDoCard(todo));
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

    const priority = document.createElement("span");
    priority.textContent = todo.priority;
    priority.className = "priority-span";
    toDoWrapper.appendChild(priority);

    const expandButton = document.createElement("button");
    expandButton.textContent = "*";
    expandButton.className = "expand-button";
    expandButton.setAttribute("data-id", todo.id);
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
    switch (todo.priority) {
      case "High":
        toDoWrapper.style.backgroundColor = red;
        break;
      case "Medium":
        toDoWrapper.style.backgroundColor = yellow;
        break;
      case "Low":
        toDoWrapper.style.backgroundColor = blue;
        break;
    }
  }

  clearPage() {
    MAINDIV.innerHTML = "";
  }

  toggleTodo(div) {
    div.toggleAttribute("hidden");
  }

  // Methods for Projects
  addProjectButton(project) {
    const button = document.createElement("button");
    button.textContent = project.projectName;

    // add event listener
    button.addEventListener("click", () => project.showEntries());
    CURRENTPROJECTS.appendChild(button);
  }

  showHome() {
    this.showTodoList(this.toDoManager.toDoList);
  }

  showHighPriority() {
    const highPriority = this.toDoManager.toDoList.filter(
      (todo) => todo.priority === "High"
    );
    this.showTodoList(highPriority);
  }
  showMediumPriority() {
    const MidPriority = this.toDoManager.toDoList.filter(
      (todo) => todo.priority === "Medium"
    );
    this.showTodoList(MidPriority);
  }
  showLowPriority() {
    const lowPriority = this.toDoManager.toDoList.filter(
      (todo) => todo.priority === "Low"
    );
    this.showTodoList(lowPriority);
  }
}

export { UIManager };
