import IRepositoryOptions from '../dto/repository-options'
import TodoList from '../entity/todo-list'

export default interface ITodoListRepository {
  write(todoList: TodoList, options: IRepositoryOptions): Promise<void>
}
