const sequelize = require('../config/connection');
const { User, SurfBoard, Emoji } = require('../models');
const emojiData = require("./emojiData.json");

const userData = require('./userData.json');
const surfboardData = require('./SurfBoardData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const surfboard of surfboardData) {
    await SurfBoard.create({
      ...surfboard,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
const surfBoards = await SurfBoard.findAll()

  for (const emoji of emojiData) {
    await Emoji.create({
      ...emoji,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      surfboard_id: surfBoards[Math.floor(Math.random() * surfBoards.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
