const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
        user_id:String,
        post: { type : Array , "default" : [] },
})

mongoose.model('Post',PostSchema)

// user:{
//     _id:"97232189",
//     username:"san",
//     hash:'2382938293',
//     salt:"ajkhdsiuayeyqw79"
// }

// post:{
//     _id:"2739287393",
//     user_id:user_id
//     content:[
//         {title:"ajhsjahsja"},
//         {subtitle:"gasugasuagsua"}
//     ]
// }