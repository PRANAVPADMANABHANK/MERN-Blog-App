const blogController = require("express").Router()
const Blog = require("../models/Blog")
const verifyToken = require('../middlewares/verifyToken')

blogController.get('/getAll', async(req, res)=>{
    try {
        const blogs = await Blog.find({}).populate("userId", "-password")
        return res.status(500).json(blogs)
    } catch (error) {
        return res.status(500).json(error)
    }
})


blogController.post('/',verifyToken, async(req,res)=>{
    try {
        const blog = await Blog.create({...req.body, userId : req.user.id})
        return res.status(200).json(blog)
    } catch (error) {
        return res.status(500).json(error)
    }
})


module.exports = blogController