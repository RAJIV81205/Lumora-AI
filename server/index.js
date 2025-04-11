import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import connectDB from "./config/db.js";


const app =express();
app.use(express.json());
dotenv.config();
app.use(cors(
    {
        origin: ["http://localhost:5173","frontend"],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
        preflightContinue: false,
    }
))

const PORT = process.env.PORT
connectDB();



app.listen(PORT , ()=>{
    console.log("Server is running on PORT:", PORT);

})