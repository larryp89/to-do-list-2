class DialogManager {
  constructor() {
    this.addToDoDialog = document.querySelector(".to-do-dialog");
    this.addProjectDialog = document.querySelector(".project-dialog");
    this.projectToDoDialog = document.querySelector(".project-to-do-dialog");
    this.updateToDoDialog;
  }

  showDialog(dialog) {
    dialog.showModal();
  }

  closeDialog(dialog) {
    dialog.close();
  }

  generateUpdateDialog() {
    const updateDialog = document.createElement("dialog");
    updateDialog.classList.add("update-to-do-dialog");
    this.updateToDoDialog = updateDialog;
    return updateDialog;
  }
}

export { DialogManager };
