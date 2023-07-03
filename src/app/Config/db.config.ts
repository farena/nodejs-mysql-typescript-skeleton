export default {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    dialect: "mariadb",
    dialectOptions: {
      bigNumberStrings: true,
      timezone: "-00:00",
    },
    define: {
      freezeTableName: 1,
      underscored: true,
      underscoredAll: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  production: {
    username: process.env.DB_PROD_USERNAME,
    password: process.env.DB_PROD_PASSWORD,
    database: process.env.DB_PROD_NAME,
    host: process.env.DB_PROD_HOSTNAME,
    port: process.env.DB_PROD_PORT,
    dialect: "mariadb",
    logging: false,
    dialectOptions: {
      bigNumberStrings: true,
      timezone: "-00:00",
      // ssl: {
      //   ca: fs.readFileSync(__dirname + '/mariadb-ca-master.crt')
      // }
    },
    define: {
      freezeTableName: 1,
      underscored: true,
      underscoredAll: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
};
