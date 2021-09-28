const { Schema, model } = require("mongoose");

const appointmentSchema = new Schema({
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
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photos: [{
        type: String,
        required: true,
        default: "https://res.cloudinary.com/dcdfzbe8n/image/upload/v1631559840/png-clipart-computer-icons-registered-user-login-user-profile-others-blue-logo_byluma.png"
    }],
}, { timestamps: true });

const Appointment = model("Appointment", appointmentSchema);

module.exports = Appointment;