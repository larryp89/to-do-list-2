// TODO: error handling
// TODO: add "complete" status and counter for todos in each section

import { ToDoItem } from "../components/todoItem";
import { ToDoManager } from "./ToDoManager";
import { DialogManager } from "./DialogManager";
import { FormManager } from "./FormManager";

const MAINDIV = document.querySelector(".main");
const HIGHPRIORITY = document.querySelector(".high-priority");
const MEDIUMPRIORITY = document.querySelector(".medium-priority");
const LOWPRIORITY = document.querySelector(".low-priority");
const CURRENTPROJECTS = document.querySelector(".current-projects");
const DEAFULT_PROJECT_NAME = "Home";

class UIManager {
  constructor() {
    this.dialogManager = new DialogManager();
    this.toDoManager = new ToDoManager();
    this.formManager = new FormManager();
    this.currentPriority = null; // Track the currently selected priority
    this.initializeEventListeners();
    this.iniializeToDoManager();
    this.loadProjects();
    this.showTodoList(DEAFULT_PROJECT_NAME);
  }

  iniializeToDoManager() {
    this.toDoManager.setCurrentProject(DEAFULT_PROJECT_NAME);
    this.toDoManager.addProject(DEAFULT_PROJECT_NAME);
  }

  loadProjects() {
    for (let project of this.toDoManager.projects) {
      if (project !== "Home") {
        this.makeProjectContainer(project);
      }
    }
  }

