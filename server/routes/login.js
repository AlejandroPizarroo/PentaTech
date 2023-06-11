const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const generateEmail = require("../emailSender");
const temporalPassword = require("../models/temporalPasswords");
const generateTemporalPassword = require("../temporalPassword");
const saltLength = 3;

router.put("/requestOtpCreation", async(req, res) => {
   try {
      const tempPassword = generateTemporalPassword(saltLength);
      const hashedPassword = await bcrypt.hash(tempPassword, saltLength);
      const updatedTemporalPassword = await temporalPassword.findOneAndUpdate(
          { email: req.body.email },
          { password: hashedPassword },
          { new: true }
      );
      if(!updatedTemporalPassword){
         const newPassword = new temporalPassword({
            email: req.body.email,
            password: hashedPassword
         })
         const savedTemporalPassword = await newPassword.save();
         generateEmail(req.body.email.toString(), tempPassword);
         return res.json(savedTemporalPassword);
      }
      else{
         generateEmail(req.body.email.toString(), tempPassword);
         return res.json(updatedTemporalPassword);
      }
   } catch(err) {
      res.status(500).send(err.message);
   }
});

router.get("/requestOtpVerification/:password/:email", async(req, res) => {
   const { password, email } = req.params;
   try {
      const userExists = await temporalPassword.exists({ email });
      if(userExists) {
         const user = await temporalPassword.findOne({ email });
         const isMatch = await bcrypt.compare(password, user.password)
         if(isMatch){
            res.json({success: true, message: 'Password matches with hashed password in database'});
         }
         else {
            res.status(404).json({ success: false, message: 'Password does not match the hashed password' });
         }
      }
      else {
         res.status(404).json({ success: false, message: 'Email does not exist in database' });
      }
   } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal server error.' });
   }
});

module.exports= router;