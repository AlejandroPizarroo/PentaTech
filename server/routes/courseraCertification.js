const express = require("express");
const router = express.Router();
const courseraCertificationSchema = require("../models/courseraCertification")


// get all certifications and all parameters
router.get("/raw/certification", (req,res) => {
    courseraCertificationSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}))
})
// Retrive data all coursera certifications in one object / list
router.get('/list/certification', async (req, res) => {
    const parameterName = 'certification'; // Replace with the actual parameter name
  
    try {
      const documents = await courseraCertificationSchema.find({}, parameterName);
  
      if (!documents) {
        return res.status(404).json({ error: 'No documents found' });
      }
  
      // Extract the requested parameter value from each document
      const parameterValues = documents.map(document => document[parameterName]);
  
      res.json({ [parameterName]: parameterValues });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
// Retrive data all coursera certifications in separate objects
  router.get('/object/certification', async (req, res) => {
    const parameterName = 'certification'; // Replace with the actual parameter name
  
    try {
      const documents = await courseraCertificationSchema.find({}, parameterName);
  
      if (!documents) {
        return res.status(404).json({ error: 'No documents found' });
      }
  
      // Extract the requested parameter value from each document
      const result = documents.map(document => {
        return { [parameterName]: document[parameterName] };
      });
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

module.exports = router;