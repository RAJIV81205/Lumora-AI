import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import router from "./routes/user-routes.js";


const app = express();
app.use(express.json());
dotenv.config();
app.use(cors({
    origin: ["http://localhost:5173" , "https://lumora-ai.vercel.app/"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    preflightContinue: false,
}));

const PORT = process.env.PORT || 5000;
connectDB();

app.use("/api", router);


app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
});