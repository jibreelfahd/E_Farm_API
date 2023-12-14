const express = require('express');
const router = express.Router();

const { 
   signup, 
   login, 
   forgotPassword,
   createProducts,
   getAllProducts,
   getSingleProduct,
   profilePicture,
   editProduct,
   getAllPurchases,
   editProfile,
   uploadProductPicture,
   editProductPicture
} = require('../controllers/farmerController');
const auth = require('../middlewares/authenticateUsers');
const upload = require('../utils/multer');

router.post('/signup', signup);
router.post('/login', login);
router.put('/reset/password', auth('farmer'), forgotPassword);
router.post('/create/products', auth('farmer'), createProducts);
router.patch('/create/products/:ID', auth('farmer'), upload('farmer').array('productPicture', 5), uploadProductPicture);
router.get('/all/products', auth('farmer'), getAllProducts);
router.get('/single/product/:productId', auth('farmer'), getSingleProduct);
router.put('/profile', auth('farmer'), upload('farmer').single('profilePicture'), profilePicture);
router.patch('/edit/products/:productId', auth('farmer'), editProduct);
router.patch('/edit/product/:productId', auth('farmer'), upload('farmer').array('productPicture', 5), editProductPicture);
router.get('/all/purchases', auth('farmer'), getAllPurchases);
router.patch('/edit/profile', auth('farmer'), editProfile)

module.exports = router;