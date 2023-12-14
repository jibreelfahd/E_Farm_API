const multer = require('multer');
const path = require('path');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

// @desc DESCRIBING THE FOLDER TO SAVE FILES DEPENDING ON SPECIFIC USER
const upload = (userType) => {
   let folder

   switch (userType) {
      case 'user':
         folder = 'userFile';
         break;
      case 'farmer':
         folder = 'farmerFile'
         break;
      default:
         throw Error('Invalid User Type');
   }

const storage = new CloudinaryStorage({
   cloudinary: cloudinary,
   params: {
      folder: folder,
      resource_type: 'auto'
   },
   filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + file.originalname);
    }
});

const uploadMiddleware = multer({
   storage: storage,
   fileFilter: function (req, file, cb) {
      checkFileType(file, cb)
   }
});
   return uploadMiddleware;
}


function checkFileType (file, cb) {
   const fileTypes = /jpeg|png|jpg|mp4|ogg|flv|webm/;
   const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
   const mimetype = fileTypes.test(file.mimetype);

   if(extname && mimetype) {
      return cb(null, true);
   } else{
      cb('ERROR, Kindly upload a valid file type');
   }
}

module.exports = upload;
