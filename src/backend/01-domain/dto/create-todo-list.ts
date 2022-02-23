import TodoItem from "../entity/todo-item";

export interface IInputCreateTodoListDTO {
  name: string
  items: string[]
}

export interface IOutputCreateTodoListDTO {
  id: string
  name: string
  items: TodoItem[]
}