import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema({
  firstName: { type: String,required: true,},
  lastName: {type: String,required: true,},
  username: {type: String,unique: true,required: true,},
  password: {type: String,required: true, },
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the model
export default User;
