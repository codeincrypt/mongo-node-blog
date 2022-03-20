const jwt = require('jsonwebtoken');
const { JWT_KEYS } = require('../constant/keys');

const db = require('../util/db')

const adminSchema = require('../schema/admin');
const Admin = mongoose.model('admins', adminSchema);

module.exports = (req, res, next) => {
    const {authorization} = req.headers
    if(!authorization){
        return res.status(400).json({session:"expired", error: "You must be logged in"})
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, JWT_KEYS, (err, payload) => {
        if(err){
            return res.status(400).json({session:"expired", error: "Token expired, Please logged in"})
        }
        const {id} = payload

        Admin.findOne({_id: id}).exec((err, data) => {
          if(err){
            return res.status(400).json({status: 0, message: err.message});
          }
          if(data === null){
            return res.json({status: 0, message: "Invalid Email ID"});
          } else {
            var adminDetails = {
              id : data._id
            }
            req.admin = adminDetails
            next()
          }
        });

    })
}