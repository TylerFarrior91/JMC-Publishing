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

// Add this to your script.js file
const stripe = Stripe('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');

function buyBook(bookTitle) {
  // Replace with your server endpoint for processing payments
  const serverEndpoint = '/purchase';

  // Fetch your server to create a payment session
  fetch(serverEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      bookTitle: bookTitle,
    }),
  })
    .then(response => response.json())
    .then(session => {
      // When the session is received, redirect the user to Stripe Checkout
      return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .then(result => {
      // If `redirectToCheckout` fails due to a browser or network error, display an error to the user
      if (result.error) {
        alert(result.error.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}