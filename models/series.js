const mongoose = require('mongoose')

const Chapter = require('./chapter.js')

const seriesSchema = new mongoose.Schema({
        uid:{type:mongoose.Schema.Types.ObjectId, ref: 'User'},
        s_title:String,
        followers:[{type:mongoose.Schema.Types.ObjectId, ref: 'User'}],
       
        chapters:[{type:mongoose.Schema.Types.ObjectId, ref: 'Chapter'}]
})


mongoose.model('Series',seriesSchema)