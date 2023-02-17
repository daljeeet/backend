const express = require("express")
const { connect } = require("mongoose")
const mongoose = require("mongoose")
const todoRoutes = require("./routes/todo.routes")
const userRoutes = require("./routes/user.routes")
mongoose.set('strictQuery', true)
const cors = require("cors")
const crudAuth = require("./middleware/todo.middle")
require("dotenv").config()
const app = express()
app.use(express.json())
app.use(cors())

//===============Routes===================
app.use("/user",userRoutes)
app.use("/todos",crudAuth)
app.use("/todos",todoRoutes)

//=======================Starting the app=============================

app.listen(process.env.port,async()=>{
    try{
        connect(process.env.mongoUrl)
        console.log("connected to the database")
    }catch(err){
        console.log("connection to the database failed")
    }
    console.log("server is started in port",process.env.port)
})