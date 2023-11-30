import JWT from "jsonwebtoken";
import Usermodel from "../models/Usermodel.js";
//protected Route token base
export const requireSignIn= async(req,res,next)=>{
    try {
        const decode= JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user= decode;
        next()
    }
catch(error){
console.log(error);

}
}
//Admin acces
export const isAdmin=async (req,res,next)=>{
try{
const user=await Usermodel.findById(req.user._id)
if(user.role!=1){
    return res.status(401).send({
        success:false,
        message:"un uthorised Acess"
    })
}else{
    next()
}

}
catch(error){
    console.log(error);
    res.status(401).send({
    success:false,
    error,
    message:"error in admin middle ware"
    })
}
}