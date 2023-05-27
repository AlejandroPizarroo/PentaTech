const mongoose = require('mongoose');

// Define a schema for the objects
const udemyPopularSchema = mongoose.Schema({
  certification: String
});

// Create a model based on the schema

module.exports = mongoose.model("CourseraCertification", udemyPopularSchema, "courseraCert")  