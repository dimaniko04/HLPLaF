import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductInfoCascade1713800238015 implements MigrationInterface {
    name = 'ProductInfoCascade1713800238015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_info" DROP CONSTRAINT "FK_49062c354dec60389d1ee776b4b"`);
        await queryRunner.query(`ALTER TABLE "product_info" ADD CONSTRAINT "FK_49062c354dec60389d1ee776b4b" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_info" DROP CONSTRAINT "FK_49062c354dec60389d1ee776b4b"`);
        await queryRunner.query(`ALTER TABLE "product_info" ADD CONSTRAINT "FK_49062c354dec60389d1ee776b4b" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
