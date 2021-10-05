const router = require("express").Router();

router.use('/auth', require('./auth.routes'))
router.use('/user', require('./user.routes'))
router.use('/appointment', require('./appointment.routes'))
router.use('/uploads', require('./uploads.routes'))
router.use('/mailing', require('./mailing.routes'))

module.exports = router


