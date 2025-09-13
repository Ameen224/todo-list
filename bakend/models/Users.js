// bakend/models/Users.js

const mnogoose = require('mongoose');

const userSchema = new mnogoose.Schema({
    name: { type: String,  required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

module.exports = mnogoose.model('User',userSchema) 