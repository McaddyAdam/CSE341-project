const router = require('express').Router();

const reebokController = require('../controllers/reebokCollection');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');


router.get('/', reebokController.getAll);

router.get('/:id', reebokController.getSingle);

router.post('/', validation.saveShoe, isAuthenticated, reebokController.createShoe);

router.put('/:id', validation.saveShoe, isAuthenticated, reebokController.updateShoe);

router.delete('/:id', isAuthenticated, reebokController.deleteShoe);

module.exports = router;


