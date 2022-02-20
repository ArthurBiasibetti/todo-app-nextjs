import { IInputCreateTodoListDTO, IOutputCreateTodoListDTO } from "../dto/create-todo-list";
import { ICreateUUIDService } from "../service/create-uuid";
import TodoList from "../entity/todo-list";
import TodoItem from "../entity/todo-item";
import TypeORMConnection from "../../02-infra/database/typeorm-connection";

export default class CreateTodoListUsecase {
  name: string
  items: string[]

  constructor(input: IInputCreateTodoListDTO, readonly createUUIDService: ICreateUUIDService, readonly connection: TypeORMConnection) {
    this.name = input.name
    this.items = input.items
  }

  async execute(): Promise<IOutputCreateTodoListDTO> {
    const todoList = new TodoList({name: this.name}, this.createUUIDService)
    this.items.forEach(item => {
      const todoItem = new TodoItem({
        name: item,
        listId: todoList.id
      }, this.createUUIDService)
      todoList.addItem(todoItem)
    })

    return {
      id: todoList.id,
      name: todoList.name,
      items: todoList.items,
    }
  }
}