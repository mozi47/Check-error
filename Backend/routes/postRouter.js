const express = require("express")
const path = require("path")
const route = express.Router()
const Post = require("../models/postModel")
const multer = require("multer")

//fetch all posts
route.get("/", async(req,res)=>{
    try {
        const getpost = await Post.find()
        res.status(200).json(getpost)
    } catch (error) {
        res.status(404).json({msg:"no post"})
    }
})

//fetch single post
route.get("/single/:id", async(req,res)=>{
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

route.post("/", async(req,res)=>{
    const post = req.body
    try {
        const createpost = new Post(post)
        await createpost.save()    
        res.status(200).json(createpost)
    } catch (error) {
        res.status(404).json({msg:"create post failed"})
    }
})

//new
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
})


/*route.put("/:id",async(req,res)=>{
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
        res.status(404).json({msg:"post update fail"})
    }
})*/


module.exports = route