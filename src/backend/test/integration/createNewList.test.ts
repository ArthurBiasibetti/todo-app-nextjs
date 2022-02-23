import { Repository } from "typeorm"
import CreateTodoListUsecase from "../../01-domain/usecase/create-todo-list"
import TypeORMConnection from "../../02-infra/database/typeorm-connection"
import connection from "../../02-infra/database/typeorm-connection"
import CryptoUUIDService from "../../03-framework/services/create-uuid"
import { TodoListEntity } from "../../03-framework/typeorm/entity/todo-list"

describe('Create new list use case', function () {
  const connection = new TypeORMConnection('testing')
  beforeAll(async () => {
    await connection.create()
    const typeorm = await connection.getConn()
    await typeorm.runMigrations()
  })
  afterAll(async () => {
    const typeorm = await connection.getConn()
    const migrations = typeorm.migrations
    for (let i = 0; i < migrations.length; i++) {
      await typeorm.undoLastMigration()
    }
    await connection.close()
  })

  beforeEach(async () => {
    await connection.clear()
  })

  
  test('List should be defined with three items', async function () {
    const input = {
      name: 'Lista 01',
      items: ['tomar tererê', 'tomar chimarrão', 'comer churrasco']
    }
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
  test('Should persist list on database', async function () {
    const input = {
      name: 'Lista 02',
      items: ['tomar coquinha', 'tomar água', 'comer pizza']
    }
    const spy = jest.spyOn(Repository.prototype, 'save')
    const usecase = new CreateTodoListUsecase(input, new CryptoUUIDService(), connection)
    await usecase.execute()
    expect(spy).toBeCalledTimes(2)
  })
})