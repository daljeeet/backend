const express = require("express")
const todoRoutes = express.Router()
const Todo = require("../model/todo.modal")


todoRoutes.post("/",async(req,res)=>{
    try{
        let newTodo= new Todo(req.body);
        await newTodo.save()
        res.status(200).send("Todo has been added successfuly")
    }catch(err){
        res.status(400).send({"msg":"Something went wrong"})
    }
})
todoRoutes.get('/',async(req,res)=>{
    try{
        let allTodos = await Todo.find({author:req.body.author});
        res.send(allTodos)
    }catch(err){
        res.status(400).send({"msg":"something went wrong"})
    }
})

todoRoutes.patch("/:_id",async(req,res)=>{
    try{
        await Todo.findByIdAndUpdate(req.params,req.body)
        res.send({"msg":"updated Successfully"})
    }catch(err){
        res.status(400).send({"err":err})
    }

})

todoRoutes.delete("/:_id",async(req,res)=>{
    try{
        await Todo.findByIdAndDelete(req.params)
        res.send({"msg":"Deleted Successfully"})
    }catch(err){
        res.status(400).send({'msg':"something went wrong"})
    }
})

module.exports = todoRoutes