const { Schema, model } = require('mongoose');

// @IMPORTS
const UserSchema = require('./userModel')
const ProductSchema = require('./productModel')

const cartSchema = new Schema({
   userID: {
      type: Schema.Types.ObjectId,
      ref: UserSchema
   },
   cartItems: [{
      productID: {
         type: Schema.Types.ObjectId,
         ref: ProductSchema
      },
      quantity: {
         type: Number,
         default: 1
      }
   }],
});

const Cart = model('cart', cartSchema);
module.exports = Cart;