import express from "express"
import User from "../model/userModel.js"
import ErrorHandler from "../utils/ErrorHandler.js"
import fs from "fs"
import { upload } from "../multer.js"
import catchAsync from "../middleware/catchAsyncError.js"

const router = express.Router()

router.post("/create-user", upload.single("file"), catchAsync(async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        
        console.log("Received data:", { name, email, password: "***", file: req.file?.filename });
        
        const userEmail = await User.findOne({ email })
        if (userEmail) {
            const filename = req.file.filename
            const filePath= `uploads/${filename}`
            fs.unlink(filePath ,(err)=>{
                if(err){
                    console.log(err);
                    res.status(500).json({message:"Error Deleteing file"})
                }else{
                    res.json({message : "File deleted "})
                }
            })
            return next(new ErrorHandler("User already exists", 400))
        }

        if (!req.file) {
            return next(new ErrorHandler("Please upload an avatar image", 400))
        }

        const filename = req.file.filename
        const fileUrl = `/${filename}` 
        
        console.log("Creating user with avatar:", { filename, fileUrl });
        
        const user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: filename,
                url: fileUrl
            }
        })

        console.log("User created successfully:", user._id);

        const token = user.getJwtToken()

        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
            createdAt: user.createdAt
        }

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: userResponse,
            token
        })
        
    } catch (error) {
        console.error("User creation error:", error);
        
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return next(new ErrorHandler(messages.join('. '), 400));
        }
        
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return next(new ErrorHandler(`${field} already exists`, 400));
        }
        
        return next(new ErrorHandler(error.message || "User creation failed", 500));
    }
}))

export default router