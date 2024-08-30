class ToDoManager {
  constructor() {
    this.toDoList = [];
  }
  addToDO(todo) {
    this.toDoList.push(todo);
    console.log(this.toDoList);
  }

  assignID() {
    for (let todo of this.toDoList) {
      todo.id = this.toDoList.indexOf(todo);
    }
  }

  deleteToDo(id) {
    this.toDoList = this.toDoList.filter(function (toDo) {
      return toDo.id !== id;
    });
    console.log(this.toDoList);
  }
}

export { ToDoManager };
