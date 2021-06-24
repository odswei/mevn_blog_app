const router = require('express').Router()

router.use(require('./user'));
router.use("/api",require('./series'));
router.use(require('./chapter'));
router.use(require('./comment'));
router.use('/p', require('./post'));

module.exports = router