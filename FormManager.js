import { format } from "date-fns";

class FormManager {
  constructor() {
    this.addToDoForm = document.querySelector(".add-to-do-form");
    this.updateToDoForm;
  }

  getFormData(form) {
    const title = form.querySelector("#title").value;
    const details = form.querySelector("#details").value;
    const priority = form.querySelector("#priority").value;
    const dueDate = form.querySelector("#due-date").value;

    // convert & tidy due date
    const date = format(new Date(dueDate), "MM/dd/yyyy");

    return { title, details, priority, date };
  }

  getAddFormData() {
    return this.getFormData(this.addToDoForm);
  }

  getUpdateFormData() {
    return this.getFormData(this.updateToDoForm);
  }

  clearForm(form) {
    form.reset();
  }

  clearAddForm() {
    this.clearForm(this.addToDoForm);
  }

  clearUpdateForm() {
    this.clearForm(this.updateToDoForm);
  }

  // clearProjectForm() {
  //   document.querySelector(".project-name").value = "";
  // }

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
    firstOption.setAttribute("value", "High");
    firstOption.textContent = "High`";
    const secondOption = document.createElement("option");
    secondOption.setAttribute("value", "Medium");
    secondOption.textContent = "Medium";
    const thirdOption = document.createElement("option");
    thirdOption.setAttribute("value", "Low");
    thirdOption.textContent = "Low";
    if (todo.priority === "High") {
      firstOption.setAttribute("selected", "selected");
    } else if (todo.priority === "Medium") {
      secondOption.setAttribute("selected", "selected");
    } else {
      thirdOption.setAttribute("selected", "selected");
    }

    selectPriority.appendChild(firstOption);
    selectPriority.appendChild(secondOption);
    selectPriority.appendChild(thirdOption);

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

    this.updateToDoForm = updateForm;
    return updateForm;
  }
}

export { FormManager };
