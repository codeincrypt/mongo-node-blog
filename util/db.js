const mongoose = require('mongoose');
require('dotenv').config();

const username = encodeURIComponent(process.env.USERNAME);
const password = encodeURIComponent(process.env.PASSWORD);
const cluster = process.env.CLUSTER;
const dbname = process.env.DBNAME;

const uri = `mongodb+srv://${username}:${password}@${cluster}/${dbname}`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

var db

mongoose.connect(uri, options)
.then(() => {
  db = mongoose.connection
  console.log('Mondo DB Connected Successfully')
})
.catch((err) => {
  db = err;
  console.error('Not Connected', err)
});

module.exports = db;