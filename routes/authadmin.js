const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
const mongoose = require('mongoose');
const sha1 = require('sha1');

const adminSchema = require('../schema/admin');
const Admin = mongoose.model('admins', adminSchema);

// db is require to connect the mongoose server
const db = require('../util/db')

const { SALTKEY, JWT_KEYS } = require('../constant/keys');

moment().tz("Asia/Calcutta").format();
process.env.TZ = 'Asia/Calcutta';

// ADMIN LOGIN
router.post('/login', async (req, res) => {
  var {email, password} = req.body

  let saltedPass = SALTKEY.concat(password)
  var hashedPass = sha1(saltedPass);

  Admin.findOne({email: email}).exec((err, data) => {
    if(err){
      return res.status(400).json({status: 0, message: err.message});
    }
    if(data === null){
      return res.json({status: 0, message: "Invalid Email ID"});
    } else {
      if(data.password.localeCompare(hashedPass) === 0){
        const token = jwt.sign({id: data._id}, JWT_KEYS, {
          expiresIn: '24h' // expires in 24 hours
        })
        res.json({status: 1, message: "Login successfully", token:token});
      } else {
        res.json({status: 0, message: "Invalid Email ID or Password"});
      }
    }
  });
})

// FORGOT PASSWORD
router.post('/forgot-password', async (req, res) => {
  var {email} = req.body
  Admin.findOne({email: email}).exec(async(err, data) => {
    if(err){
      return res.status(400).json({status: 0, message: err.message});
    }
    if(data === null){
      return res.json({status: 0, message: "Invalid Email ID"});
    } else {
      var otp = Math.floor(1000 + Math.random() * 9000)
      console.log('otp', otp)
      var newotp = SALTKEY.concat(otp)
      var hashedOTP = sha1(newotp);
    
      await Admin.findOneAndUpdate({email :email}, {otp: hashedOTP});
      res.json({status: 1, message: "OTP send to your registered e-mail Id"});
    }
  });
})

// VERIFY OTP FOR CHANGE PASSWORD
router.post('/verifyotp-forgotpassword', async (req, res) => {
  var {email, otp} = req.body

  var newotp = SALTKEY.concat(otp)
  var hashedOTP = sha1(newotp);

  Admin.findOne({email: email}).exec(async(err, data) => {
    if(err){
      return res.status(400).json({status: 0, message: err.message});
    }
    if(data === null){
      return res.json({status: 0, message: "Invalid Email ID"});
    } else {
      if(data.otp.localeCompare(hashedOTP) === 0){
        res.json({status: 1, message: "OTP Verified. Please change your password"});
      } else {
        res.json({status: 0, message: "Invalid OTP"});
      }
    }
  });
})

// UPDATE / CHANGE PASSWORD
router.post('/reset-password', async (req, res) => {
  var {email, password, cpassword} = req.body
  if(!email || !password || !cpassword){
    return res.status(422).json({status: 0, message : "Required all fields"})
  }
  if(password !== cpassword){
    return res.status(422).json({status: 0, message : "Please check your password & confirm password did not match"})
  }
  let saltedPass = SALTKEY.concat(password)
  var hashpassword = sha1(saltedPass);
  const resp = await Admin.findOneAndUpdate({email :email}, {password:hashpassword});
  res.json({status: 1, message: "Password changed successfully"});
})

module.exports = router