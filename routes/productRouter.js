import express from 'express';
import expressAsyncHandler from "express-async-handler"

import Product from '../models/products.js';
import { isAuth } from '../middleware/authMiddleware.js';

const productRouter = express.Router();

// @desc  Get seed db
// @route get /api/seeder
// @access Public
productRouter.get("/",(async(req,res)=> {                                                                                                  
        try {
                await Product.deleteMany(); // Clear existing data
                await Product.insertMany([]); // Insert new data
                console.log('Database seeded successfully');
                
                res.send({ message: 'Database seeded successfully' });
        } 
        catch (error) {
                console.error('Error seeding database:', error);
                
                res.status(404).send({ message: error });
        } 
}))

// @desc  get clear db
// @route get /api/seeder/clear
// @access Public
productRouter.get("/clear",(async(req,res)=> {                                                                                                  
        try {
                await Product.deleteMany(); // Clear existing data
                console.log('Database cleared');
                
                res.send({ message: 'Database cleared' });
        } 
        catch (error) {
                console.error('Error clearing database:', error);
                
                res.status(404).send({ message: error });
        }  
}))


// @desc  update any user
// @route put /users/updateuser/:id
// @access private/ admin
productRouter.put('/update/:id',isAuth,expressAsyncHandler(async(req,res)=>{
        const {id}= req.params
        const {firstName,lastName,email,phone,avater,isAdmin}= req.body
        let name = String(firstName + " " + lastName)

        const user= await User.findById(id) 

        if (user){
                user.name=name || user.name                             //if nothing comes from client put what was there b4 back
                user.isAdmin = req.body.isAdmin  
                user.email=email || user.email
                user.phone=phone || user.phone
                user.avater=avater || user.avater
                
                const updatedUser=await user.save()

                res.send({
                        _id:updatedUser._id,
                        name:updatedUser.name,
                        email:updatedUser.email,
                        phone:updatedUser.phone,
                        isAdmin:updatedUser.isAdmin,
                        avater:updatedUser.avater,
                    });
        }
        else{
                res.status(404)
                throw new Error("User not Found")
        }
        
       

}));


export default productRouter;