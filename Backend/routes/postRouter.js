const express = require("express")
const path = require("path")
const route = express.Router()
const Post = require("../models/postModel")
const multer = require("multer")
const auth = require("../middleware/Auth")

//fetch all posts
route.get("/", async(req,res)=>{
    try {
        const getpost = await Post.find()
        res.status(200).json(getpost)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

//fetch single post
route.get("/single/:id",auth, async(req,res)=>{
    try {
        const getpost = await Post.findById(req.params.id)
        if(!getpost){
            return res.status(404).json({msg: "post not found"})
        }
        res.status(200).json(getpost)
    } catch (error) {
        res.status(401).json({msg:"single fetching post error"})
    }
})

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,"uploads/")
    },
    filename(req,file,cb){
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage,
    filefilter: function(req,file,cb) {
        const filetypes = /jpg|jpeg|png/
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
        const mimetype = filetypes.test(file.mimetype)
        if(extname && mimetype){
            return cb(null, true)
         }else{
             cb(null,false)
         }
    },
})

route.post("/upload",upload.single("image"),(req,res)=>{
    const file = req.file.path.replace(/\\/g,"/" )
    res.send(`/${file}`)
})

route.post("/",auth, async(req,res)=>{
    const post = req.body
    //console.log(req.file)
    try {
        const createpost = new Post({
            tags:post.tags,
            creator:post.creator,
            title: post.title,
            message: post.message,
            selectedFile: post.selectedFile,
            user:req.userId
        })
        await createpost.save()    
        res.json(createpost)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

/*
route.patch("/:id",async(req,res)=>{
    const post = req.body
    const {id:_id} = req.params.id
    
    try {
        if(!mongoose.Types.ObjectId().isvalid(_id)){
            return res.status(404).send("invalid post id")
        }
        const updatepost = await Post.findByIdAndUpdate(_id, post,{new:true}) 
        res.json(updated) 
    } catch (error) {
        res.status(404).json({msg:"post update fail"})
    }
})*/


route.put("/:id",auth,async(req,res)=>{
    const post = req.body
    const _id = req.params.id
    try {
        const updatepost = await Post.findById(_id)
        if(!updatepost){
            res.status(404).send("invalid post id")
        }else{
            updatepost.creator = post.creator,
            updatepost.title = post.title,
            updatepost.message = post.message,
            updatepost.tags = post.tags
            
            const updated = await updatepost.save()
            res.json(updated) 
        }
          
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

route.delete("/single/:id/delete",auth, async(req, res)=>{
    try{
    const deletepost = await Post.findById(req.params.id)
    if(!deletepost){
        return res.status(404).send("invalid post id")
    }
    await Post.remove(deletepost)
    res.json("Post Deleted")
    }catch(error){
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

route.put("/single/:id/like",auth, async(req, res)=>{
    try {
        if(!req.userId) return res.status(400).json("unauthenticated")

        const likepost = await Post.findById(req.params.id)
        if(!likepost){
            return res.status(404).send("invalid post id")
        }
        const index = likepost.likeCount.findIndex((id) => id === String(req.userId));
        if (index === -1) {
            likepost.likeCount.push(req.userId);
        } else {
            likepost.likeCount = likepost.likeCount.filter((id) => id !== String(req.userId));
        }
        const updatelike = await likepost.save()
        res.json(updatelike) 
    } catch (error) {
        console.error(error);
        res.status(500).send("Like, Server Error");
    }
})

//Search functionality
//Contact US Form
//Forgot password
//Passport js Facebook


module.exports = route