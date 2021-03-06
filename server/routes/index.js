const router = require("express").Router();

router.use('/auth', require('./auth.routes'))
router.use('/user', require('./user.routes'))
router.use('/appointment', require('./appointment.routes'))
router.use('/uploads', require('./uploads.routes'))
router.use('/mailing', require('./mailing.routes'))
router.use('/pay', require('./pay.routes'))

module.exports = router


