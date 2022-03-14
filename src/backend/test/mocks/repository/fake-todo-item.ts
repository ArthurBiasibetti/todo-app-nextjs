import ITodoItemRepository from '../../../01-domain/repository/todo-item-repository'

export default class FakeTodoItemRepository implements ITodoItemRepository {
  constructor() {}
  
  async write(): Promise<void> {
    return void 0
  }
}
