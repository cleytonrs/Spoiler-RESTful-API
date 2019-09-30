const Sequelize = require('sequelize');
const sequelize = require('../database/database');
   
const Spoiler = sequelize.define('spoiler', {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER
  },
  title: {
    allowNull: false,
    type: Sequelize.STRING(255),
    validate: {
      len: [2, 255]
    }
  },
  author: {
    allowNull: false,
    type: Sequelize.STRING(40),
    validate: {
      len: [2, 40]
    }
  },
  description: {
    allowNull: false,
    type: Sequelize.STRING(255),
    validate: {
      len: [2, 255]
    }
  }
});
   
module.exports = Spoiler;