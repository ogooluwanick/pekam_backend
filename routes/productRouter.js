import express from 'express';
import expressAsyncHandler from "express-async-handler"
import Product from '../models/products.js';
import { isAuth } from '../middleware/authMiddleware.js';
import mongoose from 'mongoose';

const productRouter = express.Router();

// @desc  fetch all products
// @route get /products
// @access Public
productRouter.get('/list',(async(req,res)=>{
        const pageSize=req.query.limit
        const page=Number(req.query.pageNumber) || 1
        
        
        const count=await Product.countDocuments()
        const products= await Product.find().limit(pageSize).skip(pageSize*(page -1))
        const pages=Math.ceil(count/pageSize)
        
        res.json({products,page,pages});
 }));

// @desc  create product
// @route get /api/product/create
// @access Public
productRouter.post("/create",(async(req,res)=> {     
        
        const { name,description,quantity } =req.body

        try {
                const product= new Product({
                        name,
                        description,
                        quantity,
                })

                if(product){
                        const createdProduct=await product.save()
                        res.status(201).json(createdProduct);
                }
                else{
                        res.status(404)
                        throw new Error("Failed to Create Product ")
                }        
        } 
        catch (error) {
                console.error('Error creating product', error);
                
                res.status(404).send({ message: error });
        } 
}))

// @desc  get delete product
// @route get /api/product/delete/:id
// @access Public
productRouter.delete("/delete/:id",(async(req,res)=> {     
        try {
                const {id:_id} =req.params        

                if (mongoose.Types.ObjectId.isValid(_id)){
                        await Product.findByIdAndDelete(String(_id))
                        res.json({message:"Product Deleted"})
                }
                else {
                        res.status(404).send({message: "Product Not Found!'"})
                }
        } 
        catch (error) {
                console.error('Error deleting product:', error);
                
                res.status(404).send({ message: error });
        }  
}))


// @desc  update any product
// @route put /product/updateuser/:id
// @access private/ admin
productRouter.put('/update/:id',(async(req,res)=>{
        const {id}= req.params
        const {name,description,quantity}= req.body

        const product= await Product.findById(id) 

        if (product){
                product.name= name                             //if nothing comes from client put what was there b4 back
                product. description= description  
                product.quantity= quantity
                
                
                const updatedProduct=await product.save()

                res.send({
                        _id:updatedProduct._id,
                        name:updatedProduct.name,
                        description:updatedProduct.description,
                        quantity:updatedProduct.quantity,
                    });
        }
        else{
                res.status(404)
                throw new Error("User not Found")
        }
       
}));


export default productRouter;