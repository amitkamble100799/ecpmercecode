import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMidleware.js";
import { brainTreePaymentController, braintreeTokenController, createProductControler, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountControler, productFilterController, productListControler, productPhotoController, realtedProductController, searchProductController, updateProductControler } from "../controller/ProductControler.js";
import formidable from "express-formidable";

const router=express.Router()
//create product
router.post("/create-product",requireSignIn,isAdmin,formidable(),createProductControler)

//update-product
router.put("/update-product/:pid",requireSignIn,isAdmin,formidable(),updateProductControler)

//get all product
router.get("/get-product", getProductController)

//get single product
router.get("/get-product/:slug", getSingleProductController)

//get photo
router.get("/product-photo/:pid", productPhotoController);

//deleteProductController
router.delete("/delete-product/:pid", deleteProductController);

//filterproduct
router.post("/product-filters", productFilterController)
//product count
router.get("/product-count",productCountControler)

//product per page
router.get("/product-list/:page",productListControler)

//search product
router.get("/search/:keyword",searchProductController)
//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;