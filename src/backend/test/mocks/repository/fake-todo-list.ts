import ITodoListRepository from '../../../01-domain/repository/todo-list-repository'
import FakeDatabaseConnection from '../database/fake-database-connection'

export default class FakeTodoListRepository implements ITodoListRepository {
  constructor(readonly databaseConnection: FakeDatabaseConnection) {}

  async write(): Promise<void> {
    return void 0
  }
}
