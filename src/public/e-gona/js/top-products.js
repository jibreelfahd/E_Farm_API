const productDOM = document.querySelector('.all-product');
const errorDOM = document.querySelector('.error');

const showProducts = async() => {
   try {
    // https://e-gona-mu0h.onrender.com
      const res = await fetch('/e-gona/best/selling', {
         method: 'GET',
         headers: { 'Content-Type': 'text/html' }
      });
      const { bestSelling } = await res.json();

      const staticElements = `<div
      class="text-xs text-center p-2 bg-dark_pastel_green w-5 h-12 z-10 absolute left-0 top-[-3rem]"
      >
      <span class="ml-8 my-auto font-bold text-dark_pastel_green"
        >Category</span
      >
      </div>
      <h2 class="py-10 font-bold text-2xl">Top Products</h2>`

      const getAllProducts = staticElements + bestSelling.map(items => {
         const { name: productName, price, farmerID, productPicture, _id: productID } = items;
         return `<section class="flex justify-between">
         <div class="card rounded-lg overflow-hidden">
           <div>
             <a
               class="w-270 h-250 bg-white_smoke overflow-hidden mb-0 flex flex-col relative justify-start items-center hide rounded-lg"
               href="#"
             >
               <span
                 class="text-xs text-center flex p-2 bg-dark_pastel_green w-10 h-8 absolute left-0 top-0"
                 >-25%</span
               >
               <img
                 class="w-160 h-160 my-auto hover:h-40 hover:w-36 rounded-lg"
                 src="${productPicture[0].path}"
                 alt=""
               />
             </a>
             <div class="rounded-b-lg overflow-hidden">
               <button
                 class=" w-full text-white_smoke bg-pakistan_green ext-white_smoke py-1.5 addToCartButton"
                 data-product-id="${productID}"
              data-product-name="${productName}"
              data-product-price="${price}"
              data-product-image="${productPicture[0].path}"
              data-product-farmerId="${farmerID}"
               >
                 Add to cart
               </button>
             </div>
           </div>
           <div>
             <h2 class="font-bold">${productName}</h2>
           </div>
           <p class="text-sm text-dark_pastel_green">
           ₦${price}
             <span class="mr-2 line-through opacity-70 text-slate-500"
               >₦36000</span
             >
           </p>

           <div>
             <i class="fa-solid fa-star text-yellow-700"></i>
             <i class="fa-solid fa-star text-yellow-700"></i>
             <i class="fa-solid fa-star text-yellow-700"></i>
             <span class="font-bold opacity-60">(77%)</span>
           </div>
         </div>

         <div class="card rounded-lg overflow-hidden">
           <div>
             <a
               class="w-270 h-250 bg-white_smoke overflow-hidden mb-0 flex flex-col relative justify-start items-center hide rounded-lg"
               href="#"
             >
               <span
                 class="text-xs text-center flex p-2 bg-dark_pastel_green w-10 h-8 absolute left-0 top-0"
                 >-10%</span
               >
               <img
                 class="w-160 h-160 my-auto hover:h-40 hover:w-36 rounded-lg"
                 src="${productPicture[1].path}"
                 alt=""
               />
             </a>
             <div class="rounded-b-lg overflow-hidden">
               <button
                 class="w-full text-white_smoke bg-pakistan_green ext-white_smoke py-1.5 addToCartButton"
                 data-product-id="${productID}"
              data-product-name="${productName}"
              data-product-price="${price}"
              data-product-image="${productPicture[0].path}"
              data-product-farmerId="${farmerID}"
               >
                 Add to cart
               </button>
             </div>
           </div>
           <div>
             <h2 class="font-bold">${productName}</h2>
           </div>
           <p class="text-sm text-dark_pastel_green">
            ₦${price}
             <span class="mr-2 line-through opacity-70 text-slate-500"
               >₦8500</span
             >
           </p>

           <div>
             <i class="fa-solid fa-star text-yellow-700"></i>
             <i class="fa-solid fa-star text-yellow-700"></i>
             <i class="fa-solid fa-star text-yellow-700"></i>
             <i class="fa-solid fa-star text-yellow-700"></i>
             <i class="fa-solid fa-star text-yellow-700"></i>
             <span class="font-bold opacity-60">(100%)</span>
           </div>
         </div>

         <div class="card rounded-lg overflow-hidden">
           <div>
             <a
               class="w-270 h-250 bg-white_smoke overflow-hidden mb-0 flex flex-col relative justify-start items-center hide rounded-lg"
               href="#"
             >
               <span
                 class="text-xs text-center flex p-2 bg-dark_pastel_green w-10 h-8 absolute left-0 top-0"
                 >-20%</span
               >
               <img
                 class="w-160 h-160 my-auto hover:h-40 hover:w-36 rounded-lg"
                 src="${productPicture[2].path}"
                 alt=""
               />
             </a>
             <div class="rounded-b-lg overflow-hidden">
               <button
                 class=" w-full text-white_smoke bg-pakistan_green ext-white_smoke py-1.5 addToCartButton"
                 data-product-id="${productID}"
              data-product-name="${productName}"
              data-product-price="${price}"
              data-product-image="${productPicture[0].path}"
              data-product-farmerId="${farmerID}"
               >
                 Add to cart
               </button>
             </div>
           </div>
           <div>
             <h2 class="font-bold">${productName}</h2>
           </div>
           <p class="text-sm text-dark_pastel_green">
             ₦${price}
             <span class="mr-2 line-through opacity-70 text-slate-500"
               >₦25000</span
             >
           </p>

           <div>
             <i class="fa-solid fa-star text-yellow-700"></i>
             <i class="fa-solid fa-star text-yellow-700"></i>
             <i class="fa-solid fa-star text-yellow-700"></i>
             <i class="fa-solid fa-star text-yellow-700"></i>
             <span class="font-bold opacity-60">(80%)</span>
           </div>
         </div>
         <div class="card rounded-lg overflow-hidden">
           <div>
             <a
               class="w-270 h-250 bg-white_smoke overflow-hidden mb-0 flex flex-col relative justify-start items-center hide rounded-lg"
               href="#"
             >
               <span
                 class="text-xs text-center flex p-2 bg-dark_pastel_green w-10 h-8 absolute left-0 top-0"
                 >-20%</span
               >
               <img
                 class="w-160 h-160 my-auto hover:h-40 hover:w-36 rounded-lg"
                 src="${productPicture[0].path}"
                 alt=""
               />
             </a>
             <div class="rounded-b-lg overflow-hidden">
               <button
                 class="w-full text-white_smoke bg-pakistan_green ext-white_smoke py-1.5 addToCartButton"
                 data-product-id="${productID}"
              data-product-name="${productName}"
              data-product-price="${price}"
              data-product-image="${productPicture[0].path}"
              data-product-farmerId="${farmerID}"
               >
                 Add to cart
               </button>
             </div>
           </div>
           <div>
             <h2 class="font-bold">${productName}</h2>
           </div>
           <p class="text-sm text-dark_pastel_green">
            ₦${price}
             <span class="mr-2 line-through opacity-70 text-slate-500"
               >₦4000</span
             >
           </p>

           <div>
             <i class="fa-solid fa-star text-yellow-700"></i>
             <i class="fa-solid fa-star text-yellow-700"></i>
             <i class="fa-solid fa-star text-yellow-700"></i>
             <span class="font-bold opacity-60">(77%)</span>
           </div>
         </div>
       </section>`
      }).join('')
      productDOM.innerHTML = getAllProducts;
   } catch (error) {
      errorDOM.textContent = 'Sorry, we are unable to fetch products. Try Again Later';
      console.log(error);
   }
}
showProducts();

