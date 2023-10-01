const router = require('express').Router();
const { SurfBoard,User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('User ID:', req.session.user_id);
    const newSurfBoard = await SurfBoard.create({
    
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newSurfBoard);
  } catch (err) {
    res.status(400).json(err);
  }
});

//req.body will show all information inside of SurfBoard model

router.delete('/:id', async (req, res) => {
  try {
    const SurfBoardData = await SurfBoard.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!SurfBoardData) {
      res.status(404).json({ message: 'No SurfBoard found with this id!' });
      return;
    }

    res.status(200).json(SurfBoardData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//^this will delete a post based on the id and user_id, so when creating the detelet button need to make sure these are the parameters used. 

//http://localhost:3001/api/SurfBoards/
router.get("/", async (req, res) => {
  try {
    const SurfBoardData = await SurfBoard.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    res.status(200).json(SurfBoardData);
  } catch (err) {
    res.status(400).json(err);
  }
})
module.exports = router;
