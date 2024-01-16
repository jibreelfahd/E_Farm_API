document.addEventListener('DOMContentLoaded', function () {
   document.querySelector('.all-product').addEventListener('click', (event) => {
     const addToCartButton = event.target.closest('.addToCartButton');
     if (addToCartButton) {
       const productId = addToCartButton.getAttribute('data-product-Id');
       const farmerId = addToCartButton.getAttribute('data-product-farmerId');
       const productName = addToCartButton.getAttribute('data-product-name');
       const productPrice = addToCartButton.getAttribute('data-product-price');
       const productImage = addToCartButton.getAttribute('data-product-image');
 
       // Add the product to the cart (you can implement your own logic here)
       addToCart(productId, productName, productPrice, productImage, farmerId);
     }
   });
 });
 
 // Function to add the product to the cart
 function addToCart(productId, productName, productPrice, productImage, farmerID) {
   // Get the existing cart items from local storage or initialize an empty array
   const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
 
   // Check if the product is already in the cart
   const existingProduct = cartItems.find(item => item.productId === productId);
 
   if (existingProduct) {
     // If the product is already in the cart, increment the quantity
     existingProduct.quantity++;
   } else {
     // If the product is not in the cart, add it with a quantity of 1
     const newItem = {
       productId,
       productName,
       productPrice,
       totalPrice: Number(productPrice),
       productImage,
       farmerID,
       quantity: 1
     };
     cartItems.push(newItem)
   }
 
   localStorage.setItem('cart', JSON.stringify(cartItems));
   updateCartIcon();
 }
 
 // Function to update the cart icon
 function updateCartIcon() {
   const cartIcon = document.querySelector('.quantity');
   const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
 
   // Calculate the total quantity of items in the cart
   const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
   cartItems.totalPrice = cartItems.reduce((prevPrice, newPrice) => prevPrice + newPrice.totalPrice, 0);
   console.log(cartItems.totalPrice)
 
   // Update the cart icon with the total quantity
   cartIcon.textContent = totalQuantity;
 }
 updateCartIcon();