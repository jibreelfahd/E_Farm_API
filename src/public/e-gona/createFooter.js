const createFooter = () => {
  let footer = document.querySelector(".footer");
  footer.innerHTML =
    ' <footer class="bg-footer_color h-80 flex items-center content-center">\n' +
    '      <div class="text-white font-body w-full flex justify-evenly">\n' +
    '        <div class="">\n' +
    '          <h1 class="pb-3 font-medium text-[20px]">Exclusive</h1>\n' +
    '          <h2 class="pb-3 text-[15px]">Subscribe</h2>\n' +
    '          <p class="pb-3 text-[13px]">Get 10% off your first order</p>\n' +
    "          <div\n" +
    '            class="flex items-center content-center gap-5 border-2 border-stone-50 rounded-md py-1 px-2"\n' +
    "          >\n" +
    '            <p class="text-[13px] text-slate-200">Enter your email</p>\n' +
    '            <img src="images/icon-send.svg" alt="" />\n' +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    '        <div class="w-60">\n' +
    '          <h1 class="pb-3 font-medium text-[20px]">Support</h1>\n' +
    '          <h2 class="pb-3 text-[15px]">\n' +
    "            111 Teen Business Compulex, Nhub Nigeria, Jos, Plateau State.\n" +
    "          </h2>\n" +
    '          <p class="pb-3 text-[13px]">egona-beta@gmail.com</p>\n' +
    '          <p class="pb-3 text-[13px]">+234 8085499803</p>\n' +
    "        </div>\n" +
    "\n" +
    '        <div class="">\n' +
    '          <h1 class="pb-3 font-medium text-[20px]">Account</h1>\n' +
    '          <h2 class="pb-3 text-[15px]">My Account</h2>\n' +
    '          <h2 class="pb-3 text-[15px]">Login / Register</h2>\n' +
    '          <h2 class="pb-3 text-[15px]">Cart</h2>\n' +
    '          <h2 class="pb-3 text-[15px]">Wishlist</h2>\n' +
    '          <h2 class="pb-3 text-[15px]">Shop</h2>\n' +
    "        </div>\n" +
    "\n" +
    '        <div class="">\n' +
    '          <h1 class="pb-3 font-medium text-[20px]">Quick Link</h1>\n' +
    '          <h2 class="pb-3 text-[15px]">Privacy Policy</h2>\n' +
    '          <h2 class="pb-3 text-[15px]">Terms Of Use</h2>\n' +
    '          <h2 class="pb-3 text-[15px]">FAQ</h2>\n' +
    '          <h2 class="pb-3 text-[15px]">Contact</h2>\n' +
    "        </div>\n" +
    "\n" +
    '        <div class="">\n' +
    '          <h1 class="pb-3 font-medium text-[20px]">Download App</h1>\n' +
    '          <h2 class="pb-3 text-[15px]">\n' +
    "            Save 1,000 naira with App New User Only\n" +
    "          </h2>\n" +
    '          <div class="pb-3 flex gap-3 justify-start items-center">\n' +
    "            <div>\n" +
    '              <img src="images/Qrcode 1.png" alt="" />\n' +
    "            </div>\n" +
    "            <div>\n" +
    '              <img class="mb-2" src="images/googleplay.png" alt="" />\n' +
    '              <img src="images/appplay.png" alt="" />\n' +
    "            </div>\n" +
    "          </div>\n" +
    '          <div class="flex gap-5">\n' +
    '            <img src="images/facebbok.svg" alt="" />\n' +
    '            <img src="images/twitter.svg" alt="" />\n' +
    '            <img src="images/insta.svg" alt="" />\n' +
    '            <img src="images/linkin.svg" alt="" />\n' +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </footer>\n" +
    "    <p\n" +
    '      class="flex justify-center items-center text-white py-3 bg-footer_color border-t-2 border-white"\n' +
    "    >\n" +
    "      &copy Copyright e-gona 2022. All right reserved\n" +
    "    </p>";
};

createFooter();
