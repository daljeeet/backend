const jwt = require("jsonwebtoken")
require("dotenv").config()
const crudAuth = async(req,res,next)=>{
    try{
        let token = req.headers.authorization.split(' ')[1]
        let authId=jwt.decode(token,process.env.key).id
        if(authId){
            req.body={...req.body,author:authId}
            next()
        }else{
            res.status(400).send({"msg":"authencation required"})
        }
    }catch(err){
        res.send({"msg":"something went wrong"})
    }
} 
module.exports = crudAuth;