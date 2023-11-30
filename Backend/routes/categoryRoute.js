import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMidleware.js";
import { Categorycontrol, categorycontrolerr, deletecategory, singlecatagory, updatecatagorycontrol } from "../controller/categorycontrol.js";
 
const router=express.Router()

//create-category
router.post('/create-category',requireSignIn,isAdmin,Categorycontrol)


//update Category
router.put('/update-category/:id',requireSignIn,isAdmin,updatecatagorycontrol)
//geyt all category
router.get('/get-category',categorycontrolerr)

//single category
router.get('/single-category/:slug',singlecatagory)

//delete category
router.delete('/delete-category/:id',requireSignIn,isAdmin,deletecategory)
export default router;

