import { createConnection, getConnection, Connection } from 'typeorm'
import { IDatabaseConnection } from '../../../03-infra/database/database-connection'

export default class TypeORMConnection
  implements IDatabaseConnection
{
  constructor(readonly name: string = 'default') {}
  async connect() {
    await createConnection(this.name)
  }

  getConn() {
    return getConnection(this.name)
  }

  async close() {
    await getConnection(this.name).close()
  }
}
