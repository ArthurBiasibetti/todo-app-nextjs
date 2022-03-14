import { Repository } from 'typeorm'
import IRepositoryOptions from '../../01-domain/dto/repository-options'
import TodoItem from '../../01-domain/entity/todo-item'
import ITodoItemRepository from '../../01-domain/repository/todo-item-repository'
import TypeORMConnection from '../typeorm/database/typeorm-connection'
import TodoItemEntity from '../typeorm/entity/todo-item'

export default class TypeORMTodoItemRepository implements ITodoItemRepository {
  todoItemModel: Repository<TodoItemEntity>

  constructor(readonly databaseConnection: TypeORMConnection) {
    const connection = databaseConnection.getConn()
    this.todoItemModel = connection.getRepository(TodoItemEntity)
  }
  
  async write(
    todoItems: TodoItem[],
    options: IRepositoryOptions
  ): Promise<void> {
    const items = []
    if (todoItems.length) return
    for (const item of todoItems) {
      const { id, name, isChecked, listId } = item
      items.push(
        this.todoItemModel.create({
          id,
          name,
          checked: isChecked.bind(item)(),
          list_id: listId,
        })
      )
    }
    await this.todoItemModel.save(items, { transaction: options.transaction })
  }
}
