const mongoose = require('mongoose');
const {Schema} = mongoose;

const adminSchema = new Schema({
    id : mongoose.ObjectId,
    name : { type: String },
    mobile : { type: String, index: { unique: true } },
    email : { type: String, index: { unique: true } },
    password : { type: String },
    otp : { type: String },
    status : { type: Boolean },
    doc : { type: Date, default: Date.now },
    versionKey: false
});

module.exports = adminSchema;