const express = require("express")
const path = require("path")
const connectDB = require("./db/db.js")
const userRouter = require("./routes/userRouter.js")
const postRouter = require("./routes/postRouter.js")
const dotenv = require("dotenv")
const morgan = require("morgan")

const app = express()
dotenv.config()
connectDB()
const PORT = process.env.PORT || 8000
if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}

app.use(express.json())
app.use("/api/user",userRouter)
app.use("/api/post",postRouter)

app.use("/uploads",express.static(path.join(__dirname,"/uploads")))
app.listen(PORT, ()=>console.log(`SERVER CONNNECTED ON ${PORT}`))