  initializeEventListeners() {
    document.body.addEventListener("click", (event) => {
      if (event.target.matches(".home-group")) {
        this.currentPriority = null; // Reset priority when navigating home
        this.toDoManager.setCurrentProject(DEAFULT_PROJECT_NAME);
        this.showTodoList(this.toDoManager.getCurrentProject());
      }

      if (event.target.matches(".high-priority")) {
        this.currentPriority = "High"; // Set the current priority
        this.toDoManager.setCurrentProject(DEAFULT_PROJECT_NAME);
        this.showTodoList(
          this.toDoManager.getCurrentProject(),
          this.currentPriority
        );
      }

      if (event.target.matches(".medium-priority")) {
        this.currentPriority = "Medium"; // Set the current priority
        this.toDoManager.setCurrentProject(DEAFULT_PROJECT_NAME);
        this.showTodoList(
          this.toDoManager.getCurrentProject(),
          this.currentPriority
        );
      }

      if (event.target.matches(".low-priority")) {
        this.currentPriority = "Low"; // Set the current priority
        this.toDoManager.setCurrentProject(DEAFULT_PROJECT_NAME);
        this.showTodoList(
          this.toDoManager.getCurrentProject(),
          this.currentPriority
        );
      }

      // add/submit event listeners
      if (event.target.matches(".add-to-do")) {
        this.currentPriority = null;
        this.toDoManager.setCurrentProject(DEAFULT_PROJECT_NAME);
        this.dialogManager.showDialog(this.dialogManager.addToDoDialog);
        console.log(this.toDoManager.getCurrentProject());
      }

      if (event.target.matches(".submit-to-do")) {
        event.preventDefault();
        if (!this.formManager.getAddFormData()) {
          return;
        }
        const { title, details, priority, date } =
          this.formManager.getAddFormData();
        const newTodo = new ToDoItem(title, details, priority, date);
        newTodo.project = DEAFULT_PROJECT_NAME;

        // add todo to manager
        this.toDoManager.addToDo(newTodo);
        this.toDoManager.assignID();

        // save locally
        this.toDoManager.setLocalStorage();

        this.formManager.clearForm(this.formManager.addToDoForm);
        this.dialogManager.closeDialog(this.dialogManager.addToDoDialog);

        this.showTodoList(
          this.toDoManager.getCurrentProject(),
          this.currentPriority
        );
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
        const projectName = this.formManager.getProjectName();

        if (!projectName) {
          alert("Project name is required.");
          return;
        }
        if (this.toDoManager.checkDuplicate(projectName)) {
          alert("Project already exists");
          this.formManager.clearForm(this.formManager.projectName);
          return;
        }

        // add the project to the list
        this.toDoManager.addProject(projectName);
        this.toDoManager.setCurrentProject(projectName);
        this.formManager.clearForm(this.formManager.projectName);

        // make project container
        this.makeProjectContainer(projectName);
        this.showTodoList(this.toDoManager.getCurrentProject());
      }

      if (event.target.matches(".current-project-button")) {
        event.preventDefault();
        this.currentPriority = null;
        const projectName = event.target
          .closest(".div-container")
          .querySelector(".project-span").textContent;
        this.toDoManager.setCurrentProject(projectName);
        this.dialogManager.showDialog(this.dialogManager.projectToDoDialog);
      }

      if (event.target.matches(".trash-project-button")) {
        const projecToDelete = event.target.closest(".div-container");
        const projectName =
          projecToDelete.querySelector(".project-span").textContent;
        this.deleteProjectDiv(projecToDelete);
        this.toDoManager.deleteProjectToDos(projectName);
        this.toDoManager.deleteProject(projectName);
      }

      if (event.target.matches(".project-span")) {
        const projecToShow = event.target.textContent;
        this.toDoManager.setCurrentProject(projecToShow);
        console.log(this.toDoManager.getCurrentProject());
        this.showTodoList(this.toDoManager.getCurrentProject());
      }

      if (event.target.matches(".submit-project-to-do")) {
        event.preventDefault();
        const { title, details, priority, date } =
          this.formManager.getProjectFormData();
        const projectToDo = new ToDoItem(title, details, priority, date);
        console.log(this.toDoManager.getCurrentProject());
        projectToDo.project = this.toDoManager.getCurrentProject();

        this.toDoManager.addToDo(projectToDo);
        this.showTodoList(this.toDoManager.getCurrentProject());

        // add local storage
        this.toDoManager.setLocalStorage();

        this.formManager.clearForm(this.formManager.projectForm);
        this.dialogManager.closeDialog(this.dialogManager.projectToDoDialog);
      }

      if (event.target.matches(".cancel-project")) {
        event.preventDefault();
        this.formManager.clearForm(this.formManager.projectName);
        this.dialogManager.closeDialog(this.dialogManager.addProjectDialog);
      }

      if (event.target.matches(".delete-to-do-button")) {
        const id = parseInt(event.target.getAttribute("data-id"));
        this.toDoManager.deleteToDo(id);
        this.toDoManager.assignID();
        this.showTodoList(
          this.toDoManager.getCurrentProject(),
          this.currentPriority
        );
      }

      if (event.target.matches(".edit-to-do-button")) {
        const id = parseInt(event.target.getAttribute("data-id"));
        const toDo = this.toDoManager.allToDos[id];

        // Validate update form
        if (
          this.formManager.updateToDoForm &&
          !this.formManager.updateToDoForm.checkValidity()
        ) {
          this.formManager.updateToDoForm.reportValidity();
          return;
        }

        const updateForm = this.formManager.createUpdateForm(toDo);
        const dialog = this.dialogManager.generateUpdateDialog();
        dialog.appendChild(updateForm);
        MAINDIV.append(dialog);
        this.dialogManager.showDialog(dialog);
      }

      if (event.target.matches(".expand-button")) {
        const toDoWrapper = event.target.closest(".to-do-wrapper");
        const details = toDoWrapper.querySelector(".details-span");
        const project = toDoWrapper.querySelector(".project-span");
        this.toggleTodo(details);
        this.toggleTodo(project);
        this.toggleImage(event.target);
      }

      if (event.target.matches(".update-button")) {
        event.preventDefault();
        const id = parseInt(event.target.getAttribute("data-id"));
        if(!this.formManager.getUpdateFormData()){
          return
        }
        const { title, details, priority, date } =
          this.formManager.getUpdateFormData();
        this.toDoManager.editToDo(id, title, details, date, priority);
        this.showTodoList(
          this.toDoManager.getCurrentProject(),
          this.currentPriority
        );
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

  showTodoList(projectName, priority = null) {
    this.clearPage();
    this.setHeader();

    this.toDoManager.sortByDate();
    this.toDoManager.assignID();

    let toDoList;

    if (projectName === DEAFULT_PROJECT_NAME) {
      toDoList = this.toDoManager.allToDos.filter(
        (item) => !priority || item.priority === priority
      );
    } else {
      toDoList = this.toDoManager.allToDos.filter(
        (item) =>
          item.project === projectName &&
          (!priority || item.priority === priority)
      );
    }

    if (toDoList.length === 0) {
      this.showEmpty();
      return;
    }

    for (let todo of toDoList) {
      MAINDIV.append(this.createToDoCard(todo));
    }
  }

  showEmpty() {
    this.clearPage();
    const emptyDiv = document.createElement("h1");
    this.setHeader();
    emptyDiv.textContent = "Nothing to see here!";
    const tumbleWeed = document.createElement("img");
    tumbleWeed.id = "gif";
    tumbleWeed.src = "./tumbleweed.gif";
    tumbleWeed.alt = "tumbleweed";
    MAINDIV.appendChild(emptyDiv);
    MAINDIV.append(tumbleWeed);
  }

  createToDoCard(todo) {
    const toDoWrapper = document.createElement("div");
    toDoWrapper.className = "to-do-wrapper";

    const titleDateDiv = document.createElement("div");
    titleDateDiv.className = "title-date-div";

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

    const project = document.createElement("span");
    project.classList = "project-span";
    project.textContent = todo.project
      ? `Project: ${todo.project}`
      : "Project: Unassigned";
    project.setAttribute("hidden", "true");
    titleDateDiv.appendChild(project);

    toDoWrapper.appendChild(titleDateDiv);

    const iconsDiv = document.createElement("div");
    iconsDiv.className = "icons-div";

    const priority = document.createElement("span");
    priority.textContent = `${todo.priority}`;
    priority.className = "priority-span";
    iconsDiv.appendChild(priority);

    const expandButton = document.createElement("img");
    expandButton.src = "./menu-down-outline.svg";
    expandButton.className = "expand-button";
    expandButton.setAttribute("data-id", todo.id);
    iconsDiv.appendChild(expandButton);

    const editButton = document.createElement("img");
    editButton.src = "./pencil.svg";
    editButton.className = "edit-to-do-button";
    editButton.setAttribute("data-id", todo.id);
    iconsDiv.appendChild(editButton);

    const deleteButton = document.createElement("img");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-to-do-button";
    deleteButton.src = "./trash-can-outline.svg";
    deleteButton.setAttribute("data-id", todo.id);
    iconsDiv.appendChild(deleteButton);

    toDoWrapper.appendChild(iconsDiv);
    this.setCardBackground(todo, toDoWrapper);
    return toDoWrapper;
  }

  setCardBackground(todo, toDoWrapper) {
    const span = toDoWrapper.querySelector(".priority-span");
    const yellow = "rgb(237 242 145)";
    const blue = "rgb(88, 206, 224)";
    switch (todo.priority) {
      case "High":
        span.style.border = "3px solid red";
        break;
      case "Medium":
        span.style.border = "3px solid orange";
        break;
      case "Low":
        span.style.border = "3px solid green";
        break;
    }
  }

  clearPage() {
    MAINDIV.innerHTML = "";
  }

  toggleTodo(div) {
    div.toggleAttribute("hidden");
  }

  toggleImage(img) {
    if (img.src.endsWith("menu-down-outline.svg")) {
      img.src = "./menu-up.svg";
    } else {
      img.src = "./menu-down-outline.svg";
    }
  }

  checkDuplicateProject(project) {
    return this.toDoManager.allToDos.some(
      (proj) => proj.projectName === project
    );
  }

  setHeader() {
    const heading = document.createElement("h2");
    heading.textContent = `Current Project: ${this.toDoManager.getCurrentProject()}`;
    MAINDIV.appendChild(heading);
  }

  makeProjectContainer(project) {
    const container = document.createElement("div");
    container.className = "div-container";
    const projectSpan = document.createElement("span");
    projectSpan.className = "project-span";
    projectSpan.textContent = project;
    const projectButton = document.createElement("img");
    projectButton.className = "current-project-button";
    projectButton.src = "./pen-plus.svg";
    const trashButton = document.createElement("img");
    trashButton.className = "trash-project-button";
    trashButton.src = "./trash-can-outline.svg";
    container.appendChild(projectSpan);
    container.appendChild(projectButton);
    container.append(trashButton);
    CURRENTPROJECTS.append(container);
  }

  deleteProjectDiv(div) {
    div.remove(); // Correctly removes the div element representing the project
  }
}

export { UIManager };
