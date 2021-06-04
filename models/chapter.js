const mongoose = require('mongoose')

const chapterSchema = new mongoose.Schema({
        chapter_no:{ type: Number, min: 0, max: 50 },
        c_title: { type: String, required: true },
        contents:{ type: String, required: true },
        update:{ type: Date, default: Date.now },
        tags:[String],
        published:Boolean,
        series_id: mongoose.Schema.Types.ObjectId
        
})

mongoose.model('Chapter', chapterSchema)