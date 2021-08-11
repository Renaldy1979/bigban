import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateWorkflow1624552260984 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'workflows',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'type_id',
            type: 'uuid',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'date_opened',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'date_closed',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'code_in',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'code_pb',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'code_bug',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'priority',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status_id',
            type: 'uuid',
          },
          {
            name: 'requester_id',
            type: 'uuid',
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
        name: 'workflow_status',
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
      'workflows',
      new TableForeignKey({
        name: 'WorkflowStatus',
        columnNames: ['status_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'workflow_status',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'workflow_types',
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
      'workflows',
      new TableForeignKey({
        name: 'WorkflowTypeRequest',
        columnNames: ['type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'workflow_types',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'workflows',
      new TableForeignKey({
        name: 'WorkflowRequester',
        columnNames: ['requester_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'workflows',
      new TableForeignKey({
        name: 'WorkflowCreater',
        columnNames: ['creater_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'workflows',
      new TableForeignKey({
        name: 'WorkflowtUpdater',
        columnNames: ['updater_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'workflow_evolutions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'workflow_id',
            type: 'uuid',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'creater_id',
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

    await queryRunner.createForeignKey(
      'workflow_evolutions',
      new TableForeignKey({
        name: 'WorkflowId',
        columnNames: ['workflow_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'workflows',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'workflow_evolutions',
      new TableForeignKey({
        name: 'WorkflowEvolutionCreater',
        columnNames: ['creater_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'workflows_attributes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'workflow_id',
            type: 'uuid',
          },
          {
            name: 'attribute_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'workflows_attributes',
      new TableForeignKey({
        name: 'WorkflowId',
        columnNames: ['workflow_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'workflows',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'workflows_attributes',
      new TableForeignKey({
        name: 'WorkflowItemAtribute',
        columnNames: ['attribute_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'attributes',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('workflows_attributes');
    await queryRunner.dropTable('workflow_evolutions');
    await queryRunner.dropTable('workflow_types');
    await queryRunner.dropTable('workflow_status');
    await queryRunner.dropTable('workflows');
  }
}
