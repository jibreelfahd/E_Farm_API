const mongoose = require('mongoose');


// @desc-connecting to mongodb database
const mongoConnect = async (url) => {
   try {
      await mongoose.connect(url);
   } 
   catch (err) {
      console.log(err.message);
   }       
}

module.exports = mongoConnect;