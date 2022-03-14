import ITodoListRepository from '../../../01-domain/repository/todo-list-repository'

export default class FakeTodoListRepository implements ITodoListRepository {
  constructor() {}

  async write(): Promise<void> {
    return void 0
  }
}
