import IRepositoryOptions from "../dto/repository-options";
import TodoItem from "../entity/todo-item";

export default interface ITodoItemRepository {
  write(todoItems: TodoItem[], options: IRepositoryOptions): Promise<void>
}