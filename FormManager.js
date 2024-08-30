import { format } from "date-fns";

class FormManager {
  constructor() {}

  getFormData() {
    // get form data and create toDo
    const title = document.querySelector("#title").value;
    const details = document.querySelector("#details").value;
    const priority = document.querySelector("#priority").value;
    const dueDate = document.querySelector("#due-date").value;

    // convert & tidy due date
    const date = format(new Date(dueDate), "MM/dd/yyyy");

    return { title, details, priority, date };
  }

  clearAddToDoForm() {
    document.querySelector("#title").value = "";
    document.querySelector("#details").value = "";
  }

  clearProjectForm() {
    document.querySelector(".project-name").value = "";
  }

  createUpdateForm(todo) {
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

    return updateForm;
  }
}

export { FormManager };
