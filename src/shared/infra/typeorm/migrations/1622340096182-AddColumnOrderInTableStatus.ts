import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnOrderInTableStatus1622340096182
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'status',
      new TableColumn({
        name: 'order',
        type: 'int',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('status', 'order');
  }
}
