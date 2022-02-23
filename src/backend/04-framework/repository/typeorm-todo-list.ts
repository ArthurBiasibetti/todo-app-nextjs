import { Repository } from 'typeorm'
import { ITodoListRepository } from '../../01-domain/repository/todo-list-repository'
import TypeORMConnection from '../typeorm/database/typeorm-connection'
import { TodoListEntity } from '../typeorm/entity/todo-list'

export default class TypeORMTodoListRepository implements ITodoListRepository {
  todoListModel: Repository<TodoListEntity>

  constructor(readonly databaseConnection: TypeORMConnection) {
     const connection = databaseConnection.getConn()
     this.todoListModel = connection.getRepository(TodoListEntity)
  }

  write(): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
