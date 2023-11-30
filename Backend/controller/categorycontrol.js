import categorymodel from "../models/categorymodel.js";
import slugify from 'slugify';
export const Categorycontrol= async(req,res)=>{
try{
const {name}=req.body
if(!name){
    return res.status(401).send({message: "name is require"})
}
const existingCategory = await categorymodel.findOne({name})
if (existingCategory) {
  return res.status(200).send({
    success: true,
    message: "Category Already Exisits",
  });
}
const category = await new categorymodel({name,slug: slugify(name)}).save();
  res.status(201).send({
    success: true,
    message: "new category created",
    category,
  });
  

}catch(error){
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting category",
      error,
    });
   
}
}

//update catagorycontrol
export const updatecatagorycontrol= async(req,res)=>{
    try{
        const {name}=req.body
        const {id}=req.params
    const category=await categorymodel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
res.status(200).send({
    success:true,
    message:"category updated",
    category
})

 }catch(error){
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "error while Updatin category"
        
        });

    }
}
//get all categorry
export const categorycontrolerr= async(req,res)=>{
try{

const categorry=await categorymodel.find({})
res.status(200).send({
    success:true,
    message: "all category List",
    categorry,
})

}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message: "error while getting all category"
    })
}
} 

//single category
export const singlecatagory=async(req,res)=>{
try{

const categorry=await categorymodel.findOne({slug:req.params.slug})
res.status(200).send({
    success:true,
    message: " get single category -succesfully ",
    categorry
})

}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message: "error while signle category getting"
    })
}
}

//deletecategory
export const deletecategory=async(req,res)=>{
    try{
        const {id}=req.params
        const categorry=await categorymodel.findByIdAndDelete(id)
res.status(200).send({
    success:true,
   categorry,
    message:" category deleted Succes fully"
})

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"while getting error catagory deleting"
        })
    }
}