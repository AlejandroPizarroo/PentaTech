const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateEmail = require("../emailSender");
const temporalPassword = require("../models/temporalPasswords");
const generateTemporalPassword = require("../temporalPassword");
const saltLength = 3;

// @route        GET /api/auth/test
// @description  Test the auth route
// @access       Public
router.get("/test", (req, res) => {
   res.send("Auth route working");
});

// @route GET    POST /api/auth/register
// @description  Create a new user
// @access       Public
router.post("/register", async (req, res) => {
   try {
      // hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, saltLength);
      // create a new user
      const newUser = new User({
         email: req.body.email,
         password: hashedPassword,
         name: req.body.name
      });
      // save the user to the database
      const savedUser = await newUser.save();

      // return the new user
      return res.json(savedUser);
   } catch(err) {
      if (err.name === 'MongoServerError' && err.code === 11000) {
         console.log(err.name);
         console.log(err.code);
         console.log(`Could not complete registration, the account with the email: ${err.keyValue.email} already exists`);
         res.status(500).send(err.message);
      }
      else {
         console.log(err.message);
         res.status(500).send(err.message);
      }
   }
});

// @route GET    PATCH /api/auth/verifyEmail
// @description  temporal storage of temporal password
// @access       Public
router.post("/verifyEmail", async(req, res) => {
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

router.get("/verifyTemporalPassword", async(req, res) => {
   try {
      const result = await temporalPassword.findOne({ password: req.body.password })
      if(result.password == req.body.password) {
         res.send("passwords match");
      }
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
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