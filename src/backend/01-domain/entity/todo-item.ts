import { IUUIDService } from "../service/create-uuid"

interface ITodoItem {
  name: string
  listId: string
  uuid?: string
}

export default class TodoItem {
  readonly id: string
  readonly name: string
  private checked: boolean
  readonly listId: string

  constructor(input: ITodoItem, createUUIDService: IUUIDService) {
    this.id = input.uuid || createUUIDService.create()
    this.name = input.name
    this.checked = false
    this.listId = input.listId
  }

  public toggle() {
    this.checked = !this.checked
  }

  public isChecked() {
    const checked = this.checked
    return checked
  }
}