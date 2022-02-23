import { Repository } from 'typeorm'
import CreateTodoListUsecase from '../../02-application/usecase/create-todo-list'
import CryptoUUIDService from '../../04-framework/services/crypto-uuid'
import FakeDatabaseConnection from '../mocks/database/fake-database-connection'
import FakeTodoItemRepository from '../mocks/repository/fake-todo-item'
import FakeTodoListRepository from '../mocks/repository/fake-todo-list'

describe('Create new list use case', function () {
  const databaseConnection = new FakeDatabaseConnection()
  const todoListRepository = new FakeTodoListRepository(databaseConnection)
  const todoItemRepository = new FakeTodoItemRepository(databaseConnection)
  test('List should be defined with three items', async function () {
    const input = {
      name: 'Lista 01',
      items: ['tomar tererê', 'tomar chimarrão', 'comer churrasco'],
    }
    const usecase = new CreateTodoListUsecase(
      new CryptoUUIDService(),
      todoListRepository,
      todoItemRepository
    )
    const todoList = await usecase.execute(input)
    expect(todoList).toMatchObject({
      id: expect.stringMatching(
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
      ),
      name: 'Lista 01',
      items: [
        {
          id: expect.stringMatching(
            /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
          ),
          name: 'tomar tererê',
          listId: todoList.id,
          checked: false,
        },
        {
          id: expect.stringMatching(
            /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
          ),
          name: 'tomar chimarrão',
          listId: todoList.id,
          checked: false,
        },
        {
          id: expect.stringMatching(
            /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
          ),
          name: 'comer churrasco',
          listId: todoList.id,
          checked: false,
        },
      ],
    })
  })
  test('Should persist list on database', async function () {
    const input = {
      name: 'Lista 02',
      items: ['tomar coquinha', 'tomar água', 'comer pizza'],
    }
    const spyList = jest.spyOn(todoListRepository, 'write')
    const spyItem = jest.spyOn(todoItemRepository, 'write')
    const usecase = new CreateTodoListUsecase(
      new CryptoUUIDService(),
      todoListRepository,
      todoItemRepository
    )
    await usecase.execute(input)
    expect(spyList).toBeCalledTimes(1)
    expect(spyItem).toBeCalledTimes(1)
  })
})
