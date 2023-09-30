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
router.get('/surfboard/:id', async (req, res) => {
  try {
    const SurfBoardData = await SurfBoard.findByPk(req.params.id,{
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const surfBoard = SurfBoardData.get({ plain: true });

    res.render('surfBoard', {
      ...surfBoard,
      // logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//http://localhost:3001/profile
// Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: SurfBoard }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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
