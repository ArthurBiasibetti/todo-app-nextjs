import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createTodoItem1645492443492 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'todo_item',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'name',
          type: 'varchar(50)',
          isNullable: false,
        },
        {
          name: 'checked',
          type: 'bool',
          default: false,
        },
        {
          name: 'list_id',
          type: 'uuid',
          isNullable: false
        }
      ],
      foreignKeys: [
        {
          name: 'fk_todo_list',
          columnNames: ['list_id'],
          referencedTableName: 'todo_list',
          referencedColumnNames: ['id'],
          onDelete: 'cascade',
        }
      ]
    }), true)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('todo_item', true)
  }

}
