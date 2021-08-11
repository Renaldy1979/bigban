import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AlterColumnStatusinAttributes1623895537202
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attributes" RENAME COLUMN "status_mkt" TO "status_id"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attributes" RENAME COLUMN "status_id" TO "status_mkt"`,
    );
  }
}
