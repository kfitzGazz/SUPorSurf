const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class SurfBoard extends Model {}

SurfBoard.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    locationCity: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    locationState: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comments: {
      type: DataTypes.STRING,
    },
    
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },


    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'SurfBoard',
  }
);

module.exports = SurfBoard;
