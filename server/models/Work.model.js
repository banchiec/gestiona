const { Schema, model } = require("mongoose");

const workSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    photos: [{
        type: String,
        default: "https://res.cloudinary.com/dcdfzbe8n/image/upload/v1631559840/png-clipart-computer-icons-registered-user-login-user-profile-others-blue-logo_byluma.png"
    }]
}, { timestamps: true });

const Work = model("Work", workSchema);

module.exports = Work;