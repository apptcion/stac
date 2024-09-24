import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username : {type : String, require : true},
    tel : {type : String, require : true},
    sendMail : {type : Boolean, require : true},
    personal : {type : Boolean, require : true}
})

const users = mongoose.models.Users || mongoose.model('Users', userSchema, 'users')
export default users