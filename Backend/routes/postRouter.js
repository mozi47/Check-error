const express = require("express")
const path = require("path")
const route = express.Router()
const Post = require("../models/postModel")
const multer = require("multer")

route.get("/", async(req,res)=>{
    try {
        const getpost = await Post.find()
        res.status(200).json(getpost)
    } catch (error) {
        res.status(404).json({msg:"no post"})
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
        const filetype = /jpg|png|jpeg/
        const extname = filetype.test(path.extname(file.originalname).toLowerCase())
        const mimetype = filetype.test(file.mimetype)
        if(extname && mimetype){
            return cb(null, true)
         }else{
             cb("image only!")
         }
    },
})

route.post("/upload",upload.single("image"),async(req,res)=>{
    res.send(`/${req.file.path}`)
})

route.post("/",async(req,res)=>{
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
route.put("/:id",async(req,res)=>{
    const post = req.body
    const {id:_id} = req.params.id
    try {
        if(!mongoose.Types.ObjectId().isvalid(_id)){
            res.status(404).send("invalid post id")
        }
        const updatepost = await Post.findByIdAndUpdate(_id, post,{new:true}) 
    } catch (error) {
        res.status(404).json({msg:"post update fail"})
    }
})

/*
route.put("/:id",async(req,res)=>{
    const post = req.body
    const {id:_id} = req.params.id
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
})
*/

module.exports = route