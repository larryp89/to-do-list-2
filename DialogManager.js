class DialogManager {
  constructor() {
    this.mainDiv = document.querySelector(".main");
    this.addToDoDialog = document.querySelector(".to-do-dialog");
    this.addProjectDialog = document.querySelector(".project-dialog");
  }

  showDialog(dialog) {
    dialog.showModal();
  }

  closeDialog(dialog) {
    dialog.close();
  }

  generateUpdateDialog(form) {
    // Create dialog & form
    const updateDialog = document.createElement("dialog");
    updateDialog.classList.add("update-to-do-dialog");
    // Append form to dialog
    updateDialog.appendChild(form);
    return updateDialog;
  }
}

export { DialogManager };
