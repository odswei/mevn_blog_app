const mongoose = require('mongoose')

const contentSchema = new mongoose.Schema({
       chapter_id : {type : mongoose.Schema.Types.ObjectId, ref: 'Chapter'},
       content:[],
       updated: { type: Date, default: Date.now },
})

mongoose.model('Content', contentSchema)