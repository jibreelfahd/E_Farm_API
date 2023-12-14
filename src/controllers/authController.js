const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const paystack = require('paystack')(process.env.PAYSTACK);

// @desc IMPORTS
const SignUpSchema = require('../models/userModel');
const ProductSchema = require('../models/productModel');
const CheckoutSchema = require('../models/checkoutModel');
const sendEmail  = require('../utils/sendEmail');

// @desc Creating webtokens to store in a cookie
const createTokens = (userId, userType) => {
   return jwt.sign({ userId, userType }, process.env.JWT_SECRET , {
      expiresIn: '24h'
   });
}

// @desc Handling errors 
const handleErrors = (err) => {
   let error = {name: '', email: '', password: '', confirmErrorMessage: '', phoneNumber: ''};
   console.log(err.message, err.code);

   // @desc validation errors
   if (err.message.includes('user validation failed')) {
      Object.values(err.errors).forEach(({ properties }) => {
         error[ properties.path ] = properties.message;
      })
   }

   // @desc duplicate keys
   if (err.code === 11000){
      error.email = 'This user has already been registered';
   }

   // @desc handling errors from logging in
   if (err.message === 'This user is not registered') {
      error.email = 'This user is not registered';
   }

   if (err.message === 'Incorrect password'){
      error.password = 'Incorrect password';
   }
   return error
}


// @desc Signing the user up 
exports.signUp = async (req, res) => {
   const { name, email, phoneNumber, password, confirmPassword} = req.body;

   try {
      if (password !== confirmPassword) {
         return res.status(401).json({ sucess: false, confirmErrorMessage: 'Password do not match'});
      }
      const user = await SignUpSchema.create({
         name,
         email, 
         phoneNumber,
         password,
         confirmPassword
      });   

      // @desc Sending an email to the user whenever they sign up
      const userEmail = user.email;
      const emailSubject = `Welcome to E-Gona, ${user.name}!!!`;
      const emailText = `We are delighted to have you on E-Gona, we are geared at offering you the best services when it comes to purchasing fresh and healthy agricultural products. We have carefully vetted all these products before bringing to you. We have made buying groceries relatively convenient with our seamless and easy purchasing methods and we also ensure safe and fast delivery at you.`; 

      await sendEmail(userEmail, emailSubject, emailText);
      res.status(201).json({ success: true, user: user._id });
   } 
   catch (err) {
      const error = handleErrors(err);
      res.status(400).json({ success: false, error });
   }
}

// @desc Loging in the user 
exports.login = async (req, res) => {
   const { email, phoneNumber, password } = req.body;

   try {
      const user = await SignUpSchema.login(email, phoneNumber, password);

      // @desc Sending an email to the user whenever they sign up
      const userEmail = user.email;
      const emailSubject = `Login alert from an unknown device`;
      const emailText = `Dear ${user.name}, a login alert has been recieved from an unknown device, if this isn't you, kindly secure your account to avoid been compromised`; 
 
      await sendEmail(userEmail, emailSubject, emailText);

      const token = createTokens(user._id, 'user');
      res.status(200).json({sucess: true, user: user._id, token });
   } catch (err) {
      const error = handleErrors(err);
      res.status(400).json({sucess: false, error})
   }
}

// @desc CHANGING USER PASSWORD
exports.forgotPassword = async (req, res) => {
   const { inputEmail, newPassword } = req.body;
   try {
      const user = await SignUpSchema.findOneAndUpdate({ email: inputEmail }, { password: newPassword}, {
         new: true,
         runValidators: true
      });

      if(!user) {
         return res.status(404).json({ success: false, message: 'User does not exist' });
      }

      const userEmail = user.email;
      const emailSubject = `E-Gona Password Reset`;
      const emailText = `Dear ${user.name}, your password has been reset to a new password successfully`; 
 
      await sendEmail(userEmail, emailSubject, emailText);
      const token = createTokens(user._id, 'user');

      res.status(200).json({ success: true, token });
   } catch (err) {
      console.log('Error from forgot password', err);
      res.status(500).json({ success: false, errorMessage: 'Sorry couldnt change password. Try Again!!' });
   }
}

// @desc GET ALL ITMES BY CATEGORY
exports.getByCategory = async(req, res) => {
   const { selectCategory } = req.query;
   let queryObject = {};
   try {
      if(selectCategory){
         queryObject.category = { $regex: selectCategory, $options: 'i' }
      }
      const categories = await ProductSchema.find(queryObject);

      if (!categories) {
         return res.status(404).json({ success: false, message: 'No category found' });
      }
      res.status(200).json({ success: true, categories, nHits: categories.length });
   } catch (err) {
      console.log('Error from category', err);
      res.status(500).json({ success: false, errorMessage: 'Couldnt get resource. Try Again Later!!' });
   }
}

// @desc GET ALL PRODUCTS
exports.getAllProducts = async (req, res) => {
   try {
      const products = await ProductSchema.find({});
      res.status(200).json({ success: true, products });
   } catch (err) {
      console.log('Error from get all products', err);
      res.status(500).json({ success: false, errorMessage: 'Couldnt fetch all products. Try Again!!' });
   }
}

