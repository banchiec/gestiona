const express = require("express");
const Stripe = require('stripe')
const router = express.Router();

const stripe = new Stripe(process.env.KEY_STRIPE)

router.post('/checkout', async (req, res) => {


    try {
        const { id, amount } = req.body
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "EUR",
            description: "Appointment confirm",
            payment_method: id,
            confirm: true
        })
        console.log(payment)
        res.send({ message: 'succesfull payment' })

    } catch (error) {
        console.log(error)
        res.json({ message: error.raw.message })

    }

})

module.exports = router
