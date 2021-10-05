const express = require("express");
const transporter = require('../config/mailing.config')
// const = require("../models/Appointment.model");
const router = express.Router();

router.get('/', (req, res) => {
    res.send("estamos")
})
router.post('/send', (req, res, next) => {
    const text = "Su cita esta confirmada"
    const { name, to } = req.body

    transporter
        .sendMail({
            from: `Contacto web ${name} <myawesome@gmail.com>`,
            to: to,
            subject: 'Cita confirmada',
            text: text,
            html: `<b>${text}</b>`
        })
        .then(info => res.send(info))
        .catch(error => console.log(error))

})
module.exports = router
