const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateEmail = require("../emailSender");
const temporalPassword = require("../models/temporalPasswords");
const generateTemporalPassword = require("../temporalPassword");
const saltLength = 3;
router.post("/saveTemporalPassword", async(req, res) => {
   try {
      const tempPassword = generateTemporalPassword(saltLength)
      const newPassword = new temporalPassword({
         email: req.body.email,
         password: tempPassword
      })
      const savedTemporalPassword = await newPassword.save();
      generateEmail(req.body.email.toString(), tempPassword);
      return res.json(savedTemporalPassword);
   } catch(err) {
      res.status(500).send(err.message);
   }
});

router.post("/verifyTemporalPassword", async(req, res) => {
   const password = req.body.password;

   try {
      const passwordExists = await temporalPassword.exists({ password });

      if (passwordExists) {
         res.json({ success: true, message: 'Password found.' });
      } else {
         res.status(404).json({ success: false, message: 'Password not found.' });
      }
   } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal server error.' });
   }
});

router.patch("/resendTemporalPassword", async(req, res) => {
   try {
      const tempPassword = generateTemporalPassword(saltLength)
      const updatedTemporalPassword = await temporalPassword.findOneAndUpdate(
          { email: req.body.email },
          { password: tempPassword },
          { new: true }
      );

      // Check if the record was found and updated
      if (!updatedTemporalPassword) {
         return res.status(404).send("Account not found");
      }
      generateEmail(req.body.email.toString(), tempPassword);
      return res.json(updatedTemporalPassword);
   } catch(err) {
      res.status(500).send(err.message);
   }
});

module.exports= router;