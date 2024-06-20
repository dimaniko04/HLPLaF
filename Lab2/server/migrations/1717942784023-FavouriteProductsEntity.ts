import { MigrationInterface, QueryRunner } from "typeorm";

export class FavouriteProductsEntity1717942784023 implements MigrationInterface {
    name = 'FavouriteProductsEntity1717942784023'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favorite" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_83b775fdebbe24c29b2b5831f2d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_b8e337759b77baa0a4055d1894e" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_b8e337759b77baa0a4055d1894e"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_83b775fdebbe24c29b2b5831f2d"`);
        await queryRunner.query(`DROP TABLE "favorite"`);
    }

}
