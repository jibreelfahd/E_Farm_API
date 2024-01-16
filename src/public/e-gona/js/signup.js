const nameError = document.querySelector('.name.error'); 
const phoneError = document.querySelector('.phone.error'); 
const emailError = document.querySelector('.email.error'); 
const passwordError = document.querySelector('.password.error'); 
const input = document.querySelector('form');
const btn = document.querySelector('.btn');
const error = document.querySelector('.error');

btn.addEventListener('click', async (e) => {
   e.preventDefault();

   const name = input.names.value
   const email = input.email.value
   const password = input.password.value
   const phoneNumber = input.phoneNumber.value

   nameError.textContent = ''
   phoneError.textContent = ''
   emailError.textContent = ''
   passwordError.textContent = ''

   try {
      // https://e-gona-mu0h.onrender.com
      const res = await fetch('/e-gona/signup', {
         method: 'POST',
         body: JSON.stringify({ name, email, password, phoneNumber }),
         headers: { 'Content-Type': 'application/json'}
      });

      const data = await res.json();
      if(data.error){
         nameError.textContent = data.error.name
         phoneError.textContent = data.error.phoneNumber
         emailError.textContent = data.error.email
         passwordError.textContent = data.error.password
      }

      if(data.user){
         window.location.href = 'logged-in.html'
      }
      console.log(data);
   } catch (err) {
      console.log(err);
      error.textContent = 'Sorry, your request could not be completed. Try Again Later!!!'
   }
});