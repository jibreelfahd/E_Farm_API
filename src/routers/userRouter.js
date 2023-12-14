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
   searchProducts
} = require('../controllers/authController');
const auth = require('../middlewares/authenticateUsers');

router.post('/signup', signUp);
router.post('/login', login);
router.put('/reset/password', forgotPassword);
router.get('/category/:id', getByCategory);
router.get('/all/products', getAllProducts);
router.get('/single/product/:id', getSingleProduct);
router.get('/top/deals', getTopDeals);
router.get('/best/selling', bestSelling);
router.patch('/profile', auth('user'), editProfile);
router.get('/search', searchProducts);

module.exports = router;