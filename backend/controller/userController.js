import express from "express"
import User from "../model/userModel.js"
import ErrorHandler from "../utils/ErrorHandler.js"
import path from "path"
import { upload } from "../multer.js"

const router = express.Router()

router.post("/create-user" , upload.single("file") , async (req , res , next)=>{
    const {name , email , password} = req.body
    const userEmail = await User.findOne({email})

    if(userEmail) return next(new ErrorHandler("User already exists" , 400))

    const filename = req.file.filename
    const fileUrl  = path.join(filename)
    const user = {
        name,
        email,
        password,
        avatar : fileUrl
    }
})

export default router