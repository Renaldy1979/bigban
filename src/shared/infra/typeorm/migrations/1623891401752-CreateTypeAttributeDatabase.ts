import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTypeAttributeDatabase1623891401752
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'types_attribute_database',
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
      `ALTER TABLE "attributes_inf_database" RENAME COLUMN "type" TO "type_id"`,
    );

    await queryRunner.createForeignKey(
      'attributes_inf_database',
      new TableForeignKey({
        name: 'TypeInfDatabase',
        columnNames: ['type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'types_attribute_database',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'attributes_inf_database',
      'TypeInfDatabase',
    );
    await queryRunner.query(
      `ALTER TABLE "attributes_inf_database" RENAME COLUMN "type_id" TO "type"`,
    );

    await queryRunner.dropTable('type_attribute_database');
  }
}
