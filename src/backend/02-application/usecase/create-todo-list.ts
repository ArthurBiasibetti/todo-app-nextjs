import {
  IInputCreateTodoListDTO,
  IOutputCreateTodoListDTO,
} from '../../01-domain/dto/create-todo-list'
import { IUUIDService } from '../../01-domain/service/create-uuid'
import TodoList from '../../01-domain/entity/todo-list'
import TodoItem from '../../01-domain/entity/todo-item'
import ITodoListRepository from '../../01-domain/repository/todo-list-repository'
import ITodoItemRepository from '../../01-domain/repository/todo-item-repository'

export default class CreateTodoListUsecase {
  constructor(
    readonly UUIDService: IUUIDService,
    readonly todoListRepository: ITodoListRepository,
    readonly todoItemRepository: ITodoItemRepository
  ) {}

  async execute(
    input: IInputCreateTodoListDTO
  ): Promise<IOutputCreateTodoListDTO> {
    const todoList = new TodoList({ name: input.name }, this.UUIDService)
    input.items.forEach((item) => {
      const todoItem = new TodoItem(
        {
          name: item,
          listId: todoList.id,
        },
        this.UUIDService
      )
      todoList.addItem(todoItem)
    })
    
    await this.todoListRepository.write(todoList, { transaction: true })
    await this.todoItemRepository.write(todoList.items, { transaction: true })

    return {
      id: todoList.id,
      name: todoList.name,
      items: todoList.items,
    }
  }
}
