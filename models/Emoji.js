const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Emoji extends Model {

}

Emoji.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    emojiName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },

    surfboard_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'surfboard',
        key: 'id',
      },
    },
  },
  {
   
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'emoji',
  }
);

module.exports = Emoji;
