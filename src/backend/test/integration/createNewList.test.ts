import CreateTodoListUsecase from "../../01-domain/usecase/create-todo-list"
import TypeORMConnection from "../../02-infra/database/typeorm-connection"
import connection from "../../02-infra/database/typeorm-connection"
import CryptoUUIDService from "../../03-framework/services/create-uuid"

describe('Create new list use case', function () {
  const connection = new TypeORMConnection('testing')
  beforeAll(async () => {
    await connection.create()
  })
  afterAll(async () => {
    await connection.close()
  })

  beforeEach(async () => {
    await connection.clear()
  })

  const input = {
    name: 'Lista 01',
    items: ['tomar tererê', 'tomar chimarrão', 'comer churrasco'] 
  }

  test('List should be defined', async function () {
    const usecase = new CreateTodoListUsecase(input, new CryptoUUIDService(), connection)
    const todoList = await usecase.execute()
    expect(todoList).toMatchObject({
      id: expect.stringMatching(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i),
      name: 'Lista 01',
      items: [
        {
          id: expect.stringMatching(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i),
          name: 'tomar tererê',
          listId: todoList.id,
          checked: false,
        },
        {
          id: expect.stringMatching(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i),
          name: 'tomar chimarrão',
          listId: todoList.id,
          checked: false,
        },
        {
          id: expect.stringMatching(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i),
          name: 'comer churrasco',
          listId: todoList.id,
          checked: false,
        }
      ]
    })
  })
})