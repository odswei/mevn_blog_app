const mongoose = require('mongoose')



const UserSchema = new mongoose.Schema({
    username:String,
    email:String,
    hash:String,
    salt:String,
    work_at:String,
    series_id:[{type:mongoose.Schema.Types.ObjectId, ref: 'Series'}],
    u_img:{type:mongoose.Schema.Types.ObjectId, ref:"Image"},
    reading_list:[{type:mongoose.Schema.Types.ObjectId, ref:"Chapter"}]
})

mongoose.model('User',UserSchema)