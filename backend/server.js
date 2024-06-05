import dotenv from "dotenv";
dotenv.config({
    path: './.env'
})
import express from "express";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./db/connectToMongoDB.js";

import {app, server} from "./socket/socket.js"

app.use(express.json()); 
app.use(cookieParser());

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);




connectToMongoDB()
.then(() => {
    server.listen(process.env.PORT || 9000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
