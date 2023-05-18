const mongoose = require("mongoose");

const certificationSchema = mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
    org: {
        type: String,
        required: true,
    },
    work_location: {
        type: String,
        required: true,
    },
    certification: {
        type: String,
        required: true,
    },
    issue_date: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Certification", certificationSchema, "certifications")