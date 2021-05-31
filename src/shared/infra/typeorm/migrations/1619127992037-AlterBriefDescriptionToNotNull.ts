import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AlterBriefDescriptionToNotNull1619127992037
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "projects" SET "brief_description" = 'DEFINIR' WHERE "brief_description" IS NULL `,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ALTER COLUMN "brief_description" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "projects" ALTER COLUMN "brief_description" SET NULL`,
    );

    await queryRunner.query(
      `UPDATE "projects" SET "brief_description" = NULL WHERE "brief_description" = 'DEFINIR' `,
    );
  }
}
