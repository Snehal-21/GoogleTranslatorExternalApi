import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import router from "./routes/googleroutes.js";

const app=express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1',router);

mongoose.connect('mongodb+srv://Snehal:Snehal1234@mern-todo.va7rcii.mongodb.net/googleDb?retryWrites=true&w=majority')
.then(()=>console.log("Db connected"))
.catch((err)=>console.log(err,"db error"))
app.listen(7000);