const router = require('express').Router();
const ingredientsRouter = require('../controllers/ingredientsController');

router.route('/:pantry_id')
.get(ingredientsRouter.getIngredients)
.post(ingredientsRouter.postIngredient)

router.route('/:pantry_id/:leftover_id')
.get(ingredientsRouter.getIngredient)
.put(ingredientsRouter.putIngredient)
.delete(ingredientsRouter.delIngredient)


module.exports = router;