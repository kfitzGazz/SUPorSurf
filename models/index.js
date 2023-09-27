const User = require('./User');
const SurfBoard = require('./SurfBoard');
const Emoji = require('./Emoji');

User.hasMany(SurfBoard, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

SurfBoard.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Emoji, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Emoji.belongsTo(User, {
  foreignKey: 'user_id'
});

SurfBoard.hasMany(Emoji, {
  foreignKey: 'surfboard_id',
  onDelete: 'CASCADE'
});

Emoji.belongsTo(SurfBoard, {
  foreignKey: 'surfboard_id'
});

module.exports = { User, SurfBoard, Emoji };
