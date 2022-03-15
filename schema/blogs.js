const mongoose = require('mongoose');
const {Schema} = mongoose;

const blogSchema = new Schema({
    title: String,
    desc: String,
    date : Date,
});

module.exports = blogSchema;