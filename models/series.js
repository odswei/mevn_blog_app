const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const seriesSchema = new mongoose.Schema({
        uid:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        s_title:String,
        followers:[{type:mongoose.Schema.Types.ObjectId, ref: 'User'}],
        claps:[{type:mongoose.Schema.Types.ObjectId, ref: 'User'}],
})

mongoose.model('Series',seriesSchema)