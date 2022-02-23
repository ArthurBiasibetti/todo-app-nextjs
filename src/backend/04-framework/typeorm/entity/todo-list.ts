import { Entity, Column, PrimaryColumn, OneToMany, } from "typeorm";
import { TodoItemEntity } from "./todo-item";

@Entity('todo_list')
export class TodoListEntity {

  @PrimaryColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 50 })
  name: string

  @OneToMany(() => TodoItemEntity, item => item.list, {})
  items: TodoItemEntity[]
}
