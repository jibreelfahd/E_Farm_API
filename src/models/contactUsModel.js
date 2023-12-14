const mongoose = require('mongoose');
const { isEmail } = require('validator');

const contactSchema = new mongoose.Schema({
   name: {
      type: String,
      required: false
   },
   email: {
      type: String,
      required: [true, 'Please enter an email'],
      lowercase: true,
      validate: [isEmail, 'Please input a valid email'],
      unique: true
   },
   phoneNumber: {
      type: Number,
      required: [true, 'Please enter a phone number'],
      unique: true
   },
   message: {
      type: String,
      required: false
   }
});

const ContactSchema = mongoose.model('Contact-Submission', contactSchema);
module.exports = ContactSchema;