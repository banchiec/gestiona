import React, { useState } from 'react'
import cardImage from '../../images/tarjetas.png'
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import PayService from '../../Services/pay.services'

const stripePromise = loadStripe("pk_test_51Jee3GIHSpkaOkhAbZHGqyte41wHQpoJqNKl4DLBX6s88WwLPE2sjY9gcdBjsiUDp2FhkBGcHJjLTrFZwoPMyWvc00IBpY0xCx")

const CheckoutForm = () => {
    const stripe = useStripe()
    const elements = useElements() //accede a los elementos de stripe
    const [loading, setLoading] = useState(false)

    const payService = new PayService()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement) // Es como el getById
        })
        setLoading(true)
        if (!error) {
            const { id } = paymentMethod
            try {
                const { data } = await payService.checkOut({ id, amount: 1000 })
                console.log(data)
                elements.getElement(CardElement).clear()
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
    }
    return <form className="card card-body mt-4" onClick={handleSubmit}>
        <img
            className="img-fluid"
            src={cardImage}
            style={{ width: 100 }}
            alt="foto de tarjetas de credito"
        />
        <h5 className="text-center"> Precio: 10€</h5>
        <div className="form-group">
            <CardElement className="form-control" />
        </div>
        <button className="btn btn-success mt-2" disabled={!stripe}>
            {loading ? (
                <div class="spinner-border text-info" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            ) : (
                "Buy"
            )
            }
        </button>
    </form>
}

export default function PayForm() {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    )
}
