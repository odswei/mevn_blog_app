const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
       chapter_id : {type: mongoose.Schema.Types.ObjectId, ref: 'Chapter'},
       c_user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
       comment:String,
})

mongoose.model('Comment', commentSchema)