import { MigrationInterface, QueryRunner } from "typeorm";

export class FavouriteUniqueUserProductIndex1717943376625 implements MigrationInterface {
    name = 'FavouriteUniqueUserProductIndex1717943376625'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f0e7bf803aa937033d10dc07ed" ON "favorite" ("userId", "productId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_f0e7bf803aa937033d10dc07ed"`);
    }

}
