import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import userController from "./controller/userController.js"
import cors from "cors"
import errorMiddleware from "./middleware/error.js" 

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/", express.static("uploads"))
app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true
}))

if(process.env.NODE_ENV !== "PRODUCTION"){
    dotenv.config({
        path: "backend/config/.env"
    })
}

app.use("/api/v2/user", userController)

app.use(errorMiddleware)

export default app