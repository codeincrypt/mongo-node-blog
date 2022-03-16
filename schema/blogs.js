const mongoose = require('mongoose');
const {Schema} = mongoose;

const blogSchema = new Schema({
    id : mongoose.ObjectId,
    title:{
        type :String,
    },
    desc:{
        type :String,
    },
    date:{
        type :String,
    },
    doc : { type: Date, default: Date.now },
    versionKey: false
});

module.exports = blogSchema;