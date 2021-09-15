import {MigrationInterface, QueryRunner} from "typeorm";

export class userUsername1631719801438 implements MigrationInterface {
    name = 'userUsername1631719801438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "username" character varying(25) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "username"`);
    }

}
