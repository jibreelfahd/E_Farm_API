const nameError = document.querySelector('.name.error');
const phoneError = document.querySelector('.phone.error');
const emailError = document.querySelector('.email.error');
const messageError = document.querySelector('.message.error');
const error = document.querySelector('.errors');
const successMessage = document.querySelector('.success');
const input = document.querySelector('form');
const btn = document.querySelector('.btn');

btn.addEventListener('click', async (e) => {
   e.preventDefault();

   const email = input.email.value;
   const name = input.names.value;
   const phoneNumber = input.phone.value;
   const messages = input.message.value;

   nameError.textContent = '';
   phoneError.textContent = '';
   emailError.textContent = '';
   messageError.textContent = '';
   successMessage.textContent = '';

   try {
      // https://e-gona-mu0h.onrender.com
   const res = await fetch('/e-gona/contactus', {
      method: 'POST',
      body: JSON.stringify({ name, email, phoneNumber, messages }),
      headers: { 'Content-Type': 'application/json' }
   });

   const { user, error, message } = await res.json();

   if(user) {
      successMessage.textContent = message
   }

   if(error) {
      nameError.textContent = error.name;
      phoneError.textContent = error.phone;
      emailError.textContent = error.email;
      messageError.textContent = error.message;
   }
   console.log(user, error, message)
   } catch (err) {
      console.log(err);
      error.textContent = 'Sorry, we are currenly unavailable. Try Again Later'
   }
});
