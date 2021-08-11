import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateAttributes1623884571431
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'attributes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'segment',
            type: 'varchar',
          },
          {
            name: 'origin',
            type: 'varchar',
          },
          {
            name: 'requester_id',
            type: 'uuid',
          },
          {
            name: 'attribute_name',
            type: 'varchar',
          },
          {
            name: 'business_rule',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'calculation_rule',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'exception_rule',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'use_case',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'domain',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'is_null',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'in_use',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'segment_review',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status_mkt',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'details_status_mkt',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'code_sprint',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'status_briefing',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'details_briefing',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'priority_sprint',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'production_date',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'source',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'no_rules',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'frequency',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'more_details',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'creater_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updater_id',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'attributes_inf_database',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'attribute_id',
            type: 'uuid',
          },
          {
            name: 'format',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'var_name',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'uuid',
          },
          {
            name: 'size',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'position',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sprint_add',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sprint_remove',
            type: 'varchar',
            isNullable: true,
          },

          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'creater_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updater_id',
            type: 'uuid',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'attributeInfDatabase',
            referencedTableName: 'attributes',
            referencedColumnNames: ['id'],
            columnNames: ['attribute_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'attributes',
      new TableForeignKey({
        name: 'AttributeRequester',
        columnNames: ['requester_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'attributes',
      new TableForeignKey({
        name: 'AttributeCreater',
        columnNames: ['creater_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'attributes',
      new TableForeignKey({
        name: 'AttributetUpdater',
        columnNames: ['updater_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('attributes', 'AttributeRequester');
    await queryRunner.dropForeignKey('attributes', 'AttributeCreater');
    await queryRunner.dropForeignKey('attributes', 'AttributetUpdater');
    await queryRunner.dropTable('attributes_inf_database');
    await queryRunner.dropTable('attributes');
  }
}
