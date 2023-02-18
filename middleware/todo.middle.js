const jwt = require("jsonwebtoken")

const crudAuth = async(req,res,next)=>{
    let token = req.headers.authorization
    let authId=jwt.decode(token,process.env.key).id
    if(authId){
        req.body={...req.body,author:authId}
        next()
    }else{
        res.status(400).send({"msg":"authencation required"})
    }
}
module.exports = crudAuth;