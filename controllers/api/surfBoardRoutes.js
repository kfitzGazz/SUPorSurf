const router = require('express').Router();
const { SurfBoard,User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newSurfBoard = await SurfBoard.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newSurfBoard);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
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


//http://localhost:3001/api/SurfBoards/
router.get("/", withAuth, async (req, res) => {
  try {
    const SurfBoardData = await SurfBoard.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    res.status(200).json(SurfBoardData);
  } catch (err) {
    res.status(400).json(err);
  }
})
module.exports = router;
