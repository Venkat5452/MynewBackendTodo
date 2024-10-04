const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
require("dotenv").config();
const server=express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://Venkat5452:Venkat5452@cluster0.4ti3n.mongodb.net/Mytodo").then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
})

const dataSchema=new mongoose.Schema({
    text:String
})

const Data=new mongoose.model("Data",dataSchema);
server.post("/todos",(req,res)=>{
   const {newTodo}=req.body;
   const text=newTodo;
   const newData=new Data({
    text
   })
   try {
    newData.save().then(res.send(newData));
   }catch(err) {
    res.send("Error");
   }
})

server.delete("/todos/:_id",async(req,res)=>{
    try {
        const todo = await Data.findByIdAndDelete(req.params._id);
    
        if (!todo) {
          return res.status(404).json({ message: 'Todo not found' });
        }
    
        res.status(200).json({ message: 'Todo deleted successfully', todo });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
})

server.get("/todos",async(req,res)=>{
    try {
        const todos = await Data.find();  // Fetch all to-dos from the database
        res.status(200).json(todos);      // Return the list of todos as a JSON response
      } catch (err) {
        res.status(500).json({ message: err.message });
    }
})
server.listen((9009),()=>{
    console.log("Server running in port 9009");
})