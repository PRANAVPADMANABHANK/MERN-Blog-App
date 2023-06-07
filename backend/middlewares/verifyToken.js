const jwt = require('jsonwebtoken')


const verifyToken = (req,res,next)=>{
    if(!req.headers.authorization) return res.status(403).json({msg:"Not autorized. No token"})

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        const token = req.headers.authorization.split(" ")[1]
        console.log(token)
        jwt.verify(token, process.env.JWT_SECRET, (err, data)=>{
            if(err) return res.status(403).json({msg: "Wrong or expired token"})
            else{
                req.user = data //an object with the user id as its only property
                next()
            }
        })
    }
}

module.exports = verifyToken;