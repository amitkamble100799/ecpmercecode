import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import Usermodel from "../models/Usermodel.js";
import orderModel from "../models/orderModel.js";
import  JWT  from  "jsonwebtoken";

export const registerController= async (req,res)=>{
    try{
const {name,email,password,phone,address,answer}=req.body;
if(!name){
    return res.send({message:" name is Required"})
}
if(!email){
    return res.send({message:"E-mail is Required"})
}
if(!password){
    return res.send({message:" password is Required"})
}
if(!phone){
    return res.send({message:" phone is Required"})
}
if(!address){
    return res.send({message:"addressis Required"})
}
if(!answer){
  return res.send({message:"answer Required"})
}

//user Checking
const existingUser=await Usermodel.findOne({email})

// existing user check
if(existingUser){
return res.status(200).send({
    success:false,
    messge:"Already register please login"
})
}
//user Register
const hashedPassword=await hashPassword(password)
//save
const user = await new Usermodel({name,email,phone,address,password:hashedPassword,answer}).save()
res.status(201).send({
    success:true,
    message:"user Succefully Registered ",
    user
})
}
    catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        messge:"error in registration"
    })
    }
}


//login controler
export const loginController=async(req,res)=>{
    try{
    const {email,password} = req.body
    //validation
    if (!email || !password) {
        return res.status(404).send({
          success: false,
          message: "Invalid email or password",
        });
      }
      //Check user
      const user=await Usermodel.findOne({email});
      if(!user){
        return res.status(404).send({
            success: false,
            message: "email Not Registered",
        })
      }
      const match=await comparePassword(password,user.password)
      if (!match) {
        return res.status(200).send({
          success: false,
          message: "Invalid Password",
        });
      }
      //token creting
      const token= await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
    res.status(201).send({
    success: true,
          message: "Login Succesfully",
          user:{
            name:user.name,
            email:user.email,
            phone:user.phone,
            address:user.address,
            role:user.role
          },
          token

     })
    }
    catch(error){
console.log(error)
res.status(500).send({
    success:false,
    message:"error in login",
  error
})
}

}


//Forgot password 
export const Forgotpasswordcontrol= async (req,res)=>{
try{
 const {email,answer,newpassword}=req.body;
 if(!email){
  res.status(400).send({message:"Email is Required"})
 }
 if(!answer){
  res.status(400).send({message:"answer is Required"})
 }
 if(!newpassword){
  res.status(400).send({message:"newpassword is Required"})
 }
 //check
 const user=await Usermodel.findOne({email,answer})
if(!user){
  return res.status(404).send({
    success:false,
    message:"wrong Email or answer"
  })
}
const hashed=await hashPassword(newpassword)
await Usermodel.findByIdAndUpdate(user._id,{password:hashed})
res.status(200).send({
  success:true,
  message:"password reset Succes fully",
})

}
catch(error){
  console.log(error)
  res.status(500).send({
    success:true,
    message:"Something Went Wrong",
    error
  })
}
}

//test controler
export const testController=(req,res)=>{
    try {
        res.send("Protected Routes");
      } catch (error) {
        console.log(error);
        res.send({ error });
      }
}

//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await Usermodel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await Usermodel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel.find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    res.status(500).send({ success: false,message: "Error WHile Geting Orders",
      error,
    });
  }
};
//orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel.find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};

