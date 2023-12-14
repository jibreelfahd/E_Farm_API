const express =  require('express');
const router = express.Router();
const { contact_post } = require('../controllers/contactUsController');

// @route contactus Route 
// @desc route for contact us with controller function
router.post('/contactus', contact_post);

module.exports = router;