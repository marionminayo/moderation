const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

const Coder = require('../../models/programming/programmer')
const config = require('../../config/database')

//Register
router.post('/register', (req, res, next)=>{
    let newCoder = Coder({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    })
    Coder.addCoder(newCoder,(err, coder)=>{
        if(err){
            res.json({success : false, msg : 'Failed to register Coder'})
        }else{
            res.json({success : true, msg : 'Coder registered'})
        }
    })
})

router.get('/profile', passport.authenticate('jwt', {session : false}), (req, res, next)=>{
    res.json({user : req.user})
})

router.post('/authenticate', (req, res, next)=>{
    const name = req.body.name
    const password = req.body.password

    Coder.getCoderByName(name, (err, user)=>{
        if(err) throw err
        if(!user){
            return res.json({success : false, msg : 'Coder not found'})
        }
        Coder.comparePassword(password, user.password,(err, isMatch)=>{
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
router.put('/update/:id', Coder.updateCoder)

//delete route
router.delete('/delete/:id', Coder.deleteCoder);

module.exports = router