const { Schema, model } = require('mongoose');

// @desc IMPORTS
const UserSchema = require('./userModel');

const checkoutSchema = new Schema({
   userID: {
      type: Schema.Types.ObjectId,
      ref: UserSchema
   },
   address: {
      type: String,
      required: [ true, 'A shipping address must be specified' ]
   },
   apartment: {
      type: String
   },
   town: {
      type: String,
      required: [ true, 'Specify the town for delivery' ]
   }
});

const CheckoutSchema = model('checkout', checkoutSchema);
module.exports = CheckoutSchema;