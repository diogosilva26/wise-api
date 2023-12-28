import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1702013688239 implements MigrationInterface 
{

    public async up(queryRunner: QueryRunner): Promise<void> 
    {
        const userTable = new Table(
        {
            name: "users",
            columns: 
            [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()",
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "45",
                },
                {
                    name: "email",
                    type: "varchar",
                    length: "45",
                    isUnique: true,
                },
                {
                    name: "password",
                    type: "varchar",
                },
                {
                    name: "phone",
                    type: "varchar",
                    length: "14"
                },
                {
                    name: "is_verify",
                    type: "boolean",
                    default: false
                },
                {
                    name: "avatar",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "created_at",
                    type: "timestamp with time zone",
                    default: "now()",
                },
                {
                    name: "updated_at",
                    type: "timestamp with time zone",
                    default: "now()",
                },
            ]
        });

        await queryRunner.createTable(userTable);
    }

    public async down(queryRunner: QueryRunner): Promise<void> 
    {
        await queryRunner.dropTable("users");
    }
}
