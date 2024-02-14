// Elements to represent card details
// const elements = stripe.elements();
const cardElement = elements.create('card');

document.addEventListener('DOMContentLoaded', () => {
  // Your Stripe publishable key
  const stripePublishableKey = ('pk_test_51OgBqFJiyN6zqbS7va3w0SQtAcpH6sZfEUJ5ITqfzSjuCxympA9TrBY4EQk9y5CnWaqHIcVWWGo1hPqbqDUtHakK00iYWxzXcz');

  const stripe = Stripe(stripePublishableKey);
});

// Add card element to the DOM
cardElement.mount('#card-element');

// Mock book data for demonstration purposes
const books = [
  { title: 'Penalty Company #1', price: 5.99 },
  { title: 'Penalty Company #2', price: 5.99 },
  { title: 'Penalty Company #3', price: 5.99 },
  { title: 'Penalty Company #4', price: 5.99 },
  { title: 'Penalty Company #5', price: 5.99 },
  { title: 'Penalty Company #6', price: 5.99 },
  { title: 'Penalty Company #7', price: 5.99 },
  { title: 'Penalty Company #8', price: 5.99 },
  { title: 'Penalty Company #9', price: 5.99 },
  { title: 'Penalty Company #10', price: 5.99 },
];

// Cart to store selected books
let cart = [];

// Function to add book to the cart
function buyBook(bookTitle) {
  const book = books.find(b => b.title === bookTitle);
  if (book) {
    cart.push(book);
    updateCartDisplay();
  }
}

// Function to update cart display
function updateCartDisplay() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';
  cart.forEach(book => {
    const listItem = document.createElement('li');
    listItem.textContent = `${book.title} - $${book.price.toFixed(2)}`;
    cartItemsContainer.appendChild(listItem);
  });
}

// Function to simulate checkout (replace with your Stripe checkout logic)
function checkout() {
  // Mock API call to server for payment processing
  fetch('/your-server-endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ items: cart }),
  })
    .then(response => response.json())
    .then(data => {
      // Replace this with your actual Stripe checkout logic
      console.log('Payment successful:', data);
      alert('Payment successful! Thank you for your purchase.');
      cart = []; // Clear the cart after successful checkout
      updateCartDisplay();
    })
    .catch(error => {
      console.error('Error processing payment:', error);
      alert('Error processing payment. Please try again.');
    });
}
