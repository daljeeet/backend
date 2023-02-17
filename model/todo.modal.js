const mongoose = require("mongoose")
const todoSchema = mongoose.Schema({
    title:{type:String,required:true},
    todo:{type:String,required:true},
    author:{type:String,required:true},
})

const Todo = mongoose.model("toto",todoSchema)

module.exports=Todo