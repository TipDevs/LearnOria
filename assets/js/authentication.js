/*-------------join modal--------------*/
// Get modal and buttons
const getStartedBtn = document.querySelectorAll('.getStartedBtn');
const loginSignupModal = document.getElementById('loginSignupModal');
const closeModal = document.getElementById('closeModal');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');

// -------------Modal toggle
getStartedBtn.forEach(btn=>{
 btn.addEventListener('click',()=>{
 loginSignupModal.style.display="block"
 })
})



// ----------Close modal
closeModal.addEventListener('click', () => {
  loginSignupModal.style.display = 'none';
});
// ----------Switch to Login form
loginBtn.addEventListener('click', () => {
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('signupForm').style.display = 'none';
});
// -------Switch to Sign Up form
signupBtn.addEventListener('click', () => {
  document.getElementById('signupForm').style.display = 'block';
  document.getElementById('loginForm').style.display = 'none';
});
// ---Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === loginSignupModal) {
    loginSignupModal.style.display = 'none';
  }});

//-----handle signup and login
//--signup
const signup_form = document.getElementById('signupFormFields');
const signup_username = document.getElementById('signupForm_username');
const signup_email = document.getElementById('signupForm_email');
const signup_password = document.getElementById('signupForm_password');
signup_form.addEventListener('submit',(e)=>{
  e.preventDefault();
  let email = signup_email.value;
  let username = signup_username.value;
  let password = signup_password.value;
  setupAccount(email,username, password);
  signup_form.reset();
});
//login
const login_form=document.getElementById('loginFormFields');
const login_email =document.getElementById('loginFormFields_email');
const login_password =document.getElementById('loginFormFields_password');
login_form.addEventListener('submit',(e)=>{
  e.preventDefault();
  let email=login_email.value;
  let password=login_password.value;
  handleLogin(email, password);
  login_form.reset();
});

// Handle signup
// Hash the password
async function hashPassword(password) {
  const encoder =new TextEncoder();
  const data =encoder.encode(password);
  const hash =await crypto.subtle.digest('SHA-256', data);
 return Array.from(new Uint8Array(hash))
    .map(b=>b.toString(16).padStart(2,'0')).join('');}
function generateUniqueID() {
  return 'user_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
}

// Handle signup
async function setupAccount(email,username, password) {
  let uniqueID = generateUniqueID();
  let users = JSON.parse(localStorage.getItem('users')) || {};
  // Check if email already exists
  for (const uid in users) {
    if (users[uid].email === email) {
      showCustomAlert('Email already exists!','error');
      return;
    }}
  // Hash the password before storing it
  const hashedPassword=await hashPassword(password)
  // Create new user object
  let newUser = {
    email: email,
    username: username,
    password: hashedPassword, 
  };
  // Save the user to localStorage
  users[uniqueID] = newUser;
  localStorage.setItem('users', JSON.stringify(users));
  let targetUser = newUser;
  localStorage.setItem('targetUser', JSON.stringify(targetUser));
 // window.location.href = 'dashboard url';
}

// Handle login
async function handleLogin(email, password) {
  let users = JSON.parse(localStorage.getItem('users')) || {};
  for (const uid in users) {
  if (users[uid].email === email) {
  const storedPassword = users[uid].password;
// Hash the input password and compare it with the stored hash
const hashedPassword = await hashPassword(password);
  if (storedPassword === hashedPassword) {
   let targetUser=users[uid];
   localStorage.setItem('targetUser', JSON.stringify(targetUser));
   // window.location.href = 'dashboard url';
   showCustomAlert(`Welcome back ${users[uid].username}`,'success');
     return;}}}
  showCustomAlert('Invalid email or password!','error');
}
 
 
//------FORGOT PASSWORD ----------//
// Save the new password
async function saveNewPassword(newPassword) {
 const email = document.getElementById('forgotPasswordForm_email').value;
 let users =JSON.parse(localStorage.getItem('users'))|| {};
  for (const uid in users) {
    if (users[uid].email === email) {
   // Hash the new password before storing it
  const hashedPassword = await hashPassword(newPassword);
  users[uid].password = hashedPassword;
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('targetUser', JSON.stringify(users[uid]));
  showCustomAlert('Password successfully reset!','success');
  reset_modal.style.display = 'none';
      return;
    }}
  showCustomAlert('User not found.','error');
}
// Modal elements
const link = document.getElementById('forgotPasswordLink');
const close_Button = document.getElementById('close_Modal');
const reset_modal = document.getElementById('forgotPasswordModal');
const reset_form = document.getElementById('forgotPasswordForm');
const resetCodeForm = document.getElementById('resetCodeForm');
const newPasswordForm = document.getElementById('newPasswordForm');

// Show the modal when the forgot password link is clicked
link.addEventListener('click', function(event){
  event.preventDefault();
  reset_modal.style.display = 'block';
});

// Close the modal when the close button is clicked
close_Button.addEventListener('click',()=> {
  reset_modal.style.display = 'none';
});
// Handle the "Get Reset Code" form submission
reset_form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const reset_email = document.getElementById('forgotPasswordForm_email').value;
  if (isValidEmail(reset_email)) {
    // Send reset code or simulate sending it
    sendResetCode(reset_email);
  } else {
    showCustomAlert('Please enter a valid email.','error');
  }
});

// Handle the "Submit Code" form submission
resetCodeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const resetCode = document.getElementById('resetCode').value;
  verifyResetCode(resetCode);
});

// Handle the "Save New Password" form submission
newPasswordForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newPassword = document.getElementById('newPassword').value;
  saveNewPassword(newPassword);
});

// Send the reset code to the user's email (simulation)
let secretCode = Math.floor(Math.random() * 10000).toString()
function sendResetCode(email) {
  showNotification(`code:${secretCode}`);
  // Transition to the reset code form
  reset_form.style.display = 'none';
  resetCodeForm.style.display = 'block';
}

// Verify the reset code entered by the user
function verifyResetCode(code) {
  // For simplicity, we can assume the code is '123456' for this example
  if (code ===secretCode) {
   showCustomAlert('Code verified successfully!','success');
    // Transition to the new password form
    resetCodeForm.style.display = 'none';
    newPasswordForm.style.display = 'block';
  } else {
    showCustomAlert('Invalid reset code.','error');
  }}
// Validate email format (basic check)
function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}


function showCustomAlert(message,state) {
  let custom_alert=document.getElementById('custom-alert')
   document.getElementById('alert-message').textContent= message;
 if(state=='error'){
   custom_alert.classList.remove('custom-alert')
   custom_alert.classList.add('danger-alert')
   custom_alert.style.display = 'flex'; 
   document.getElementById("close-alert").classList.add('danger-button')
 }else{
  custom_alert.classList.add('custom-alert')
  custom_alert.classList.remove('danger-alert')
  custom_alert.style.display = 'flex';
  document.getElementById("close-alert").classList.remove('danger-button')
 }}
// Close the alert when the user clicks on the "OK" button
document.getElementById('close-alert').onclick = function() {
document.getElementById('custom-alert').style.display = 'none';
}
  //notification
 function showNotification(message) {
   const notification = document.getElementById('notification');
   const messageElement = document.getElementById('notification-message');
   messageElement.textContent = message;
    notification.classList.add('show'); 
    setTimeout(() => {
      notification.classList.remove('show');
      notification.classList.add('hide')
      // Remove show class to hide it
    }, 5000);
   setTimeout(()=>{
     notification.style.display='none'
   },7000)
  }

