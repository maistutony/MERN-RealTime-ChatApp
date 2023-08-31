const express=require('express')
const {login,signup,getusers} =require("../controllers/UsersController");
//const authUser=require("../middlewares/authUser")
const usersRoutes=express.Router()

//middlewares
//usersRoutes.post("/register",registerUser);
usersRoutes.post("/signup", signup);
usersRoutes.post("/login",login);
usersRoutes.get("/users",getusers);
// usersRoutes.get("/users/:id",authUser,getUser);
// usersRoutes.delete("/users/delete",deleteUser);


module.exports=usersRoutes;