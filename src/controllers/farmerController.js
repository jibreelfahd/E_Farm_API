const jwt = require('jsonwebtoken');
require('dotenv').config();

// @desc IMPORTS
const FarmerSchema = require('../models/farmerModel');
const ProductSchema = require('../models/productModel');
const sendEmail  = require('../utils/sendEmail');


// @desc Creating webtokens to store in a cookie
const createTokens = (farmerId, userType) => {
   return jwt.sign({ farmerId, userType }, process.env.JWT_SECRET , {
      expiresIn: '24h'
   });
}

// @desc Handling errors 
const handleErrors = (err) => {
   let error = { firstName: '', lastName: '', email: '', password: '', phoneNumber: ''};
   let productError = { name: '', price: '', weight: '', description: '', profilePicture: '' }
   console.log(err, err.code);

   // @desc validation errors
   if (err.message.includes('farmer validation failed')) {
      Object.values(err.errors).forEach(({ properties }) => {
         error[ properties.path ] = properties.message;
      })
   }

   if (err.message.includes('product validation failed')) {
      Object.values(err.errors).forEach(({ properties }) => {
         productError[ properties.path ] = properties.message;
      })
   }
   
   // @desc duplicate keys
   if (err.code === 11000){
      error.email = 'This user has already been registered';
   }

   // @desc handling errors from logging in
   if (err.message === 'Invalid Credentials or Password') {
      error.password = 'Invalid Credentials or Password';
   }

   if (err.message === 'This user does not exist'){
      error.email = 'This user does not exist';
   }
   return error
}


// @desc FARMER SIGNING IN
exports.signup = async (req, res) => {
   const { firstName, lastName, email, password, phoneNumber, bio, farmName, farmAddress, cropType, language, bankingDetails } = req.body;

   try {
      const farmer = await FarmerSchema.create({
         firstName,
         lastName,
         email,
         password,
         phoneNumber,
         bio,
         farmName,
         farmAddress,
         cropType,
         language,
         bankingDetails
      });

      const userEmail = farmer.email;
      const emailSubject = `Welcome to E-Gona ${ farmer.name }`;
      const emailText = 'We are deligted to have you on E-Gona, we ara platform geared towards to making your beautifully cultivated farm produce reach a wider audience. We look forward to seeing you on E-Gona soon';
      await sendEmail(userEmail, emailSubject, emailText);      

      res.status(200).json({ success: true, farmer});
   } catch (err) {
      const error = handleErrors(err);
      console.log('Error from farmer sign up', error);
      res.status(500).json({ success: false, error });
   }
}

// @desc LOGING IN FARNER
exports.login = async(req, res) => {
   const { email, password, phoneNumber } = req.body;
   try {
      const farmer = await FarmerSchema.login(email, phoneNumber, password);
      
      const userEmail = farmer.email;
      const emailSubject = `Dear ${farmer.name}, we recieved a new Login Alert`;
      const emailText = 'Access was granted to your account, verify if its you,else ignore this message';
      await sendEmail(userEmail, emailSubject, emailText);

      const token = createTokens(farmer._id, 'farmer');
      res.status(200).json({ success: true, farmer: farmer._id, token });
   } catch (err) {
      const error = handleErrors(err);
      console.log('Error from login', error);
      res.status(500).json({ success: false, error });
   }
}

