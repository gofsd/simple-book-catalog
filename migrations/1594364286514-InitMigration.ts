import {MigrationInterface, QueryRunner} from "typeorm";

export class InitMigration1594364286514 implements MigrationInterface {
    name = 'InitMigration1594364286514'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "author" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book_categories_author" ("bookId" integer NOT NULL, "authorId" integer NOT NULL, CONSTRAINT "PK_7eaeefbde5060e08f058a1075d1" PRIMARY KEY ("bookId", "authorId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d919054c439cc7dde2a47b4a9d" ON "book_categories_author" ("bookId") `);
        await queryRunner.query(`CREATE INDEX "IDX_03ddff0171ebf2fd63ca16e67f" ON "book_categories_author" ("authorId") `);
        await queryRunner.query(`ALTER TABLE "book_categories_author" ADD CONSTRAINT "FK_d919054c439cc7dde2a47b4a9d0" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_categories_author" ADD CONSTRAINT "FK_03ddff0171ebf2fd63ca16e67fc" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_categories_author" DROP CONSTRAINT "FK_03ddff0171ebf2fd63ca16e67fc"`);
        await queryRunner.query(`ALTER TABLE "book_categories_author" DROP CONSTRAINT "FK_d919054c439cc7dde2a47b4a9d0"`);
        await queryRunner.query(`DROP INDEX "IDX_03ddff0171ebf2fd63ca16e67f"`);
        await queryRunner.query(`DROP INDEX "IDX_d919054c439cc7dde2a47b4a9d"`);
        await queryRunner.query(`DROP TABLE "book_categories_author"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TABLE "author"`);
    }

}
