import User from "../model/userSchema.js";
import express from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import verifyToken from "../middleware/verifyToken.js"
const router = express.Router();



router.post("/signup" , async (req,res) =>{ 
    const {email,password,username} = req.body;
    if(!email || !password || !username){
        return res.status(400).json({message:"Please fill all the fields"})
    }
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            password:hashedPassword,
            username,
            
        });
        await user.save();
        res.status(201).json({message:"User created successfully"})
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"})
    }
})


router.post("/login" , async (req,res) =>{ 
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:"Please fill all the fields"})
    } 
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
        res.status(200).json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"})
    }
})

router.post("/verify-token",verifyToken, async (req,res) =>{
    res.status(200).json({message:"Token is valid" , user:req.user})
})

router.post("/materials/save",verifyToken, async (req,res) =>{
    const {subject,content,summary,study_guide} = req.body;
    if(!subject || !content || !summary || !study_guide){
        return res.status(400).json({message:"Please fill all the fields"})
    }
    try{
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        user.material.push({
            subName : subject,
            content,
            summary,
            study_guide
        })
        await user.save();
        res.status(200).json({message:"Materials saved successfully"})
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"})
    }
})

router.post("/get/materials",verifyToken, async (req,res) =>{
    try{
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        const materials = user.material.map((material) => {
            return {
                id: material._id,
                subName: material.subName,
                content: material.content,
                summary: material.summary,
                study_guide: material.study_guide,
                addedAt:material.addedAt,
            }
        })
        res.status(200).json(materials)
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Server error"})
    }
})
    

export default router;
