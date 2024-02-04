// Example JavaScript for handling reviews and contact form submissions

function submitReview() {
  const reviewerName = document.getElementById('reviewerName').value;
  const reviewContent = document.getElementById('reviewContent').value;

  // Process the review (you might want to send it to a server or store in a database)
  console.log(`Review submitted by ${reviewerName}: ${reviewContent}`);
}

function submitContact() {
  const senderName = document.getElementById('senderName').value;
  const messageContent = document.getElementById('messageContent').value;

  // Process the contact form (you might want to send it to the author or store in a database)
  console.log(`Message from ${senderName}: ${messageContent}`);
}

const stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY');
const elements = stripe.elements();

const card = elements.create('card');
card.mount('#card-element');

const paymentButton = document.getElementById('checkout-button');

paymentButton.addEventListener('click', async () => {
    const { token, error } = await stripe.createToken(card);

    if (error) {
        console.error(error);
    } else {
        const response = await fetch('/charge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: 1000, // Change this to the desired amount in cents
                currency: 'usd', // Change this to your desired currency
                source: token.id,
            }),
        });

        const { clientSecret } = await response.json();

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
            },
        });

        if (result.error) {
            console.error(result.error);
        } else {
            // Payment successful
            console.log('Payment successful!');
        }
    }
});