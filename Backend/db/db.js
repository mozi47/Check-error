const mongoose = require("mongoose")

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGOURI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })    

        console.log(`DATABASE CONNECTED: ${mongoose.connection.host}`)

    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = connectDB