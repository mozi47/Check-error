const jwt = require("jsonwebtoken")

const Auth = async (req,res,next)=>{
    //if(req,headers)
    try {
        const token = req.headers.authorization.split(" ")[1]
        const jwttoken = token.length < 500
        if(!token){
            return res.status(404).json({msg:"no token authorization"})
        }
        let decodeData
        if(jwttoken){
            decodeData = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = decodeData.user.id
        }else{
            decodeData = jwt.decode(token)
            req.userId = decodeData.sub
        }
        next()
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}

module.exports = Auth