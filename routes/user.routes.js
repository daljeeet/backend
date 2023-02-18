const express= require("express")
const userRoutes = express.Router()
const User = require("../model/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



userRoutes.post("/register",async(req,res)=>{
    let EmailExist = await User.find({email:req.body.email});
    let usernameExist = await User.find({username:req.body.username})
    if(EmailExist.length===0&&usernameExist.length===0){
    const {password} = req.body;
         bcrypt.hash(password,4,async(err,hash)=>{
                if(err)throw err
                let body = {...req.body,password:hash}
                    let newUser = new User(body);
                    await newUser.save()
                    res.send({"msg":"User Registred Successfully..."})
            })
        }else{
            res.status(400).send({"msg":"Username or Email already exists","data":usernameExist})
        }
})

userRoutes.post("/login",async(req,res)=>{
    try{
    const {password} = req.body;
    let UserExists = await User.find({email:req.body.email});
    if(UserExists.length>0){
      const result = bcrypt.compare(password,UserExists[0].password)
      if(result){
       let token = jwt.sign({id:UserExists[0]._id},process.env.key)
       res.send({"msg":"Login Success","access_token":token})
      }else{
        res.status(500).send({"msg:":"internal server error"})
      }
    }else{
        res.status(400).send({"msg":"user Login failed"})
    }
}catch(err){
    res.status(400).send({'msg':"user Login Failed",err})
}
})

module.exports = userRoutes