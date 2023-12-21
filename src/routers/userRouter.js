const express = require('express');
const router = express.Router();

const { 
   signUp, 
   login, 
   forgotPassword, 
   getAllProducts, 
   getByCategory, 
   getSingleProduct, 
   getTopDeals,
   bestSelling,
   editProfile,
   searchProducts,
   newArrival
} = require('../controllers/authController');
const auth = require('../middlewares/authenticateUsers');

router.post('/signup', signUp);
router.post('/login', login);
router.put('/reset/password', forgotPassword);
router.get('/category', getByCategory);
router.get('/category/:selectCategory', getByCategory);
router.get('/all/products', getAllProducts);
router.get('/single/product/:productName', getSingleProduct);
router.get('/top/deals', getTopDeals);
router.get('/new', newArrival);
router.get('/best/selling', bestSelling);
router.patch('/profile', auth('user'), editProfile);
router.get('/search', searchProducts);

module.exports = router;