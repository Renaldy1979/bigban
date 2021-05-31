import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateStatus1619130713768 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'status',
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
            isUnique: true,
          },
          {
            name: 'color',
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
      `ALTER TABLE "projects" RENAME COLUMN "internal_status" TO "status_id"`,
    );

    await queryRunner.query(
      `ALTER TABLE "projects" ALTER COLUMN "status_id" TYPE uuid USING "status_id"::uuid`,
    );

    await queryRunner.dropColumn('projects', 'internal_book');

    await queryRunner.createForeignKey(
      'projects',
      new TableForeignKey({
        columnNames: ['status_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'status',
        name: 'fk_status_project',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('projects', 'fk_status_project');

    await queryRunner.addColumn(
      'projects',
      new TableColumn({
        name: 'internal_book',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.query(
      `ALTER TABLE "projects" ALTER COLUMN "status_id" TYPE varchar USING "status_id"::varchar`,
    );

    await queryRunner.query(
      `ALTER TABLE "projects" RENAME COLUMN "status_id" TO "internal_status"`,
    );

    await queryRunner.dropTable('status');
  }
}
