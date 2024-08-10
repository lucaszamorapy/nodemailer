const { Sequelize } = require(sequelize);

const sequelize = new Sequelize("r2r-eventos", "root", "123", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
