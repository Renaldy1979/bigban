import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateSprint1623892548704 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sprints',
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
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.query(
      `ALTER TABLE "attributes" RENAME COLUMN "code_sprint" TO "sprint_id"`,
    );

    await queryRunner.createForeignKey(
      'attributes',
      new TableForeignKey({
        name: 'AttributesSprint',
        columnNames: ['sprint_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'sprints',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('attributes', 'AttributesSprint');
    await queryRunner.query(
      `ALTER TABLE "attributes" RENAME COLUMN "sprint_id" TO "code_sprint"`,
    );
    await queryRunner.dropTable('sprints');
  }
}
