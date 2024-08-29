class ToDoManager{
    constructor(){
        this.toDoList = []
    }
    addToDO(todo){
        this.toDoList.push(todo)
    }
}

export {ToDoManager}