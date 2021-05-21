const mongoose = require('mongoose')

const chapterSchema = new mongoose.Schema({
       series_id : {type: mongoose.Schema.Types.ObjectId, ref: 'Series'},
       chapter:{ type: Number, min: 0, max: 20 },
        c_title: String,
        update:{ type: Date, default: Date.now },
        tags:[]
})

mongoose.model('Chapter', chapterSchema)