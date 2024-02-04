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