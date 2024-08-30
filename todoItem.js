import { format, differenceInCalendarDays } from "date-fns";
class ToDoItem {
  constructor(name, description, priority, dueDate) {
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.date = dueDate;
    this.status;
    this.isComplete = false;
    this.dataAttribute;
    this.setStatus();
  }
  // set status according to priority and date
  setStatus() {
    const today = format(new Date(), "MM/dd/yyyy");
    const difference = differenceInCalendarDays(this.date, today);

    if (this.priority === "important" && difference <= 2) {
      this.status = "Urgent";
    } else if (this.priority === "important" && difference > 2) {
      this.status = "Non-urgent";
    } else if (this.priority === "not important" && difference <= 3) {
      this.status = "Delegate";
    } else if (this.priority === "not important" && difference > 3) {
      this.status = "Discard";
    }
  }
}

export { ToDoItem };
