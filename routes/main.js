const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
const mongoose = require('mongoose');

const blogSchema = require('../schema/blogs');
const db = require('../util/db');

const Blogs = mongoose.model('blogs', blogSchema);

moment().tz("Asia/Calcutta").format();
process.env.TZ = 'Asia/Calcutta';

router.get('/blog', async (req, res) => {
  Blogs.find().exec((err, data) => {
    if(err){
      console.log('err', err);
      return res.status(400).json({status: 0, message: err.message});
    }
    res.json(data);
  });
})

router.post('/blog', async (req, res) => {
  
var date = moment().format('DD-MM-YYYY');
var time = moment().format('hh:mm:ss')

  const body = {
    title: "remote development",
    desc : "productivity benefits to software teams. See how to optimize them for low latency. Remote IDEs bring productivity benefits to software teams. See how to optimize them for low latency",
    // date : date
  };

  try {
    const inserted = await Blogs.create(body);
    var info = {
      status:1,
      message:"data inserted",
      data : inserted
    }
    res.json(info);
  } catch (err) {
    console.error('inserted err', err);
  }
})

module.exports = router