const mongoose = require("mongoose")
//const schema = mongoose.schema
const postSchema =  mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags:[String],
    selectedFile: String,
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