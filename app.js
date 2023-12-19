const express = require('express')
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');

// @desc IMPORTS
const contactUsRouter =  require('./src/routers/contactUsRouter');
const userRouter = require('./src/routers/userRouter');
const farmerRouter = require('./src/routers/farmerRoutes');
const mongoConnect = require('./src/db/index');
const { notFound } = require('./src/middlewares/404middleware');

// @desc-MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./src/public/e-gona'));
app.use(cookieParser());
app.use(cors('*'));

// @desc setting PORT
const port = process.env.PORT || 5000

//@ desc-conecting to the database
const dbURI = process.env.MONGO_URI;
const startDB = async() => {
   try {
      await mongoConnect(dbURI);
      app.listen(port, console.log(`Server is up and running on port ${port}....`));
   } catch (err) {
      console.log(err.message);
   }
}
startDB();

// @desc-ROUTES
app.use('/e-gona', contactUsRouter);
app.use('/e-gona', userRouter);
app.use('/e-gona/farmer', farmerRouter);


// @desc middleware for unavailable resources
app.use(notFound);