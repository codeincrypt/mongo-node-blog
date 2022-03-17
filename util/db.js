const mongoose = require('mongoose');
require('dotenv').config();

var db
var uri
var options

const username = encodeURIComponent(process.env.UNAME);
const password = encodeURIComponent(process.env.PASSWORD);
const cluster = process.env.CLUSTER;
const dbname = process.env.DBNAME;

const SERVER = "localhost"
// const SERVER = "live"

if(SERVER === 'localhost'){
  uri = `mongodb://localhost:27017/${dbname}`;
  options = {
    useNewUrlParser: true
  }

} else {  
  uri = `mongodb+srv://${username}:${password}@${cluster}/${dbname}`;
  options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  
}
mongoose.connect(uri, options)
.then(async(resp) => {
  db = mongoose.connection
  // const asasa = await resp
  console.log('Mondo DB Connected Successfully ')
})
.catch((err) => {
  db = err;
  console.error('Not Connected', err)
});

module.exports = db;