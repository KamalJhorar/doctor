
import jwt from 'jsonwebtoken'

// admin authentication middleware

const authuser= async(req,res,next)=>{
      try{
        
        const {token}=req.headers
        
        if(!token){
            return res.json({success:false,message:"LOGIN AGAIN"})
        
        }
        const token_decode= jwt.verify(token,process.env.JWT_SECRET)
        
       req.user= token_decode.id
        
      next()
      }
      catch(error){
          console.log(error)
      res.json({success:false, message:error.message})
      }
}

export default authuser