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
    } catch (error) {
        return res.status(500).json(error)
    }
})