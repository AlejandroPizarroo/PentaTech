const mongoose = require('mongoose');

// Schema for the object
const udemyPopularSchema = mongoose.Schema({
  name: String
});

// Model based on the schema

module.exports = mongoose.model("UdemyPopular", udemyPopularSchema, "udemyPop")  