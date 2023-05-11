const router = require('express').Router();
const pantriesController = require('../controllers/pantriesController');

router.route('/')
.get(pantriesController.getPantries);

router.route('/:id')
.get(pantriesController.getPantry)
.post(pantriesController.postPantry)
.put(pantriesController.putPantry)
.delete(pantriesController.delPantry)

module.exports = router;