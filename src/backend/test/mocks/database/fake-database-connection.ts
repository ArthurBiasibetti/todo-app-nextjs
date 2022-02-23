import { IDatabaseConnection } from '../../../03-infra/database/database-connection'

export default class FakeDatabaseConnection implements IDatabaseConnection {
  async connect() {
    return void 0
  }
  async getConn() {
    return jest.fn()
  }
  async close() {
    return void 0
  }
}
