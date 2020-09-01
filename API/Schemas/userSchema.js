var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email_id: {
        type: String,
        unique: true,
        required: true
    },
    password: { 
        type: String, 
        required: true 
    }
});

userSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ name: this.name, email_id: this.email_id }, process.env.ACCESS_TOKEN_SECRET);
    return token;
}

module.exports = mongoose.model("Users", userSchema);
