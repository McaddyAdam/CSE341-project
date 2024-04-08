const validator = require('../helpers/validate');

const saveShoe = (req, res, next) => {
  const validationRule = {
    brand: 'required|string',
    line: 'required|string',
    model: 'required|string',
    height: 'required|string',
    colors: 'required|string',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveShoe,
};
