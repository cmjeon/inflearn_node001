const { Sequelize, Model, User, sequelize } = require('../models');

sequelize.sync({ force: true });

module.exports = () => {
  return sequelize.sync({ force: true });
}