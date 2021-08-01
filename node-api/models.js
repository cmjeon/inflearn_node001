const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  logging: false,
});

class User extends Model { }
User.init({
  name: {
    type: DataTypes.STRING,
    unique: true
  }
}, { sequelize, modelName: 'user' });

module.exports = { Sequelize, Model, User, sequelize };