// @desc RESET PASSWORD
exports.forgotPassword = async (req, res) => {
   const { farmerId } = req.user
   const { newPassword } = req.body;
   try {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(newPassword, salt);

      const user = await FarmerSchema.findOneAndUpdate({ _id: farmerId }, { password: hashPassword}, {
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
      res.status(200).json({ success: true, user });
   } catch (err) {
      console.log('Error from forgot password', err);
      res.status(500).json({ success: false, errorMessage: 'Sorry couldnt change password. Try Again!!' });
   }
}

// @desc CREATES PRODUCTS
exports.createProducts = async(req, res) => {
   const { farmerId } = req.user
   const { name, price, weight, description, category } = req.body;
   const productPicture = req.files
   // const productPictureUrl = productPicture.map(files => ({
   //    originalname: files.originalname,
   //    path: files.path
   // }));

   try {
      const products = await ProductSchema.create({
         farmerID: farmerId,
         name, 
         price,
         weight,
         description,
         category,
      });
      res.status(200).json({ success: true, products });
   } catch (err) {
      const error = handleErrors(err);
      console.log('Error from create product', error);
      res.status(500).json({ success: false, error });
   }
}

// @desc UPLOAD PRODUCT IMAGES
exports.uploadProductPicture = async (req, res) => {
   const { farmerId } = req.user;
   const productImage = req.files;
   const { ID } = req.params
   try {
      const farmer = await ProductSchema.findOne({ farmerID: farmerId });

      if(!farmer) {
         return res.status(404).json({ success: false, message: 'Sorry you are not registered to upload a picture' });
      }

      const uploadImage = await ProductSchema.findOneAndUpdate({ _id: ID }, { productPicture: productImage }, {
         new: true,
         runValidators: true
      });
      res.status(200).json({ success: true, uploadImage });
   } catch (err) {
      console.log('Error from upload image', err);
      res.status(500).json({ success: false, message: 'Couldnt upload file, kindly try again ' });
   }
}

// @desc GETTING ALL FARMER PRODUCTS 
exports.getAllProducts = async (req, res) => {
   const { farmerId } = req.user;
   try {
      const products = await ProductSchema.find({ farmerID: farmerId });

      if(!products) {
         res.status(404).json({ success: false, message: 'You currently have no added products' });
      }

      res.status(200).json({ success: true, products, nbHits: products.length });
   } catch (err) {
      console.log('Error from get all products', err);
      res.status(500).json({ success: false, err });
   }
}

// @desc GETTTING A SINGLE PRODUCTS
exports.getSingleProduct = async (req, res) => {
   const { productId } = req.params;
   try {
      const product = await ProductSchema.findById({ _id: productId });

      if(!product) {
         res.status(404).json({ success: false, message: 'Product does not exist' });
      }

      res.status(200).json({ success: true, product });
   } catch (err) {
      console.log('Error from get single product', err);
      res.status(500).json({ success: false, err });
   }
}

// @desc UPLOADING PROFILE PICTURE
exports.profilePicture = async (req, res) => {
   const { farmerId } = req.user
   const profilePicture = req.file;
   const profilePictureUrl = profilePicture.path;
   try {
      const farmer = await FarmerSchema.findOneAndUpdate({ _id: farmerId }, { profilePicture: profilePictureUrl }, {
         new: true,
         runValidators: true
      });
      if(!farmer) {
      return res.status(404).json({ success: false, message: 'Only farmers are allowed to change their profile picture' });
      }

      res.status(200).json({ success: true, profilePictureUrl });
   } catch (err) {
      console.log('Error from profile picture', err);
      res.status(500).json({ success: false, message: err });
   }
}

// @desc ADDING UP PRODUCT PICTURES
exports.editProduct = async (req, res) => {
   const { productId } = req.params;
   const { name, price, weight, description, category } = req.body

   try {
      const product = await ProductSchema.findOneAndUpdate({ _id: productId }, { name, price, weight, description, category }, {
         new: true,
         runValidators: true
      });

      if(!product) {
      return res.status(404).json({ success: false, message: 'Product does not exist' });
      }

      res.status(200).json({ success: true, product });
   } catch (err) {
      console.log('Error from edit product', err);
      res.status(500).json({ success: false, message: err });
   }
}

// @desc EDIT PRODUCT IMAGES
exports.editProductPicture = async (req, res) => {
   const { farmerId } = req.user;
   const productImage = req.files;
   const { productId } = req.params
   try {
      const farmer = await ProductSchema.findOne({ farmerID: farmerId });

      if(!farmer) {
         return res.status(404).json({ success: false, message: 'Sorry you are not registered to upload a picture' });
      }

      const uploadImage = await ProductSchema.findOneAndUpdate({ _id: productId }, { productPicture: productImage }, {
         new: true,
         runValidators: true
      });
      res.status(200).json({ success: true, uploadImage });
   } catch (err) {
      console.log('Error from upload image', err);
      res.status(500).json({ success: false, message: 'Couldnt upload file, kindly try again ' });
   }
}

// @desc GET ALL PURCHASED ITEMS
exports.getAllPurchases = async (req, res) => {
   try {
      const purchasedProduct = await ProductSchema.find({ successfulPurchase: true });

      if(!purchasedProduct) {
      res.status(404).json({ success: false, message: 'No product has been purchased yet' });
      }
      res.status(200).json({ success: true, message: purchasedProduct, nHits: purchasedProduct.length });
   } catch (err) {
      console.log('Error from get all purchases', err);
      res.status(500).json({ success: false, message: err });
   }
}

// @desc EDITING FARMER PROFILE
exports.editProfile = async (req, res) => {
   const { farmerId } = req.user;
   const { firstName, lastName, email, phoneNumber, bio, farmName, farmAddress, cropType, language, bankingDetails } = req.body;

   try {
      const farmer = await FarmerSchema.findByIdAndUpdate({ _id: farmerId }, { firstName, lastName, email, phoneNumber, bio, farmName, farmAddress, cropType, language, bankingDetails }, {
         new: true,
         runValidators: true
      });
      
      res.status(200).json({ success: true, farmer });
   } catch (err) {
      console.log('Error from edit profile', err);
      res.status(500).json({ success: false, message: err });
   }
}