import { format, differenceInCalendarDays } from "date-fns";

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

  editToDo(id, title, description, duedate, priority) {
    for (let todo of this.toDoList) {
      if (todo.id === id) {
        todo.name = title;
        todo.description = description;
        todo.date = duedate;
        todo.priority = priority;
      }
    }
  }
  // set status according to priority and date
  setStatus(todo) {
    const today = format(new Date(), "MM/dd/yyyy");
    const difference = differenceInCalendarDays(todo.date, today);

    if (todo.priority === "important" && difference <= 2) {
      todo.status = "Urgent";
    } else if (todo.priority === "important" && difference > 2) {
      todo.status = "Non-urgent";
    } else if (todo.priority === "not important" && difference <= 3) {
      todo.status = "Delegate";
    } else if (todo.priority === "not important" && difference > 3) {
      todo.status = "Discard";
    }
  }
}

export { ToDoManager };
