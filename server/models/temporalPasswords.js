const { Schema, model } = require("mongoose");
//const emailRegex = /^[\w.%+-]+@ibm\.com$/i;
const emailRegex = /^[\w.%+-]+@tec\.mx$/i;

const temporalPasswordsSchema = new Schema(
    {
        createdAt:{ type: Date, default: Date.now, expires: '1m' },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (v) {
                    return emailRegex.test(v);
                },
                message: props => `${props.value} is not a valid email address!`
            }
        },
        password: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true
    }
);
const temporalPassword = model("temporalPassword", temporalPasswordsSchema);
module.exports = temporalPassword;