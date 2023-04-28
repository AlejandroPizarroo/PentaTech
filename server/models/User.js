const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);
const User = model("User", UserSchema);
module.exports = User;