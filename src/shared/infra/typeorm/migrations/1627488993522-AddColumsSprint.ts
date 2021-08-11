import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddColumsSprint1627488993522
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sprints');

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
          },
          {
            name: 'status',
            type: 'uuid',
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
        name: 'sprints_dates',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'sprint_id',
            type: 'uuid',
          },
          {
            name: 'date_id',
            type: 'uuid',
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
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
        name: 'dates',
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

    await queryRunner.createForeignKey(
      'sprints_dates',
      new TableForeignKey({
        name: 'SprintDatesSprint',
        columnNames: ['sprint_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'sprints',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'sprints_dates',
      new TableForeignKey({
        name: 'SprintDatesDate',
        columnNames: ['date_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'dates',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.dropColumn('attributes', 'sprint_id');
    await queryRunner.dropColumn('attributes', 'status_briefing');
    await queryRunner.dropColumn('attributes', 'details_briefing');
    await queryRunner.dropColumn('attributes', 'priority_sprint');

    await queryRunner.createTable(
      new Table({
        name: 'attributes_sprints',
        columns: [
          {
            name: 'attribute_id',
            type: 'uuid',
          },
          {
            name: 'sprint_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'AttributeId',
            referencedTableName: 'attributes',
            referencedColumnNames: ['id'],
            columnNames: ['attribute_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'SprintId',
            referencedTableName: 'sprints',
            referencedColumnNames: ['id'],
            columnNames: ['sprint_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sprints_dates');
    await queryRunner.dropTable('dates');
    await queryRunner.dropTable('sprints');

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

    await queryRunner.addColumn(
      'attributes',
      new TableColumn({
        name: 'status_briefing',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'attributes',
      new TableColumn({
        name: 'details_briefing',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'attributes',
      new TableColumn({
        name: 'priority_sprint',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'attributes',
      new TableColumn({
        name: 'sprint_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
  }
}
