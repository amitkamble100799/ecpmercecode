import express from 'express'
import {registerController,loginController,testController,Forgotpasswordcontrol, updateProfileController, getAllOrdersController, getOrdersController, orderStatusController} from '../controller/authController.js'
import { requireSignIn,isAdmin } from '../middleware/authMidleware.js';
const router=express.Router();

//register
router.post('/register',registerController)
//login
router.post('/login',loginController)
//Forgot Password
router.post('/forgotpassword',Forgotpasswordcontrol)

//test
router.get('/test',requireSignIn,isAdmin,testController)


//protected User rout auth
router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})

//protected Admin rout auth
router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put("/order-status/:orderId",requireSignIn,isAdmin, orderStatusController);

export default router;