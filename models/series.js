const mongoose = require('mongoose')

const seriesSchema = new mongoose.Schema({
        uid:{type:mongoose.Schema.Types.ObjectId, ref: 'User'},
        s_title:String,
        followers:[{type:mongoose.Schema.Types.ObjectId, ref: 'User'}],
        claps:[{type:mongoose.Schema.Types.ObjectId, ref: 'User'}],
        chapters:[{type:mongoose.Schema.Types.ObjectId, ref: 'Chapter'}]
})

mongoose.model('Series',seriesSchema)