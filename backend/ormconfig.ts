import {DataSource} from "typeorm";

export const connectionSource = new DataSource({
  migrationsTableName: "migrations",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "math3036",
  database: "goexchange",
  migrations: [
    "./src/database/migrations/*.ts"
  ],
  entities: [
    "./src/entities/*.ts"
  ]
});
