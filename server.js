import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';

 
// Create an Express application
const app=express()

// Middleware & CORs
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))       //increase data limit for file64 data convert
app.use(express.json());
app.use(express.urlencoded({extended:true }));
app.use(
    cors({
        origin:"*",
        credentials:true,                                                                                       //access-control-allow-credentials:true
        optionSuccessStatus:200,
    })
)
dotenv.config();

 

const PORT = process.env.PORT || 3000;

// Connect to MongoDB using the provided URL in the environment variables
mongoose.connect(process.env.MONGODB_URL)

// Use the seederRouter for the '/api/seeder' route
app.use('/', (req, res) => {
        return res.status(202).json(`Server running on ${PORT}`);
});
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)

// Start the server and listen on the specified port
app.listen(PORT, ()=>{
        console.log(`Server running on ${PORT}`)
})