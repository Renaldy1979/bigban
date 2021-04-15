import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateProjects1616795541797 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'projects',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'code',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'initiative',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'segment_priority',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'portfolio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'effort',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'brief_description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'justification',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'requester_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'request_date',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'scope_date',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'shipping_date',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'post_date',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'rollout_date',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'expectation_date',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'validated_scope',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'responsible_status',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'internal_status',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'internal_book',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'created_by',
            type: 'uuid',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_by',
            type: 'uuid',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('projects');
  }
}
