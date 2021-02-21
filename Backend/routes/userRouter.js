const express = require("express")
const route = express.Router()
//const User = require("../models/userModel")

route.get("/login", async (req,res)=>{
    res.send("Router message")
})

route.post("/register", async (req,res)=>{
    res.send("register")
})

module.exports = route