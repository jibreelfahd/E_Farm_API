require('dotenv').config();

// @desc IMPORTS
const ProductSchema = require('../../models/productModel');
const mongoConnect = require('../index');
const productJson = require('./product.json');

// @desc CONNECTNG TO THE DATABASE
const startDB = async () => {
   try {
      await mongoConnect(process.env.MONGO_URI);
      await ProductSchema.deleteMany();
      await ProductSchema.create(productJson);
      console.log('Success');
      process.exit(1)
   } catch (err) {
      console.log('Error from populate DB', err)
      process.exit(0)
   }
}
startDB();