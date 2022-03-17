const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
const mongoose = require('mongoose');

const blogSchema = require('../schema/blogs');
const Blogs = mongoose.model('blogs', blogSchema);

const db = require('../util/db')

moment().tz("Asia/Calcutta").format();
process.env.TZ = 'Asia/Calcutta';

// SEARCH DATA
router.get('/search-blog/:query', (req, res) => {
  var query = req.params.query
  Blogs.find({title: query}, (err, data) => {
    if(err){
      return res.status(400).json({status: 0, message: err.message});
    }
    if(data === null || data.length > 0){
      res.json(data);
    } else {
      res.json({status: 0, message: "No data found"});
    }
  });
})

// GET ALL DATA
router.get('/blog', async (req, res) => {
  Blogs.find().exec((err, data) => {
    if(err){
      console.log('err', err);
      return res.status(400).json({status: 0, message: err.message});
    }
    if(data.length > 0){
      res.json(data);
    } else {
      res.json({status: 0, message: "No data found"});
    }
  });
})

// GET SINGLE DATA
router.get('/blog/:id', async (req, res) => {
  var id = req.params.id;
  Blogs.findOne({_id: id}).exec((err, data) => {
    if(err){
      console.log('err', err);
      return res.status(400).json({status: 0, message: err.message});
    }
    if(data === null){
      return res.json({status: 0, message: "Invalid id"});
    } else {
      res.json(data);
    }
  });
})

// INSERT NEW DATA
router.post('/blog', async (req, res) => {
  var {title, desc} = req.body
  if(!title || !desc){
    return res.status(422).json({status: 0, message : "Required all fields"})
  }
  var date = moment().format('DD-MM-YYYY');
  var time = moment().format('hh:mm:ss')

  const body = {
    title: title,
    desc : desc,
    date : date
  };

  try {
    const inserted = await Blogs.create(body);
    var info = {
      status : 1,
      message: "data inserted",
      data : inserted
    }
    res.json(info);
  } catch (err) {
    console.error('inserted err', err);
  }
})

// UPDATE DATA
router.post('/update-blog', async (req, res) => {
  var {id, title, desc} = req.body
  if(!title || !desc || !id){
    return res.status(422).json({status: 0, message : "Required all fields"})
  }
  const body = {
    title: title,
    desc : desc,
  };
  const resp = await Blogs.findOneAndUpdate({_id :id}, body);
  res.json({status: 1, message: "Updated successfully", data: resp});
})

module.exports = router




