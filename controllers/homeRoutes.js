const router = require('express').Router();
const { SurfBoard, User } = require('../models');
const withAuth = require('../utils/auth');

//all html routes are doing get method is reading
//http://localhost:3001/
//this will read surfboard
router.get('/', async (req, res) => {
  try {
    // Get all SurfBoards and JOIN with user data
    const surfBoardData = await SurfBoard.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    //select user.name , SurfBoard.* from SurfBoard join user on user.id = SurfBoard.user_id

//SurfBoardData is raw data, can't use raw data on handlebar template
    // Serialize data so the template can read it
    //take raw data and format it to json
    const surfBoards = surfBoardData.map((surfBoard) => surfBoard.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      surfBoards, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//http://localhost:3001/SurfBoard/1
router.get('/surfboard', async (req, res) => {
  try {
    const SurfBoardData = await SurfBoard.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],

        },
      ],
      order:[["date_created", "desc"]] 
    });
const surfBoards = SurfBoardData.map(surfBoard=>surfBoard.get({plain:true}));
  
    console.log(surfBoards)
    res.render('surfBoard', {
      surfBoards,
       logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});




//http://localhost:3001/login
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }

  res.render('login');
});

module.exports = router;
