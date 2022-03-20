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
router.post('/search-blog', async (req, res) => {
  var {query} = req.body
  // Blogs.find({desc : { $regex: `.*${query}.*`, $options: 'i'}, title : { $regex: `.*${query}.*`, $options: 'i'}}, (err, data) => {
  //   console.log('data', data)
  //   if(err){
  //     return res.status(400).json({status: 0, message: err.message});
  //   }
  //   if(data !== null || data.length > 0){
  //     res.json(data);
  //   } else {
  //     res.json({status: 0, message: "No data found"});
  //   }
  // });

  var regexdata = new RegExp(query, 'i');

  Blogs.find().or([{ 'title': { $regex: regexdata }}, { 'desc': { $regex: regexdata }}]).sort('title').exec((err, data) => {
    if(err){
      return res.status(400).json({status: 0, message: err.message});
    }
    if(data !== null || data.length > 0){
      res.json(data);
    } else {
      res.json({status: 0, message: "No data found"});
    }
  });

  // try {
  //   const docs = await Blogs.find({desc : { $regex: `.*${query}.*`, $options: 'i'}});
  //   console.log('docs', docs);
  //   res.json(docs);
  // } catch (err) {
  //   console.log(err);
  // }

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
      return res.status(400).json({status: 0, message: err.message});
    }
    if(data === null){
      return res.json({status: 0, message: "Invalid id"});
    } else {
      res.json(data);
    }
  });
})

module.exports = router




