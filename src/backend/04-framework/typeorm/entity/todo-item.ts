import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { TodoListEntity } from "./todo-list";

@Entity('todo_item')
export default class TodoItemEntity {
  @PrimaryColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 50 })
  name: string

  @Column('bool')
  checked: boolean

  @Column('uuid')
  list_id: string

  @ManyToOne(() => TodoListEntity)
  @JoinColumn({ name: 'list_id', referencedColumnName: 'id' })
  list: TodoListEntity
}
