const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const seriesSchema = new mongoose.Schema({
        user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        s_title:String,
        followers:[mongoose.Schema.Types.ObjectId],
        claps:[mongoose.Schema.Types.ObjectId],
})

mongoose.model('Series',seriesSchema)