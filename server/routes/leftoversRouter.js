const router = require('express').Router();
const leftoversRouter = require('../controllers/leftoversController');

router.route('/:pantry_id')
.get(leftoversRouter.getLeftovers)
.post(leftoversRouter.postLeftover)

router.route('/:pantry_id/:leftover_id')
.get(leftoversRouter.getLeftover)
.put(leftoversRouter.putLeftover)
.delete(leftoversRouter.delLeftover)


module.exports = router;