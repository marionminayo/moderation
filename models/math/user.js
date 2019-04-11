const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../../config/database')

const UserSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

const User = module.exports = mongoose.model('User', UserSchema)
module.exports.getUserById = function(id,callback){
    User.findById(id, callback)
}
module.exports.getUserByName = function(name,callback){
    const query = {name : name} 
    User.findOne(query, callback)
}

//create user
module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10,(err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err) throw err
            newUser.password = hash
            newUser.save(callback)
        })
    })
}

//delete user
module.exports.deleteUser = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

//update user
module.exports.updateUser = function (req, res) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
        if (err) return next(err);
        res.send('User udpated.');
    });
};

module.exports.comparePassword = function(inputPassword, hash, callback){
    bcrypt.compare(inputPassword, hash, (err, isMatch)=>{
        if(err) throw err
        callback(null, isMatch)
    })
}