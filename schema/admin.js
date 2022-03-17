const mongoose = require('mongoose');
const {Schema} = mongoose;

const adminSchema = new Schema({
    id : mongoose.ObjectId,
    name:{
      type :String,
    },
    mobile:{
      type :String,
    },
    email:{
      type :String,
    },
    password:{
      type :String,
    },
    doc : { type: Date, default: Date.now },
    versionKey: false
});

module.exports = adminSchema;