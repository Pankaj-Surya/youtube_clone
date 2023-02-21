import express from 'express';
import mongoose from "mongoose"
//import {PORT,MONGO} from  "./config/serverConfig.js"
import dotenv from "dotenv";
import userRoutes from "./routes/users.js"
import commentRoutes from "./routes/comments.js"
import videoRoutes from "./routes/videos.js"
import authRoutes from "./routes/auth.js" 

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

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/videos",videoRoutes)
app.use("/api/comments",commentRoutes)

app.listen(PORT,()=>{
    connect()
    console.log(`connecting to ${process.env.PORT}`)
})



