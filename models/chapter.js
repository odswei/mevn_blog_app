const mongoose = require('mongoose')

const chapterSchema = new mongoose.Schema({
       series_id : {type: mongoose.Schema.Types.ObjectId, ref: 'Series'},
       chapter_no:{ type: Number, min: 0, max: 20 },
        c_title: String,
        contents:String,
        update:{ type: Date, default: Date.now },
        tags:[String],
        published:Boolean,
        
})

mongoose.model('Chapter', chapterSchema)