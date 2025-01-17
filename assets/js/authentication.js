/*-------------join modal--------------*/
// Get modal and buttons
const getStartedBtn = document.getElementById('getStartedBtn');
const loginSignupModal = document.getElementById('loginSignupModal');
const closeModal = document.getElementById('closeModal');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const link = document.getElementById('forgotPasswordLink');
const close_Button = document.getElementById('close_Modal');

// -------------Modal toggle
getStartedBtn.addEventListener('click', () => {
  setTimeout(() => {
    loginSignupModal.style.display = 'block';
  }, 500);
});

// ----------Close modal
closeModal.addEventListener('click', () => {
  loginSignupModal.style.display = 'none';
});

// ----------Switch to Login form
loginBtn.addEventListener('click', () => {
  window.location.href = 'login.html';
});

// -------Switch to Sign Up form
signupBtn.addEventListener('click', () => {
  window.location.href = 'register.html';
});

// ---Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === loginSignupModal) {
    loginSignupModal.style.display = 'none';
  }
});

// ------Forgot Password Modal ----------//
// Show the modal when the forgot password link is clicked
link.addEventListener('click', function (event) {
  event.preventDefault();
  alert('Please reset your password through Firebase.');
});

// Close the modal when the close button is clicked
close_Button.addEventListener('click', () => {
  reset_modal.style.display = 'none';
});

// Notification placeholder
function showNotification(message) {
  console.log(`Notification: ${message}`);
}
