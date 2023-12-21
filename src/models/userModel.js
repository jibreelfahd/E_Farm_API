const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = new Schema({
   name: {
      type: String,
      required: [true, 'Please enter your fullname']
   },
   email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      validate: [isEmail, 'Enter a valid email'],
      lowercase: true
   },
   phoneNumber: {
      type: Number,
      required: [true, 'Phone number is required']
   },
   password: {
      type: String,
      required: [true, 'Enter a password'],
      minlength: [10, 'Password should be a combination of 10 characters']
   }
});

// @desc Hasing passwords before saving into the database 
userSchema.pre('save', async function(doc, next) {
   const salt = await bcrypt.genSalt();
   this.password = await bcrypt.hash(this.password, salt);
})


// @desc Finding a user and comparing their password 
userSchema.statics.login = async function(email, phoneNumber, password) {
   const user = await this.findOne({ "$or": [ { email}, { phoneNumber} ] });
   if (user){
      const authLogin = await bcrypt.compare(password, user.password);
      if (authLogin){
         return user;
      }
      throw Error('Incorrect password');
   }
   throw Error('This user is not registered')
}


const UserSchema = model('user', userSchema);
module.exports = UserSchema;