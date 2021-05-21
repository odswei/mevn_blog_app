const router = require('express').Router()

router.use(require('./user'));
router.use(require('./series'));
router.use(require('./chapter'));
router.use(require('./content'));
router.use(require('./comment'));
router.use('/p', require('./post'));

module.exports = router