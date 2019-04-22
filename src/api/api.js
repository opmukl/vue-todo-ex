class LocalStorageApi {
  constructor() {
    // api는 필요할때만 호출... 
    this.todos = JSON.parse(localStorage.getItem('todos'))
  }

  // add
  addTodo(newTodo){
    const maxId =
      this.todos.length > 0
        ? Math.max(...this.todos.map(todo => todo.id))
        : 0
    this.todos.push({
      text: newTodo,
      id: maxId + 1,
      done: false
    })
    this.saveTodos()
  }

  // update
  updateTodos(todos){
    this.todos = todos
    this.saveTodos()
  }


  // edit
  updateTodoText(todoId, editedText){
    const todo = this.todos.find(todo => todo.id === todoId)
    todo.text = editedText // state 직접 수정하면안됨...... 복사본...... 원본변경막기...넹
    this.saveTodos()
  }

  updateDoneState(todoId){
    const todo = this.todos.find(todo => todo.id === todoId)
    todo.done = !todo.done
    this.saveTodos()
  }


  // delete
  deleteTodo(todoId){
    const selectedIdx = this.todos.findIndex(todo => todo.id === todoId)
    if (selectedIdx > -1) this.todos.splice(selectedIdx, 1)
    this.saveTodos()
  }

  deleteDoneTodos(){
    const doneTodos = this.todos.filter(todo => !todo.done)
    this.saveTodos(doneTodos)
  }


  // api 내에서 save
  saveTodos(todos){
    localStorage.setItem('todos', JSON.stringify(todos? todos : this.todos))
  }

}

export default new LocalStorageApi()