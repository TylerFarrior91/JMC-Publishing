const express = require('express');
const stripe = require('stripe')('your_stripe_secret_key');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.post('/purchase', express.json(), (req, res) => {
    // Replace this with your actual purchase logic using Stripe
    const { bookTitle, paymentMethod } = req.body;

    stripe.paymentIntents.create({
        amount: 4.99,  // Replace with the actual book price in cents
        currency: 'usd',
        payment_method: paymentMethod,
        confirm: true,
    })
    .then(paymentIntent => {
        // Handle successful payment
        res.json({ success: true, paymentIntent });
    })
    .catch(error => {
        // Handle payment failure
        console.error(error);
        res.json({ success: false, error: error.message });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
