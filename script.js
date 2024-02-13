// Function to handle the buyBook action with an argument
function buyBook(bookTitle) {
  // Add your logic for purchasing the book here
  console.log(`Book purchased: ${bookTitle}`);
}
document.addEventListener('DOMContentLoaded', () => {
  // Your Stripe publishable key
  const stripePublishableKey = ('pk_live_51OgBqFJiyN6zqbS76edhxo9FmQ7pm4TmAninCFjjDrrlTgMYSmEypVZDSxiNiatBHZoJJGoOgQ6uDZKbWlzokiDf00YOAuyajB');


  // Initialize Stripe with your publishable key
  const stripe = Stripe(stripePublishableKey);

  // Elements to represent card details
  const elements = stripe.elements();
  const cardElement = elements.create('card');

  // Add card element to the DOM
  cardElement.mount('#card-element');

  // Handle form submission
  const buyBookForm = document.getElementById('buyBookForm');
  buyBookForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      // Disable the Buy Now button to prevent multiple submissions
      const buyNowButton = document.getElementById('buyNowButton');
      buyNowButton.disabled = true;

      // Create payment method using the card element
      const { paymentMethod, error } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
      });

      if (error) {
          // Handle error (e.g., display error message to the user)
          alert(`Error: ${error.message}`);
          buyNowButton.disabled = false; // Enable the button again
      } else {
          // On successful payment method creation, send the payment method ID to your server
          const paymentMethodId = paymentMethod.id;

          // Make a request to your server to complete the payment
          fetch('/purchase', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  bookTitle: 'Your Book Title',  // Replace with the actual book title
                  paymentMethod: paymentMethodId,
              }),
          })
          .then(response => response.json())
          .then(data => {
              // Handle the server response
              if (data.success) {
                  alert(`Thank you for purchasing ${data.paymentIntent.description}!`);
              } else {
                  alert(`Error: ${data.error}`);
              }
          })
          .catch(error => {
              console.error('Error:', error);
              alert('An error occurred. Please try again.');
          })
          .finally(() => {
              // Enable the Buy Now button after processing
              buyNowButton.disabled = false;
          });
      }
  });
});
