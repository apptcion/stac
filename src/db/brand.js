import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    brand_name : {type : String, require: true},
    brnad_type : {type : String, require : true},
    tel : {type : String, require: true},
    email : {type : String, require: true},
    productUrl1 : {type : String},
    productUrl2 : {type : String}
})

const brands = mongoose.models.Brands || mongoose.model('Brands', brandSchema, 'brands')
export default brands