import { IInputCreateTodoListDTO, IOutputCreateTodoListDTO } from "../dto/create-todo-list";
import { ICreateUUIDService } from "../service/create-uuid";
import TodoList from "../entity/todo-list";
import TodoItem from "../entity/todo-item";
import TypeORMConnection from "../../02-infra/database/typeorm-connection";
import { TodoListEntity } from "../../03-framework/typeorm/entity/todo-list";
import { TodoItemEntity } from "../../03-framework/typeorm/entity/todo-item";

export default class CreateTodoListUsecase {
  name: string
  items: string[]

  constructor(input: IInputCreateTodoListDTO, readonly createUUIDService: ICreateUUIDService, readonly connection: TypeORMConnection) {
    this.name = input.name
    this.items = input.items
  }

  async execute(): Promise<IOutputCreateTodoListDTO> {
    const todoList = new TodoList({ name: this.name }, this.createUUIDService)
    this.items.forEach(item => {
      const todoItem = new TodoItem({
        name: item,
        listId: todoList.id
      }, this.createUUIDService)
      todoList.addItem(todoItem)
    })

    const databaseConnection = await this.connection.getConn()
    const todoListEntity = databaseConnection.getRepository(TodoListEntity)
    const todoItemEntity = databaseConnection.getRepository(TodoItemEntity)
    const todoListToSave = todoListEntity.create({ id: todoList.id, name: todoList.name })
    const items = []
    if (todoList.items.length) {
      for (const item of todoList.items) {
        const { id, name, isChecked, listId } = item
        items.push(todoItemEntity.create({ id, name, checked: isChecked.bind(item)(), list_id: listId }))
      }
    }

    await todoListEntity.save(todoListToSave, { transaction: true })
    await todoItemEntity.save(items, { transaction: true })

    return {
      id: todoList.id,
      name: todoList.name,
      items: todoList.items,
    }
  }
}