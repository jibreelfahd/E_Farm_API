const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');

const farmerSchema = new Schema({
   firstName: {
      type: String,
      required: [ true, 'Please provide in first name' ],
      default: 'John'
   },
   lastName: {
      type: String,
      required: [ true, 'Please provide in last name' ],
      default: 'Doe'
   },
   email: {
      type: String,
      required: [ true, 'An email is required' ],
      unique: true,
      lowercase: true,
      validator: [ isEmail, 'Email is invalid' ]
   },
   password: {
      type: String,
      minlength: [ 10, 'Password cannot be less than 10 characters' ],
      required: [ true, 'Provide your password' ]
   },
   phoneNumber: {
      type: Number,
      required: [ true, 'Provide a valid Phone Number' ],
      unique: true
   },
   bio: {
      type: String, 
   },
   farmName: {
      type: String,
      default: null
   },
   farmAddress: {
      type: String,
      default: null,
      required: [ true, 'Please specify farm address' ]
   },
   cropType: {
      type: String,
      default: null
   },
   language: {
      type: String,
      default: 'English'
   },
   bankingDetails: {
      type: Number
   },
   profilePicture: {
      type: String,
      default: 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg'
   },
});

// @desc HASHING THE PASSWORD BEFORE SAVING IN THE DATABASE
farmerSchema.pre('save', async function(doc, next) {
   const salt = await bcrypt.genSalt();
   this.password = await bcrypt.hash(this.password, salt);
});


// @desc LOGIN IN THE FARMER
farmerSchema.statics.login = async function(email, phoneNumber, password){
   const farmer = await this.findOne({ '$or': [ { email }, { phoneNumber } ]});
   if(farmer) {
      const farmerLogin = await bcrypt.compare(password, farmer.password);
      if (farmerLogin) {
         return farmer;
      }
      throw Error('Invalid Credentials or Password');
   }
   throw Error('This user does not exist');
}
const FarmerSchema = model('farmer', farmerSchema);
module.exports = FarmerSchema;