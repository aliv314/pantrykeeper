const router = require('express').Router();
const foodsRouter = require('../controllers/foodsController');

router.route('/:pantry_id')
.get(foodsRouter.getFoods)
.post(foodsRouter.postFoods)

router.route('/:pantry_id/:foods_id')
.get(foodsRouter.getFood)
.put(foodsRouter.putFood)
.delete(foodsRouter.delFood)


module.exports = router;