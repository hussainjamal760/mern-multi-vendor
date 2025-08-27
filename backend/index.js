import dotenv from "dotenv"
import app from './app.js'
import { connectDatabase } from "./db/database.js";

if(process.env.NODE_ENV !== "PRODUCTION"){
    dotenv.config({
        path:"backend/config/.env"
    })
}

process.on("uncaughtException" , (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server for handling exception`);
})


connectDatabase()

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT , ()=>{
    console.log(`Server is running at localhost ${PORT}`)
})

process.on("unhandledRejection" , (err)=>{
    console.log(`Shutting Down the server for: ${err.message}`);
    console.log(`Shutting down the unhandled promise rejection`);

    server.close(()=>{
        process.exit(1)
    })
})