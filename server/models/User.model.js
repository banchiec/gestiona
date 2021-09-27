const { Schema, model } = require("mongoose");

const userSchema = new Schema({

  firstName: {
    type: String,
    required: true

  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  photo_profile: {
    type: String,
    default: "https://res.cloudinary.com/dcdfzbe8n/image/upload/v1631559840/png-clipart-computer-icons-registered-user-login-user-profile-others-blue-logo_byluma.png"
  },
  photos: [{
    type: String,
  }],
  works: [{
    type: Schema.Types.ObjectId,
    ref: 'Work'
  }]
}, { timestamps: true });

const User = model("User", userSchema);

module.exports = User;