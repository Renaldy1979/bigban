import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateStatussprint1627531556939
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sprint_status',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.query(
      `ALTER TABLE "sprints" RENAME COLUMN "status" TO "status_id"`,
    );

    await queryRunner.createForeignKey(
      'sprints',
      new TableForeignKey({
        name: 'StatusId',
        columnNames: ['status_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'sprint_status',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('sprints', 'StatusId');

    await queryRunner.query(
      `ALTER TABLE "sprints" RENAME COLUMN "status_id" TO "status"`,
    );

    await queryRunner.dropTable('sprint_status');
  }
}
