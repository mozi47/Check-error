const mongoose = require("mongoose")
//const schema = mongoose.schema
const postSchema =  mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    title: {type:String, required:true},
    message: {type:String,required:true},
    creator: {type:String,required:true},
    tags:[String],
    selectedFile: {type:String,required:true},
    likeCount:[{
        type:[String],
        default: []
    }],
    createdAt:{
        type: Date,
        default: new Date
    }   
})

 const Post = mongoose.model("post", postSchema)

 module.exports = Post