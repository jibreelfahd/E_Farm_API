const addToCarts = document.querySelector('.add-cart');
const editCart = document.querySelector('.edit-cart');
const total = document.querySelector('.total');
const subtotal = document.querySelector('.subtotal');

const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

const displayCart = cartItems.map(items => {
   const { productImage, productName, productPrice, totalPrice } = items;
   total.textContent = totalPrice;
   subtotal.textContent = totalPrice;
   
   return `<div
   class="flex items-center justify-between p-4 custom-shadow my-8 mx-4"
 >
   <div class="flex items-center justify-center gap-3">
     <img class="rounded-md w-20 h-15" src="${productImage}" alt="" />
     <p>${productName}</p>
   </div>
   <p>₦${productPrice}</p>
   <input
     class="w-14 bg-whiteborder-2 rounded-md border-black border-2 focus:outline-none mr-[30px]"
     type="number"
     value="01"
     max="20"
     min="1"
     oninput="format(this)"
   />
   <p class="mr-4">₦${totalPrice}</p>
 </div>`
}).join('');

addToCarts.innerHTML = displayCart;