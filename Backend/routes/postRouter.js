const express = require("express")
const path = require("path")
const route = express.Router()
const Post = require("../models/postModel")
const multer = require("multer")
const auth = require("../middleware/Auth")
const sgMail = require('@sendgrid/mail');

//fetch all posts with search and pagination functionality
route.get("/", async(req,res)=>{
    try {
        const page = Number(req.query.page)
        const limit = 2
        const startIndex = (page-1) * limit       //get the starting index of every page
        
        const keyword = req.query.search
        const regex = new RegExp(keyword,"i")
        /*const keyword = req.query.keyword ? {
            title:{
                $regex: req.query.keyword,
                $options: "i"
            }
        }:{}*/
        const total = await Post.countDocuments({})
        const getpost = await Post.find({title:regex}).limit(limit).skip(startIndex)
        res.json({getpost, page, totalPosts: Math.ceil(total/limit)})
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

//upload file
route.post("/upload",upload.single("image"),(req,res)=>{
    const file = req.file.path.replace(/\\/g,"/" )
    res.send(`/${file}`)
})

//create post
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

//update post
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

//delete post
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

//like post
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



//Contact US Form
route.post("/contactus",async(req,res)=>{
    const {name, email, message} =req.body
    sgMail.setApiKey(process.env.MAIL_KEY);
    const msg= {
    to: email,
    from: "umarchusa@gmail.com", // Use the email address or domain you verified above
    subject: `complain by ${name}`,
    text: "Message from Memory Post",
    html: `<strong>
    ${message}
    </strong>`,
    }
    try {
        await sgMail.send(msg)
    } catch (error) {
        res.status(500).json("server Error")
    }
})

//Passport js Facebook


module.exports = route