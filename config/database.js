const Sequelize = require("sequelize");

const db = new Sequelize("movies-node", "root", "password", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = db;
