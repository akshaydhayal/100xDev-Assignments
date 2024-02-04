/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
  - `npm run test-todo-list`
*/

class Todo {
  constructor(){
    this.todos=[];
    this.id=1;
  }
  addTodo(task,desc){
    this.todos.push({
      "id":this.id,
      "task":task,
      "desc":desc,
      "completedStatus":false
    })
    this.id=this.id+1;
  }
  showAllTodo(){
    console.log(this.todos);
  }
  showTodo(id){
    console.log(this.todos[id-1]);
  }
  updateTodo(id,task,desc,status){
    for(let i=0; i<this.todos.length; i++){
      if(this.todos[i].id===id){
        this.todos[i].task=task;
        this.todos[i].desc=desc;
        this.todos[i].completedStatus=status;
      }
    }
  }
  deleteAllTodos(){
    this.todos=[];
  }
}

const todo=new Todo();
todo.addTodo("code","for 2 hours");
todo.addTodo("code dsa","for 2 hours");
todo.showAllTodo();
todo.updateTodo(2,"code dsaaaa","for 2 hours",true);
todo.showTodo(2);
todo.deleteAllTodos();
todo.showAllTodo();

module.exports = Todo;
