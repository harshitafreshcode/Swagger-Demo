import "reflect-metadata"
import { DataSource } from 'typeorm'

const path = require("path");

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: 'root',
    database: "swagger_demo",
    // synchronize: true,
    logging: false,
    migrations:  [path.join(__dirname, "../", `src/migrations/*{.ts,.js}`)],
    migrationsTableName: "migrations",
    // entities: [`src/api/domain/entities/*.ts`],
    entities: [path.join(__dirname, "../", `src/entities/*{.ts,.js}`)],

})


// typeorm migration:create ./src/migration/NicheEntity





