import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductImageField1714252140230 implements MigrationInterface {
    name = 'ProductImageField1714252140230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "img" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "img"`);
    }

}
