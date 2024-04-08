const router = require('express').Router();
const passport = require('passport');



router.use('/', require('./swagger'));
router.use('/nike', require('./nikeCollection'));
router.use('/reebok', require('./reebokCollection'));

// router.get('/', (req, res) => {
//   // #swagger.tags=['Hello World']
//   res.send('Hello Folks, nothing to see here!');
// });


router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function (req, res, next) {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
