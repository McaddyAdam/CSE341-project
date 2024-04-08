const router = require('express').Router();

const nikeController = require('../controllers/nikeCollection');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');


router.get('/', nikeController.getAll);

router.get('/:id', nikeController.getSingle);

router.post('/', validation.saveShoe, isAuthenticated, nikeController.createShoe);

router.put('/:id', validation.saveShoe, isAuthenticated, nikeController.updateShoe);

router.delete('/:id', isAuthenticated, nikeController.deleteShoe);

module.exports = router;


