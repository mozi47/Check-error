const mongoose = require("mongoose")
//const schema = mongoose.schema
const postSchema =  mongoose.Schema({
    title: {type:String, required:true},
    message: {type:String,required:true},
    creator: {type:String,required:true},
    tags:[String],
    selectedFile: {type:String,required:true},
    likeCount:{
        type: Number,
        default:0 
    },
    createdAt:{
        type: Date,
        default: new Date
    }   
})

 const User = mongoose.model("post", postSchema)

 module.exports = User