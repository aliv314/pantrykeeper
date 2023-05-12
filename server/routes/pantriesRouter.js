const router = require('express').Router();
const pantriesController = require('../controllers/pantriesController');

router.route('/')
.get(pantriesController.getPantries)
.post(pantriesController.postPantry)

router.route('/:id')
.get(pantriesController.getPantry)
.put(pantriesController.putPantry)
.delete(pantriesController.delPantry)

module.exports = router;