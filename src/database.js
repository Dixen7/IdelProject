// Sequelize
const initModels = require("./models/initModels.js");
const { Sequelize } = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize.Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD == '' ? null : process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  dialect: 'mysql',
  timezone: '+01:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  logging: (query, time) => {
    console.info(time + 'ms' + ' ' + query + '\n');
  },
  benchmark: true,
});

sequelize
  .authenticate()
  .then(() => {
    console.info('🟢 The database is connected.');
  })
  .catch((error) => {
    console.info(`🔴 Unable to connect to the database: ${error}.`);
  });

// INIT SEQUELIZE MODELS
const DB = initModels(sequelize);

module.exports.DB = DB;
module.exports.default = DB;