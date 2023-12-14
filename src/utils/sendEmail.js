const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require('dotenv').config();

// @desc Creating constants for credentials 
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;


// @desc Creating an oauth2 client
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// @desc function to create the nodemailer transport and send the email 
async function sendMail(userEmail, emailSubject, emailText) {
   try {
      const accessToken = await oAuth2Client.getAccessToken();

      const transport = await nodemailer.createTransport({
         service: 'gmail',
         auth: {
            type: 'OAuth2',
            user: 'contactegona@gmail.com',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken
         }
      });

      const mailOptions = {
         from: 'Contact@Egona <contactegona@gmail.com>',
         to: userEmail,
         subject: emailSubject,
         text: emailText,
      }
   
      const emailSent = await transport.sendMail(mailOptions);
      return emailSent;
   } 
   catch (error) {
      return error;
   }
}

module.exports = sendMail;