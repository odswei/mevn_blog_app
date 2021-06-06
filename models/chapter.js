const mongoose = require('mongoose')

const chapterSchema = new mongoose.Schema({
        chapter_no:{ type: Number, min: 0, max: 50 },
        c_title: { type: String, required: true },
        contents:{ type: String, required: true },
        update:{ type: Date, default: Date.now },
        tags:[{
                tag:String
        }],
        published:Boolean,
        series_id: {type: mongoose.Schema.Types.ObjectId,ref:'Series'}
        
})

mongoose.model('Chapter', chapterSchema)