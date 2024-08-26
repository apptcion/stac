import mongoose from 'mongoose'

const productsSchema = new mongoose.Schema({
    product_name : {type : String, require : true},
    price : {type : String, require : true},
    brand : {type : String, require : true},
    img : {type : String, require : true},
    choseong : {type : String},
    category : {type : String, require : true},
})

const products = mongoose.models.Products || mongoose.model('Products', productsSchema, "product");

export default products