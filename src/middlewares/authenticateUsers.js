const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (userType) => (req, res, next) => {
   try {
      const token = req.headers.authorization?.split(" ")[1];
      if(!token) {
         return res.status(401).json({ success: false, message: 'You are unauthorized to access this resource. Try Again Later' });
      }
   
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
         if(err) {
         return res.status(401).json({ success: false, message: 'Invalid Token. Try Again Later' });
         }
    
         if(userType && decoded.userType !== userType) {
            return res.status(403).json({ success: false, message: 'Forbidden, Access Denied'} );
         } 
         req.user = decoded;
         console.log(req.user)
         next();
      })
   } catch (err) {
      console.log('Error from verify token', err);
   }
}

module.exports = auth