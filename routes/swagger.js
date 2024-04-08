const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocunment = require('../swagger.json');
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocunment));

module.exports = router;