const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    uid:mongoose.Schema.Types.ObjectId,
    img:
    {
        data: Buffer,
        contentType: String
    }
})

mongoose.model('Image',ImageSchema)