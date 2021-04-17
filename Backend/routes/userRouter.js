const express = require("express")
const route = express.Router()
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//Login User
route.post("/signin", async (req,res)=>{
    const {
        email,
        password
    } = req.body

    try {
        const login = await User.findOne({email})
    if(!login)
        return res.status(404).json({msg:"email not exist"})

    const passwordCheck = await bcrypt.compare(password, login.password);
    
    if(!passwordCheck)
        return res.status(404).json({msg:"invalid password"})
    const payload = {
        user:{
            id:login._id,
            email: login.email
        } 
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET,)
    res.json({result:login, token})
    } catch (error) {
        res.status(500).json("server error")
    }
})

//Register User
route.post("/signup", async (req,res)=>{
    const {email, password,confirmPassword, firstName, lastName } = req.body
    console.log(email)
    try {
        const signup = await User.findOne({ email})
        if(signup)
            return res.status(404).json("email already register")
        
        if(password !== confirmPassword){
            return res.status(404).json("password not matched")
        }
        const salt = await bcrypt.genSalt(8)
        const hashPassword = await bcrypt.hash(password,salt)

        signup = new User({
            name: `${firstName} ${lastName}`,
            password: hashPassword,
            email
        })

        await signup.save()
        /*await signup.create({
            name: `${firstName} ${lastName}`,
            password: hashPassword,
            email
        })*/
        const payload = {
            user:{
                id:signup._id,
                email: signup.email
            } 
        }
    
         const token = jwt.sign(payload, process.env.JWT_SECRET)
         res.json({result:signup, token})  
    } catch (error) {
        console.error(error)
    }
})

module.exports = route