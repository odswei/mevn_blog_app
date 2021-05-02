const router = require('express').Router()

router.use(require('./user'))
router.use('/p', require('./post'))

module.exports = router