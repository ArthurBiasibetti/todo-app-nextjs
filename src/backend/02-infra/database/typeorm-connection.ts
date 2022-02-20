import {createConnection, getConnection, Connection} from 'typeorm';

export default class TypeORMConnection {
  constructor(readonly name: string) {}
  
  async create(){
    await createConnection(this.name);
    console.log('Database connected!')
  }

  async getConn(): Promise<Connection> {
    return getConnection()
  }

  async close(){
    await getConnection(this.name).close(); 
    console.log('Database disconnected!')
  }

  async clear(){
    const connection = getConnection(this.name);
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  }
}
