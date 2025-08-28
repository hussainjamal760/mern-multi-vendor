import express from "express"
import dotenv from "dotenv"
import ErrorHandler from "./utils/ErrorHandler.js"
import cookieParser from "cookie-parser"
const app =express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

if(process.env.NODE_ENV !== "PRODUCTION"){
    dotenv.config({
        path:"backend/config/.env"
    })
}

app.use(ErrorHandler)

export default app