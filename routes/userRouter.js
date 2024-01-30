import express from 'express';
import User from '../models/users.js';


const userRouter = express.Router();

// @desc  Get seed db
// @route get /api/seeder
// @access Public
userRouter.get("/",(async(req,res)=> {                                                                                                  
        try {
                await User.deleteMany(); // Clear existing data
                await User.insertMany([]); // Insert new data
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
userRouter.get("/clear",(async(req,res)=> {                                                                                                  
        try {
                await User.deleteMany(); // Clear existing data
                console.log('Database cleared');
                
                res.send({ message: 'Database cleared' });
        } 
        catch (error) {
                console.error('Error clearing database:', error);
                
                res.status(404).send({ message: error });
        } 
}))


export default userRouter;