const { Schema, model } = require('mongoose');

const FarmerSchema = require('./farmerModel');

// @desc FOR REVIEWS ON A SPECIFIC PRODUCT
const UserSchema = require('./userModel');

const productSchema = new Schema({
   farmerID: {
      type: Schema.Types.ObjectId,
      ref: FarmerSchema,
      default: null,
      required: true
   },
   userID: {
      type: Schema.Types.ObjectId,
      ref: UserSchema,
      default: null
   },
   name: {
      type: String,
      required: [ true, 'Please provide a product name' ],
      unique: true
   },
   price: {
      type: Number,
      required: [ true, 'Please provide product price' ]
   },
   weight: {
      type: String,
      required: [ true, 'Product weight is required' ]
   },
   description: {
      type: String,
      required: [ true, 'Provide a product description' ]
   },
   category: {
      type: String,
   },
   review: {
      type: String,
      default: null
   },
   topDeals: {
      type: Boolean,
      default: false
   },
   createdAt: {
      type: Date,
      default: Date.now()
   },
   productPicture: [{
      originalname: {
         type: String,
         required: true
      },
      path: {
         type: String,
         required: true
      }
   }],
   successfulPurchase: {
      type: Boolean,
      default: false
   }
});

const ProductSchema = model('product', productSchema);
module.exports = ProductSchema;