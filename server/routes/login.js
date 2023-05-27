const express = require("express");
const router = express.Router();
const generateEmail = require("../emailSender");
const temporalPassword = require("../models/temporalPasswords");
const generateTemporalPassword = require("../temporalPassword");
const saltLength = 3;

router.put("/requestOtpCreation", async(req, res) => {
   try {
      const tempPassword = generateTemporalPassword(saltLength)
      const updatedTemporalPassword = await temporalPassword.findOneAndUpdate(
          { email: req.body.email },
          { password: tempPassword },
          { new: true }
      );
      if(!updatedTemporalPassword){
         const newPassword = new temporalPassword({
            email: req.body.email,
            password: tempPassword
         })
         const savedTemporalPassword = await newPassword.save();
         //generateEmail(req.body.email.toString(), tempPassword);
         return res.json(savedTemporalPassword);
      }
      else{
         return res.json(updatedTemporalPassword);
      }
   } catch(err) {
      res.status(500).send(err.message);
   }
});

router.post("/requestOtpVerification", async(req, res) => {
   const password = req.body.password;
   try {
      const passwordExists = await temporalPassword.exists({ password });
      if (passwordExists) {
         res.json({success: true, message: 'Password found.'});
      } else {
         res.status(404).json({ success: false, message: 'Password not found.' });
      }
   } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal server error.' });
   }
});

module.exports= router;