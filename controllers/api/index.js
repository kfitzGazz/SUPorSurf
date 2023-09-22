const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');


//http://localhost:3001/api/users
router.use('/users', userRoutes);

//http://localhost:3001/api/projects
router.use('/projects', projectRoutes);

module.exports = router;
