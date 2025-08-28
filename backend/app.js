import express from "express"
import dotenv from "dotenv"
import ErrorHandler from "./utils/ErrorHandler.js"
import cookieParser from "cookie-parser"
import userController from "./controller/userController.js"
import cors from "cors"
const app =express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/" , express.static("uploads"))
app.use(cors())

if(process.env.NODE_ENV !== "PRODUCTION"){
    dotenv.config({
        path:"backend/config/.env"
    })
}

app.use("/api/v2/user" ,userController )

app.use(ErrorHandler)

export default app