import { ICreateUUIDService } from "../service/create-uuid";
import TodoItem from "./todo-item";

interface ITodoList {
  name: string
  uuid?: string
}

export default class TodoList {
  id: string
  name: string
  items: TodoItem[]

  constructor(input: ITodoList, createUUIDService: ICreateUUIDService){
    this.id = input.uuid || createUUIDService.create()
    this.name = input.name
    this.items = []
  }

  public addItem (item: TodoItem) {
    this.items.push(item)
  }

  public removeItem (itemId: string) {
    const indexToRemove = this.items.findIndex((item) => item.id === itemId );
    this.items.splice(indexToRemove, 1);
  }

  public count () {
    const itemsCount = this.items.length
    return itemsCount;
  }

  public checkedCount () {
    const itemsCount = this.items.filter((item) => item.isChecked() ).length
    return itemsCount;
  }

  public uncheckedCount () {
    const itemsCount = this.items.filter((item) => !item.isChecked() ).length
    return itemsCount;
  }
}