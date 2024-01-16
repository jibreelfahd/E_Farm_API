const fetchForYou = document.querySelector('.all-product');
const forYouError = document.querySelector('.for-you-error');
const categoryDOM = document.querySelector('.categories');

//load tasks from api
const showForYou = async () => {
   //fetching for you items
   try {
      // https://e-gona-mu0h.onrender.com
      const forYouResponse = await fetch('/e-gona/top/deals', {
         method: 'GET',
         headers: { 'Content-Type': 'text/html' }
      });

      const { topDeals } = await forYouResponse.json();
      const filterProducts = topDeals.splice(0, 4)
      const allProducts = filterProducts.map((product) => {
         const { name: productName, productPicture, _id: productID, price, farmerID } = product
         const singlePicture = productPicture.splice(0, 1)

         return `<div class="card rounded-lg overflow-hidden">
         <div>
          <a
            class="w-270 h-250 bg-white_smoke overflow-hidden mb-0 flex flex-col relative justify-start items-center hide rounded-lg"
            href=""
          >
            <span
              class="text-xs text-center flex p-2 bg-dark_pastel_green w-10 h-8 absolute left-0 top-0"
              >-10%</span
            >
            <img
              class="w-160 h-160 my-auto hover:h-40 hover:w-36 rounded-lg"
              src="${singlePicture[0].path}"
              alt=""
            />
          </a>
          <div class="rounded-b-lg overflow-hidden">
            <button
              class="w-full text-white_smoke bg-pakistan_green ext-white_smoke py-1.5 addToCartButton"
              data-product-id="${productID}"
              data-product-name="${productName}"
              data-product-price="${price}"
              data-product-image="${singlePicture[0].path}"
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
      </div>`
      }).join('');
      fetchForYou.innerHTML = allProducts; 
      
      categoryDOM.innerHTML = `
         <div
          class="text-xs text-center p-2 bg-dark_pastel_green w-5 h-12 z-10 absolute left-0 top-[-6rem]"
        >
         <span
            class="ml-8 flex items-center my-auto font-bold text-dark_pastel_green"
            >Categories</span
          >
        </div>
        <section
          class="flex flex-col justify-center rounded-lg overflow-hidden hover:text-white_smoke hover:bg-dark_pastel_green"
        >
          <div
            class="w-180 h-180 flex flex-col gap-4 justify-center items-center border-white_smoke border-4 rounded-lg"
          >
            <a href="category.html?selectCategory=Vegetable">
              <img
                class="w-24 h-24 rounded-lg"
                src="images/cabbage-3722517_640.jpg"
                alt=""
              />
            </a
            <h3 class="font-bold">Vegetables</h3>
          </div>
        </section>
        <section
          class="flex flex-col justify-center rounded-lg overflow-hidden hover:text-white_smoke hover:bg-dark_pastel_green"
        >
          <div
            class="w-180 h-180 flex flex-col gap-4 justify-center items-center border-white_smoke border-4 rounded-lg"
          >
            <a width="96" href="category.html?selectCategory=Grains">
              <img
       class="w-24 h-24 rounded-lg"
                src="images/corn-1515903_640.jpg"
                alt=""
              />
            </a>

           <h3 class="font-bold">Grains</h3>
          </div>
        </section>
        <section
          class="flex flex-col justify-center rounded-lg overflow-hidden ver:text-white_smoke hover:bg-dark_pastel_green"
        >
          <div
            class="w-180 h-180 flex flex-col gap-4 justify-center items-center border-white_smoke border-4 rounded-lg"
          >
            <a href="category.html?selectCategory=Livestock">
              <img
                class="w-24 h-24 rounded-lg"
                src="images/sheep-4810513_640.jpg"
                alt=""
              />
            </a>
            <h3 class="font-bold">Livestock</h3>
          </div>
        </section>
        <section
          class="flex flex-col justify-center rounded-lg overflow-hidden hover:text-white_smoke hover:bg-dark_pastel_green"
        >
          <div
            class="w-180 h-180 flex flex-col gap-4 justify-center items-center border-white_smoke border-4 rounded-lg"
          >
            <a href="category.html?selectCategory=Livestock">
              <img
                class="w-24 h-24 rounded-lg"
                src="images/chicken-4145198_640.jpg"
                alt=""
              />
            </a>

            <h3 class="font-bold">Poultry</h3>
          </div>
        </section>
        <section
          class="flex flex-col justify-center rounded-lg overflow-hidden hover:text-white_smoke hover:bg-dark_pastel_green"
        >
          <div
            class="w-180 h-180 flex flex-col gap-4 justify-center items-center border-white_smoke border-4 rounded-lg"
       >
         <a href="category.html?selectCategory=Tubers">
           <img
             class="w-24 h-24 rounded-lg"
             src="images/cocoa-yam.jpg"
             alt=""
           />
         </a>

            <h3 class="font-bold">Tubers</h3>
          </div>
        </section>
        <section
          class="flex flex-col justify-center rounded-lg overflow-hidden hover:text-white_smoke hover:bg-dark_pastel_green"
        >
          <div
            class="w-180 h-180 flex flex-col gap-4 justify-center items-center border-white_smoke border-4 rounded-lg"
       >
         <a href = "category.html?selectCategory=Fruits">
           <img
             class="w-24 h-24 rounded-lg"
             src="images/pineapple-3808963_640.jpg"
             alt=""
           />
         </a>

         <h3 class="font-bold">Fruits</h3>
       </div>
     </section>`

   } catch (error) {
      forYouError.textContent = 'An Error Encountered, Try Again Later!!!'
      console.log(error)
   }
}
showForYou();

const card = document.querySelector("hide");
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  const addToCartButton = card.querySelector(".addToCartButton");
  const cardImage = card.querySelector(".card img");

  let hoverTimeout;

  const transitionDuration = "300ms"; // Adjust the duration as needed

  card.addEventListener("mouseenter", () => {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      addToCartButton.classList.remove("hidden");
      cardImage.style.transform = "scale(1.1)";
      addToCartButton.style.transform = "scale(1.1)";
      card.style.transition = `transform ${transitionDuration} ease, box-shadow ${transitionDuration} ease`;
    }, 300); // Adjust the delay as needed
  });

  card.addEventListener("mouseleave", () => {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      addToCartButton.classList.add("hidden");
      cardImage.style.transform = "scale(1)";
      addToCartButton.style.transform = "scale(1)";
      card.style.transition = `transform ${transitionDuration} ease, box-shadow ${transitionDuration} ease`;
    }, 300); // Adjust the delay as needed
  });

  // Set a fixed width for the image
  cardImage.style.width = "160px"; // Adjust the width as needed
});