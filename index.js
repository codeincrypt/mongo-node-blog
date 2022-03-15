const express = require('express')
const moment = require('moment-timezone');
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 4000;

const homeRoute = require('./routes/main')

app.use(cors())
app.use(express.json())
app.use(express.static('public'));

app.use('/main', homeRoute)

app.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send('hello Mongo Node Blog');
})

app.listen(PORT, () => {
    var datetime = moment().format('DD MMM YYYY, hh:mm A');
    console.log('---------------')
    console.log('App running on port -', PORT)
    console.log('Mongo Node Blog App running on port - ', datetime)
})

moment().tz("Asia/Calcutta").format();
process.env.TZ = 'Asia/Calcutta';
var date = moment().format('DD-MM-YYYY');
var time = moment().format('hh:mm:ss')
console.log(date, time)
