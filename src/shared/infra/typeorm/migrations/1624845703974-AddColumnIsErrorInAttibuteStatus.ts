import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnIsErrorInAttibuteStatus1624845703974
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'workflow_status',
      new TableColumn({
        name: 'is_error',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('workflow_status', 'is_error');
  }
}
