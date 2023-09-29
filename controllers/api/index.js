const router = require('express').Router();
const userRoutes = require('./userRoutes');
const surfBoardRoutes = require('./surfBoardRoutes');


//http://localhost:3001/api/users
router.use('/users', userRoutes);

//http://localhost:3001/api/surfboard
router.use('/surfboard', surfBoardRoutes);

module.exports = router;
