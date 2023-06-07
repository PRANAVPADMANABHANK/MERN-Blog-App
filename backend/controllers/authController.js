const authController = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


authController.post('/register', async (req,res)=>{
    try {
        const isExisting = await User.findOne({email: req.body.email})
        if(isExisting){
            throw new Error("Already such an account. Try a different email")
        }

        const hashPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = await User.create({...req.body, password:hashPassword})
        const {password, ...others} = newUser._doc
        const token = jwt.sign({id: newUser._id},process.env.JWT_SECRET,{expiresIn: '5h'})
        return res.status(201).json({user:others, token})

    } catch (error) {
        return res.status(500).json(error)
    }
})