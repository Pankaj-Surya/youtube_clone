import express from 'express';
import mongoose from "mongoose"
//import {PORT,MONGO} from  "./config/serverConfig.js"
import dotenv from "dotenv";
import userRoutes from "./routes/users.js"

dotenv.config()

const app = express();

//console.log(PORT,MONGO)

const PORT = process.env.PORT

const connect = ( )=>{
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("Connected to DB")
    }).catch((err)=>{
        console.log(err)
    })
}

app.use("/api/users",userRoutes)

app.listen(PORT,()=>{
    connect()
    console.log(`connecting to ${process.env.PORT}`)
})



