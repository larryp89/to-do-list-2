import { ToDoItem } from "./todoItem";
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
    this.initializeEventListeners();
    this.iniializeToDoManager();
  }

  iniializeToDoManager() {
    // create default project, add it to projects list, set currentProject
    this.toDoManager.setCurrentProject(
      this.toDoManager.createProject(DEAFULT_PROJECT_NAME)
    );
  }

  initializeEventListeners() {
    document.body.addEventListener("click", (event) => {
      if (event.target.matches(".home-group")) {
        this.showHome(DEAFULT_PROJECT_NAME);
      }
      // get by priority event listeners
      if (event.target.matches(".high-priority")) {
        this.showTodoList(this.getHighPriority());
      }
      if (event.target.matches(".medium-priority")) {
        this.showTodoList(this.getMediumPriority());
      }
      if (event.target.matches(".low-priority")) {
        this.showTodoList(this.getLowPriority());
      }

      // add/submit event listeners
      if (event.target.matches(".add-to-do")) {
        this.dialogManager.showDialog(this.dialogManager.addToDoDialog);
      }

      if (event.target.matches(".submit-to-do")) {
        event.preventDefault();
        // all todos added from here are assigned to project Default project"
        const { title, details, priority, date } =
          this.formManager.getAddFormData();
        const newTodo = new ToDoItem(title, details, priority, date);
        newTodo.project = DEAFULT_PROJECT_NAME;

        // add todo to manager
        this.toDoManager.addToDo(newTodo);
        this.toDoManager.assignID();

        this.formManager.clearForm(this.formManager.addToDoForm);
        this.dialogManager.closeDialog(this.dialogManager.addToDoDialog);
        this.showHome(DEAFULT_PROJECT_NAME);
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
        //
        this.dialogManager.closeDialog(this.dialogManager.addProjectDialog);
        const projectName = this.formManager.getProjectName();

        // check project doesn't already exist
        if (this.toDoManager.checkDuplicate(projectName)) {
          alert("Project already exists");
        }
        // add the project to the list
        this.toDoManager.createProject(projectName);
        // make project container
        this.makeProjectContainer(projectName);
      }

      if (event.target.matches(".current-project-button")) {
        event.preventDefault();
        const projectName = event.target
          .closest(".div-container")
          .querySelector(".project-span").textContent;
        // set current project name based on typed project name
        this.toDoManager.setCurrentProject(
          this.toDoManager.findProject(projectName)
        );
        this.dialogManager.showDialog(this.dialogManager.projectToDoDialog);
      }

      if (event.target.matches(".submit-project-to-do")) {
        event.preventDefault();
        const { title, details, priority, date } =
          this.formManager.getProjectFormData();

        // create the todo for the project
        const projectToDo = new ToDoItem(title, details, priority, date);

        // set the project name
        projectToDo.project = this.toDoManager.getCurrentProject();
        console.log(typeof projectToDo.project);

        // add todo
        this.toDoManager.addToDo(projectToDo);

        this.formManager.clearForm(this.formManager.projectForm);
        this.dialogManager.closeDialog(this.dialogManager.projectToDoDialog);

        this.showTodoList(this.toDoManager.findProject(projectToDo.project));
      }

      if (event.target.matches(".cancel-project")) {
        event.preventDefault();
        this.formManager.clearForm(this.formManager.projectName);
        this.dialogManager.closeDialog(this.dialogManager.addProjectDialog);
      }

      // TODO sort delete button issue
      if (event.target.matches(".delete-to-do-button")) {
        // get the data-id and use it to delete the to from array
        const id = parseInt(event.target.getAttribute("data-id"));
        this.toDoManager.deleteToDo(id);
        this.toDoManager.assignID();
        this.showTodoList(this.toDoManager.allToDos);
      }

      if (event.target.matches(".edit-to-do-button")) {
        const id = parseInt(event.target.getAttribute("data-id"));
        const toDo = this.toDoManager.allToDos[id];
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
      }

      if (event.target.matches(".update-button")) {
        event.preventDefault();
        // get the ID of of the target(same as array index)
        const id = parseInt(event.target.getAttribute("data-id"));
        const { title, details, priority, date } =
          this.formManager.getUpdateFormData();
        this.toDoManager.editToDo(id, title, details, date, priority);
        this.showTodoList(this.toDoManager.allToDos);
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

    const project = document.createElement("span");
    project.classList = "project-span";
    if (!todo.project) {
      const projectName = "Project: Unassigned";
      project.textContent = projectName;
    } else project.textContent = `Project: ${todo.project}`;

    project.setAttribute("hidden", "true");
    titleDateDiv.appendChild(project);

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

  showHome(header) {
    this.clearPage();
    this.setHeader(header);
    this.showTodoList(this.toDoManager.allToDos);
  }

  // getHighPriority() {
  //   const highPriority = this.toDoManager.allToDos.filter(
  //     (todo) => todo.priority === "High"
  //   );
  //   return highPriority;
  // }
  // getMediumPriority() {
  //   const MidPriority = this.toDoManager.allToDos.filter(
  //     (todo) => todo.priority === "Medium"
  //   );
  //   return MidPriority;
  // }
  // getLowPriority() {
  //   const lowPriority = this.toDoManager.allToDos.filter(
  //     (todo) => todo.priority === "Low"
  //   );
  //   return lowPriority;
  // }

  getProject(projectName) {
    return this.toDoManager.allToDos.filter(
      (todo) => todo.project == projectName
    );
  }

  checkDuplicateProject(project) {
    for (let proj of this.projects) {
      if (proj.projectName === project.projectName) {
        return true;
      }
    }
    return false;
  }
  setHeader(title) {
    const heading = document.createElement("h2");
    heading.textContent = title;
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
    container.appendChild(projectSpan);
    container.appendChild(projectButton);
    CURRENTPROJECTS.append(container);
  }
}

export { UIManager };
