import { Schema, model } from 'mongoose';

const productSchema = new Schema({
        name: {type: String,required: true,},
        description: {type: String,required: true,},
        quantity: {type: Number,required: true,default: 0,} // You can set a default value if needed},
});
      
// Create the Product model
const Product = model('Product', productSchema);
      
// Export the model
export default Product;
      