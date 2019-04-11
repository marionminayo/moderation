const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

const User = require('../../models/math/user')
const config = require('../../config/database')

//Register
router.post('/register', (req, res, next)=>{
    let newUser = User({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    })
    User.addUser(newUser,(err, User)=>{
        if(err){
            res.json({success : false, msg : 'Failed to register user'})
        }else{
            res.json({success : true, msg : 'User registered'})
        }
    })
})

router.get('/profile', passport.authenticate('jwt', {session : false}), (req, res, next)=>{
    res.json({user : req.user})
})

router.post('/authenticate', (req, res, next)=>{
    const name = req.body.name
    const password = req.body.password

    User.getUserByName(name, (err, user)=>{
        if(err) throw err
        if(!user){
            return res.json({success : false, msg : 'User not found'})
        }
        User.comparePassword(password, user.password,(err, isMatch)=>{
            if(err) throw err
            if(isMatch){
                const token = jwt.sign(user.toJSON(), config.secret,{
                    expiresIn : 31556926// an year
                })
                res.json({
                    success : true,
                    token : 'jwt ' +token,
                    user : {
                        id : user._id,
                        name : user.name,
                        email : user.email
                    }
                })
            }else{
                return res.json({success : false, msg : 'Wrong password'})
            }
        })
    })
})

//update route
router.put('/update/:id', User.updateUser)

//delete route
router.delete('/delete/:id', User.deleteUser);

module.exports = router