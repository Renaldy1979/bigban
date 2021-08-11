import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterTypeColumnSegmentinAttributes1624672709533
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'attributes_origins',
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

    await queryRunner.createTable(
      new Table({
        name: 'attributes_segments',
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

    await queryRunner.dropColumn('attributes', 'segment');
    await queryRunner.dropColumn('attributes', 'origin');

    await queryRunner.addColumn(
      'attributes',
      new TableColumn({
        name: 'segment_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'attributes',
      new TableColumn({
        name: 'origin_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'attributes',
      new TableForeignKey({
        name: 'AttributesOrigin',
        columnNames: ['origin_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'attributes_origins',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'attributes',
      new TableForeignKey({
        name: 'AttributesSegment',
        columnNames: ['segment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'attributes_segments',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('attributes', 'AttributesSegment');
    await queryRunner.dropForeignKey('attributes', 'AttributesOrigin');

    await queryRunner.dropColumn('attributes', 'origin_id');
    await queryRunner.dropColumn('attributes', 'segment_id');

    await queryRunner.addColumn(
      'attributes',
      new TableColumn({
        name: 'origin',
        type: 'varchar',
        isNullable: false,
      }),
    );

    await queryRunner.addColumn(
      'attributes',
      new TableColumn({
        name: 'segment',
        type: 'varchar',
        isNullable: false,
      }),
    );

    await queryRunner.dropTable('attributes_segments');
    await queryRunner.dropTable('attributes_origins');
  }
}
