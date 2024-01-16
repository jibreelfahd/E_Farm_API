function getCookie() {
   const cookieString = document.cookie.split('; ')[1]; // Get the second part after splitting
   if (cookieString) {
     const token = cookieString.split('=')[1];
     return token;
   }
   return null; // Return null if no valid cookie is found
}
const token = getCookie()

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};
const userName = parseJwt(token)

const error = document.querySelector('.errors');
const username = document.querySelector('.username');
const success = document.querySelector('.success');
const btn = document.querySelector('.btn');
const input = document.querySelector('form');
const emailError = document.querySelector('.email.error');
const passwordError = document.querySelector('.password.error');

username.textContent = userName.userName;

btn.addEventListener('click', async(e) => {
  e.preventDefault();
  try {
    error.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';

    const name = input.names.value;
    const lastName = input.lastname.value;
    const email = input.email.value;
    const address = input.address.value;
    const currentPassword = input.currentPassword.value;
    const password = input.newPassword.value;
    const confirmPassword = input.confirmPassword.value;
    
    const res = await fetch(`/e-gona/profile`, {
      method: 'PATCH',
      body: JSON.stringify({ name, lastName, email, address, password, confirmPassword, currentPassword }),
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await res.json();

    //redirecting user if not authorized
    if(data.message === 'You are unauthorized to access this resource. Try Again Later') {
      window.location.href = 'login.html';
    } else if(data.message === 'Invalid Token. Try Again Later'){
      window.location.href = 'login.html'
    }

    if(data.error) {
      emailError.textContent = data.error.email;
      passwordError.textContent = data.error.password;
      error.textContent = data.error.name;
    }

    if(data.confirmErrorMessage) {
      error.textContent = data.confirmErrorMessage;
    }

    if(data.profile) {
      success.style.display = 'block'
      success.textContent = data.message;
    }

    setTimeout(() => {
      success.style.display = 'none'
    }, 3000);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
});