const express = require('express');
const stripe = require('stripe')('sk_test_51OgBqFJiyN6zqbS7nyAI1S7X4EELNncVRmaNuQ76yVzqJa1VloOKv9wboHKOLOoyejCA8uEzEoW0G5hb7BUmw0Ly00Zaj7zL6O');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.post('/purchase', express.json(), (req, res) => {
    // Replace this with your actual purchase logic using Stripe
    const { bookTitle, paymentMethod } = req.body;

    // Get the book price based on the title (replace with your book price logic)
    const bookPrice = getBookPrice(bookTitle);

    stripe.paymentIntents.create({
        amount: bookPrice * 100,  // Convert to cents
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

// Replace this function with your logic to get book prices based on titles
function getBookPrice(bookTitle) {
    // Replace with your logic to get book prices based on titles
    // For now, use a simple mapping as an example
    const bookPrices = {
        'Penalty Company #1': 5.99,
        'Penalty Company #2': 5.99,
        'Penalty Company #3': 5.99,
        'Penalty Company #4': 5.99,
        'Penalty Company #5': 5.99,
        'Penalty Company #6': 5.99,
        'Penalty Company #7': 5.99,
        'Penalty Company #8': 5.99,
        'Penalty Company #9': 5.99,
        'Penalty Company #10': 5.99,
    };

    return bookPrices[bookTitle] || 0; // Default to 0 if the book title is not found
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
