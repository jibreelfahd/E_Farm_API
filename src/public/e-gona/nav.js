const createNav = () => {
  let nav = document.querySelector(".navBar");
  return nav.innerHTML = ` <div class="sticky top-0 z-50 bg-white">
  <header class="flex justify-between items-center mt-4">
    <a href="index.html">
      <img class="w-8" src="images/logo.svg" alt="" />
    </a>
    <nav class="flex gap-10 ml-32">
      <a class="nav-link negate-active" href="index.html">Home</a>
      <a class="nav-link negate-active" href="contact.html">Contact</a>
      <a class="nav-link negate-active" href="about.html">About</a>
      <a class="nav-link negate-active" href="signup.html">Sign up</a>
    </nav>

    <div class="flex gap-8 items-center justify-center">
      <div
        class="flex items-center gap-8 py-1.5 px-4 m-1.5 bg-white_smoke rounded-md"
      >
        <input
          class="opacity-80 outline-none bg-white_smoke w-full"
          type="search"
          placeholder="What are you looking for?"
        />
        <button>
          <i class="fa-brands fa-searchengin"></i>
        </button>
      </div>
      <div class="absolute text-center text-white_smoke text-xs top-2 right-2 bg-dark_pastel_green w-4 h-4 rounded-full quantity"></div>
      <a class="inline-block" href="cart.html">
        <i
          class="fa-solid fa-cart-shopping color text-pakistan_green"
        ></i>
      </a>
    </div>
  </header>
  <div class="h-0.5 w-full bg-white_smoke mt-4"></div>
</div>`  
};
createNav();  

document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('.nav-link');
  
  links.forEach(link => {
    link.addEventListener('click', function () {
      // Remove the inline style from all links
      links.forEach(l => {
        l.classList.remove('active-link');
        l.classList.add('negate-active');
      });

      // Add the 'active-link' class to the clicked link
        this.classList.add('active-link');
        this.classList.remove('negate-active');
        this.style.borderBottom = '2px solid red'
      });
  });
});



// document.addEventListener("DOMContentLoaded", function () {
//   const nav = document.querySelector(".navBar");
//   const sticky = nav.offsetTop;

//   let window;
//   window.onscroll = function () {
//     if (window.pageYOffset > sticky) {
//       nav.classList.add("sticky");
//     } else {
//       nav.classList.remove("sticky");
//     }
//   };
// });
