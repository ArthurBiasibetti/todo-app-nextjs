import TodoItem from "../../01-domain/entity/todo-item"
import TodoList from "../../01-domain/entity/todo-list"
import CryptoUUIDService from "../../04-framework/services/crypto-uuid"

describe('Test Todo List Entity', function () {
  test('Should todo list was defined', function () {
    const todoList = new TodoList({name: 'Test', uuid: 'valid-uuid'}, new CryptoUUIDService())
   
    expect(todoList).toMatchObject({
      name: 'Test',
      items: []
    })
  })

  test('Should add a todoItem into todo list', function () {
    const todoList = new TodoList({name: 'Test', uuid: 'valid-uuid'}, new CryptoUUIDService())
    const todoItem = new TodoItem({name: 'Item', uuid: 'valid-another-uuid', listId: 'valid-uuid'}, new CryptoUUIDService())
    const todoItem2 = new TodoItem({name: 'Item ola', uuid: 'valid-uuid2', listId: 'valid-uuid'}, new CryptoUUIDService())

    todoList.addItem(todoItem)
    todoList.addItem(todoItem2)

    expect(todoList.items).toMatchObject([{
      id: 'valid-another-uuid',
      name: 'Item',
      checked: false,
      listId: 'valid-uuid'
    }, {
      id: 'valid-uuid2',
      name: 'Item ola',
      checked: false,
      listId: 'valid-uuid'
    }])
  })

  test('Should remove a todoItem into todo list', function () {
    const todoList = new TodoList({name: 'Test', uuid: 'valid-uuid'}, new CryptoUUIDService())
    const todoItem = new TodoItem({name: 'Item', uuid: 'valid-another-uuid', listId: 'valid-uuid'}, new CryptoUUIDService())
    const todoItem2 = new TodoItem({name: 'Item ola', uuid: 'valid-uuid2', listId: 'valid-uuid'},  new CryptoUUIDService())

    todoList.addItem(todoItem)
    todoList.addItem(todoItem2)
    todoList.removeItem(todoItem.id)

    expect(todoList.items).toMatchObject([{
      name: 'Item ola',
      checked: false,
      listId: 'valid-uuid'
    }])
  })
  
  test('Should count items into list', function () {
    const todoList = new TodoList({name: 'Test', uuid: 'valid-uuid'}, new CryptoUUIDService())
    const todoItem = new TodoItem({name: 'Item', uuid: 'valid-another-uuid', listId: 'valid-uuid'}, new CryptoUUIDService())
    const todoItem2 = new TodoItem({name: 'Item ola', uuid: 'valid-uuid2', listId: 'valid-uuid'},  new CryptoUUIDService())

    todoList.addItem(todoItem)
    todoList.addItem(todoItem2)
    const count = todoList.count()
    expect(count).toBe(2)
  })

  test('Should count checked items into list', function () {
    const todoList = new TodoList({name: 'Test', uuid: 'valid-uuid'}, new CryptoUUIDService())
    const todoItem = new TodoItem({name: 'Item', uuid: 'valid-another-uuid', listId: 'valid-uuid'}, new CryptoUUIDService())
    const todoItem2 = new TodoItem({name: 'Item ola', uuid: 'valid-uuid2', listId: 'valid-uuid'},  new CryptoUUIDService())

    todoItem2.toggle()
    todoList.addItem(todoItem)
    todoList.addItem(todoItem2)
    
    const count = todoList.checkedCount()
    expect(count).toBe(1)
  })

  test('Should count checked items into list', function () {
    const todoList = new TodoList({name: 'Test', uuid: 'valid-uuid'}, new CryptoUUIDService())
    const todoItem = new TodoItem({name: 'Item', uuid: 'valid-another-uuid', listId: 'valid-uuid'}, new CryptoUUIDService())
    const todoItem2 = new TodoItem({name: 'Item ola', uuid: 'valid-uuid2', listId: 'valid-uuid'},  new CryptoUUIDService())

    todoItem2.toggle()
    todoList.addItem(todoItem)
    todoList.addItem(todoItem2)
    
    const count = todoList.uncheckedCount()
    expect(count).toBe(1)
  })

  test('Should create a new TodoList with new UUID', function () {
    const todoList = new TodoList({ name: 'Test' }, new CryptoUUIDService())
    expect(todoList.id).toEqual(expect.stringMatching(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i))
  })
})