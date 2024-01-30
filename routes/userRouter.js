import express from 'express';
import User from '../models/users.js';
import expressAsyncHandler from "express-async-handler"
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils.js';
 

const userRouter = express.Router();

// @desc  Post login user
// @route get /api/user/login
// @access Public
userRouter.post("/login",expressAsyncHandler(async(req,res)=> {                                                                                                  
        let {username,password} =req.body
        username=String(username).toLowerCase()
        password=String(password)

        const user= await User.findOne({username})

        if(user){
            if(bcrypt.compareSync( password, user.password )){
                res.send({
                    _id:user._id,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    username: user.username,
                    token: generateToken(user._id) 
                });
                return;
            }
        }
        res.status(401)
        throw new Error("Invalid Email/Password")

}))

// @desc  Create new user Auth  && get token
// @route post /users/register
// @access Public
userRouter.post('/register',expressAsyncHandler(async(req,res)=>{
        const {firstName,lastName,password,username}= req.body
        
        const userExists= await User.findOne({username})
        
        if (userExists){
                res.status(400)
                throw new Error("User Already Exist")
        }
        else {
                const user= new User({firstName:String(firstName), lastName:String(lastName),username:String(username).toLowerCase(), password:bcrypt.hashSync(String(password),10)})

                if(user){
                        const createdUser= await user.save();
                        res.send({
                                _id:createdUser._id,
                                firstName:createdUser.firstName,
                                lastName:createdUser.lastName,
                                username:createdUser.username,
                                token: generateToken(createdUser._id)
                        })
                }
                else{
                        res.status(400)
                        throw new Error("Registration Error")
                }
        }
}))

export default userRouter;