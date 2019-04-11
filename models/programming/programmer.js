const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../../config/database')

const CoderSchema = mongoose.Schema({
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

const Coder = module.exports = mongoose.model('Coder', CoderSchema)
module.exports.getCoderById = function(id,callback){
    Coder.findById(id, callback)
}
module.exports.getCoderByName = function(name,callback){
    const query = {name : name} 
    Coder.findOne(query, callback)
}

//create user
module.exports.addCoder = function(newCoder, callback){
    bcrypt.genSalt(10,(err, salt)=>{
        bcrypt.hash(newCoder.password, salt, (err, hash)=>{
            if(err) throw err
            newCoder.password = hash
            newCoder.save(callback)
        })
    })
}

//delete user
module.exports.deleteCoder = function (req, res) {
    Coder.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

//update user
module.exports.updateCoder = function (req, res) {
    Coder.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, coder) {
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