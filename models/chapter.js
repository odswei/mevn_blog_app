const mongoose = require('mongoose')

const chapterSchema = new mongoose.Schema({
       series_id : {type: mongoose.Schema.Types.ObjectId, ref: 'Series'},
       chapter_no:{ type: Number, min: 0, max: 20 },
        c_title: String,
        content:[{}],
        update:{ type: Date, default: Date.now },
        tags:[],
        
})

mongoose.model('Chapter', chapterSchema)