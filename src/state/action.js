let nextTodoId = 0
export const addTodo = text => ({
  type: 'ADD_TASK',
  id: nextTodoId++,
  text
})

export const updateList = list => ({
  type: 'UPDATE_LIST',
  list
})

