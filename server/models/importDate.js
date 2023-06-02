const mongoose = require("mongoose");

const importDateSchema = mongoose.Schema({
    date: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("ImportDate", importDateSchema, "importDate")