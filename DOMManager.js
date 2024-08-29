class DOMManager {
  constructor() {
    const addToDoButton = document
      .querySelector(".add-to-do")
      .addEventListener("click", function () {
        console.log("clicked");
      });
  }
}

export { DOMManager };
