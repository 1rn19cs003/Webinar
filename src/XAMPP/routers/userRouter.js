const express=require("express")
const userController=require("../controller/userController");
const router=express.Router();

router.get("/login",userController.login);

module.exports=router;