import ITodoItemRepository from '../../../01-domain/repository/todo-item-repository'
import FakeDatabaseConnection from '../database/fake-database-connection'

export default class FakeTodoItemRepository implements ITodoItemRepository {
  constructor(readonly databaseConnection: FakeDatabaseConnection) {}
  
  async write(): Promise<void> {
    return void 0
  }
}
