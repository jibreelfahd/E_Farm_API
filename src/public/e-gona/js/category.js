const productDOM = document.querySelector('.all-product');
const errorDOM = document.querySelector('.error');
const categoryDOM = document.querySelector('.categoryName');
const params = window.location.search
const categoryName = new URLSearchParams(params).get('selectCategory')
console.log(categoryName)

const showProducts = async() => {
 try {
  // https://e-gona-mu0h.onrender.com
   const res = await fetch(`/e-gona/category/${categoryName}`, {
      method: 'GET',
      headers: { 'Content-Type': 'text/html' }
   });
   const { categories } = await res.json();

   const allProducts = categories.map(items => {
      const { name: productName, category, price, farmerID, productPicture, _id: productID } = items;
      categoryDOM.textContent = category

      return ` 
      <section class="flex justify-between mb-16">
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
            src="${productPicture[3].path}"
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
   }).join('');

   productDOM.innerHTML = allProducts
 } catch (error) {
   errorDOM.textContent = 'Sorry, we are unable to fetch products. Try Again Later'
   console.log(error)
 }
   
}

showProducts();