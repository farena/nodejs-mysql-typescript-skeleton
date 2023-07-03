/* eslint-disable @typescript-eslint/no-var-requires */
import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize";

import DB_CONFIG from "./Config/db.config";
const env = process.env.NODE_ENV || "development";
const config = DB_CONFIG[env as keyof typeof DB_CONFIG];

const connection = new Sequelize({
  dialect: config.dialect as Dialect,
  host: config.host,
  username: config.username,
  password: config.password,
  database: config.database,
  port: config.port as unknown as number,
  logging: config.logging,
  models: [],
});

export default connection;
