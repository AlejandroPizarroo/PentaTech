const mongoose = require("mongoose");

const certificationSchema = mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    org: {
        type: String,
        required: true
    },
    work_location: {
        type: String,
    },
    certification: {
        type: String,
        required: true,
    },
    issue_date: {
        type: String,
    },
    type: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model("Certifications", certificationSchema, "certificationTest")