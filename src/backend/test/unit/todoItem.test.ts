import TodoItem from "../../01-domain/entity/todo-item"
import CryptoUUIDService from "../../04-framework/services/crypto-uuid"

describe('Todo item entity', function () {
  test('Should todoItem was defined', function () {
    const todoItem = new TodoItem({
      name: 'tomar tererê',  
      listId: 'valid-uuid', 
      uuid: 'valid-uuid'
    }, new CryptoUUIDService())
    expect(todoItem).toMatchObject({
      id: 'valid-uuid',
      name: 'tomar tererê',
      checked: false,
      listId: 'valid-uuid', 
    })
  })

  test('Should toggle checked to true', function () {
    const todoItem = new TodoItem({name: 'tomar tererê', listId: 'valid-uuid'}, new CryptoUUIDService())
    todoItem.toggle()
    expect(todoItem.isChecked()).toBe(true)
  })

  test('Should toggle checked to false', function () {
    const todoItem = new TodoItem({name: 'tomar tererê', listId: 'valid-uuid'}, new CryptoUUIDService())
    todoItem.toggle()
    todoItem.toggle()
    expect(todoItem.isChecked()).toBe(false)
  })

  test('Should create a new TodoItem with new UUID', function () {
    const todoItem = new TodoItem({
      name: 'tomar tererê',  
      listId: 'valid-uuid', 
    }, new CryptoUUIDService())
    expect(todoItem.id).toEqual(expect.stringMatching(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i))
  })
})