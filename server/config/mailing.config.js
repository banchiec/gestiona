const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'ironpopino@gmail.com',
        pass: 'popino12345'
    }
})

module.exports = transporter