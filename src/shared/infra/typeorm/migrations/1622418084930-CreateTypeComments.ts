import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateTypeComments1622418084930
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('comments', 'type');

    await queryRunner.addColumn(
      'comments',
      new TableColumn({ name: 'type_id', type: 'uuid', isNullable: true }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'comment_types',
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
            name: 'component',
            type: 'varchar',
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
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'comments',
      new TableForeignKey({
        name: 'CommentType',
        columnNames: ['type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'comment_types',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('comments', 'CommentType');

    await queryRunner.dropTable('comment_types');

    await queryRunner.dropColumn('comments', 'type_id');

    await queryRunner.addColumn(
      'comments',
      new TableColumn({ name: 'type', type: 'varchar' }),
    );
  }
}
