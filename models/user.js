const mongoose = require('mongoose')



const UserSchema = new mongoose.Schema({
    username:String,
    hash:String,
    salt:String,
    series_id:[{type:mongoose.Schema.Types.ObjectId, ref: 'Series'}],
    u_img:{type:mongoose.Schema.Types.ObjectId, ref:"Image"}
})

mongoose.model('User',UserSchema)