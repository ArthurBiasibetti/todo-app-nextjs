import { Repository } from "typeorm";
import ITodoItemRepository from "../../01-domain/repository/todo-item-repository";
import TypeORMConnection from "../typeorm/database/typeorm-connection";
import { TodoItemEntity } from "../typeorm/entity/todo-item";

export default class TypeORMTodoItemRepository implements ITodoItemRepository {
  todoItemModel: Repository<TodoItemEntity>

  constructor(readonly databaseConnection: TypeORMConnection) {
     const connection = databaseConnection.getConn()
     this.todoItemModel = connection.getRepository(TodoItemEntity)
  }
  
  write(): Promise<void> {
    throw new Error("Method not implemented.");
  }

}