// @desc GET SINGLE PRODUCTS
exports.getSingleProduct = async (req, res) => {
   const { productName } = req.params;
   const names = { $regex: productName, $options: 'i' }
   try {
      const product = await ProductSchema.findOne({ name: names });

      if(!product) {
      return res.status(404).json({ success: false, message: 'Product not available' });
      }
      res.status(200).json({ success: true, product });
   } catch (err) {
      console.log('Error from single products', err);
      res.status(500).json({ success: false, errorMessage: 'Couldnt fetch product. Try Again!!' });
   }
}

// @desc GET ALL TOP DEALS PROOUCTS
exports.getTopDeals = async (req, res) => {
   try {
      const topDeals = await ProductSchema.find({ topDeals: true });
      res.status(200).json({ success: true, topDeals, nHit: topDeals.length });
   } catch (err) {
      console.log('Error from top deals', err);
      res.status(500).json({ success: false, errorMessage: 'Internal Server Error. Couldnt fetch products' });
   }
}
// @desc CHECKOUT ORDER
exports.checkoutOrder = async (req, res) => {
   const { address, apartment, town } = req.body;
   const { userId } = req.user
   try {
      const chekout = await CheckoutSchema.create({ userID: userId, address, apartment, town }).populate('name', 'email', 'phoneNumber');

   } catch (err) {
      console.log('Error from checkout products', err);
      res.status(500).json({ success: false, message: 'Something happened, we are working on it' });
   }
}

// @desc NEW ARRIVALS
exports.newArrival = async (req, res) => {
   try {
      const newArrival = await ProductSchema.find({}).sort('createdAt');
      res.status(200).json({ success: true, newArrival, nHit: newArrival.length });   
      } catch (err) {
      console.log(`Error from new arrivals`, err);
      res.status(500).json({ success: false, message: 'Request could not be completed' });
   }
}

// @desc BEST SELLING PRODUCTS
exports.bestSelling = async(req, res) => {
   try {
      const bestSelling = await ProductSchema.find({ successfulPurchase: true });
      res.status(200).json({ success: true, bestSelling, nHit: bestSelling.length });
   } catch (err) {
      console.log(`Error from best selling`, err);
      res.status(500).json({ success: false, message: 'Request could not be completed' });
   }
}

// @desc EDIT PROFILE
exports.editProfile = async (req, res) => {
   const { name, email, address, password, confirmPassword, currentPassword } = req.body;
   const { userId } = req.user;
   try {
      const profile = await CheckoutSchema.findOneAndUpdate({_id: userId }, {
         name: name,
         email: email,
         address: address,
         password: password,
         confirmPassword
      }, { new: true, runValidators: true });

      if (password !== confirmPassword) {
         return res.status(401).json({ sucess: false, confirmErrorMessage: 'Password do not match'});
      }

      const findUser = await SignUpSchema.findOne({ _id: userId });
      if(findUser) {
         const authUser = bcrypt.compare(currentPassword, findUser.password);
         if(authUser) {
            return authUser;
         }
      } else{
         res.status(404).json({ success: false, message: 'Password Incorrect'});
      }

      res.status(200).json({ success: true, profile, message: 'Information changed successfully' });
   } catch (err) {
      console.log(`Error from edit profile`, err);
      res.status(500).json({ success: false, message: 'Request could not be completed' });
   }
}

// @desc SEARCH
exports.searchProducts = async(req, res) => {
   const { name } = req.query;
   try {
      let queryObject = {};

      if(name) {
         queryObject.name = { $regex: name, $options: 'i' };
      }

      const product = await ProductSchema.find(queryObject);
      res.status(200).json({ success: true, product, nbHits: product.length });
   } catch (err) {
      console.log('Error from search', err);
      res.status(500).json({ success: false, message: 'Request could not be completed' });
   }
} 

// @desc PAYMENT
exports.userPayment = async(req, res) => {
   const { productId } = req.params;
   const { userId } = req.user;

   try {
      //checking if the product exist
      const product = await ProductSchema.find({ _id: productId });
      if(!product) {
         res.status(404).json({ success: false, message: 'Product does not exist at the moment' });
      }

      //checking if the user 
      const user = await SignUpSchema.find({ _id: userId });
      if(!user) {
         res.status(404).json({ success: false, user });
      }

      //calculating the total products
      const totalPrice = product.reduce((sum, product) => sum + product.price, 0);

      //initializing paystack transaction
      const transaction = await paystack.transaction.initialize({
         email: user.email,
         amount: totalPrice * 100
      });

      res.status(200).json({ success: true, transaction });
   } catch (err) {
      console.log('Error from payment', err);
      res.status(500).json({ success: false, message: 'Request could not be completed' });
   }
}

// @desc ADDING TO CART
exports.addToCart = async (req, res) => {
 const { productId } = req.params;
 const { quantity } = req.body;
 const { userId } = req.user
 try {
   const checkUser = await SignUpSchema.find({ _id: userId });
   if(!checkUser) {
      
   }
 } catch (err) {
   console.log('Error from add to cart', err);
   res.status(500).json({ success: false, message: 'Request could not be completed' });
 }
}