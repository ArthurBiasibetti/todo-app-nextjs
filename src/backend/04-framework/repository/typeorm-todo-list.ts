import { Repository } from 'typeorm'
import IRepositoryOptions from '../../01-domain/dto/repository-options'
import TodoList from '../../01-domain/entity/todo-list'
import ITodoListRepository from '../../01-domain/repository/todo-list-repository'
import TypeORMConnection from '../typeorm/database/typeorm-connection'
import { TodoListEntity } from '../typeorm/entity/todo-list'

export default class TypeORMTodoListRepository implements ITodoListRepository {
  todoListModel: Repository<TodoListEntity>

  constructor(readonly databaseConnection: TypeORMConnection) {
    const connection = databaseConnection.getConn()
    this.todoListModel = connection.getRepository(TodoListEntity)
  }

  async write(todoList: TodoList, options: IRepositoryOptions): Promise<void> {
    const list = this.todoListModel.create({
      id: todoList.id,
      name: todoList.name,
    })
    await this.todoListModel.save(list, { transaction: options.transaction })
  }
}
