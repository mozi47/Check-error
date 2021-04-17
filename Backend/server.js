const express = require("express")
const path = require("path")
const connectDB = require("./db/db.js")
const userRouter = require("./routes/userRouter.js")
const postRouter = require("./routes/postRouter.js")
const dotenv = require("dotenv")
const morgan = require("morgan")
const cookieSession = require('cookie-session')
const passport = require("passport")
const cors = require('cors')
require("./routes/passport.js")

const app = express()
dotenv.config()
connectDB()
const PORT = process.env.PORT || 8000

app.use(morgan("dev"))
app.use(express.json())

app.use(cors({
  origin: "https://localhost:3000"
}))

app.use(cookieSession({
  name: 'session',
  keys: process.env.JWT_SECRET,
}))
app.use(passport.initialize())
app.use(passport.session())

app.use("/api/user",userRouter)
app.use("/api/post",postRouter)

app.use("/uploads",express.static(path.join(__dirname,"../uploads")))

app.listen(PORT, ()=>console.log(`SERVER CONNNECTED ON ${PORT}`))