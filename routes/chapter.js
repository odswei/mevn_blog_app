const mongoose = require('mongoose')
const router = require('express').Router()
const Chapter = mongoose.model('Chapter')
const Series = mongoose.model('Series')
const Image = mongoose.model('Image')
const User = mongoose.model('User')
const passport = require('passport')
const util = require('../helpers/util')
const enc = require('../helpers/encrypt')


router.get('/series/:id/chapters', function(req, res, next)
{
    const series_id = req.params.id

    Series.findOne({_id:series_id})
    .populate('chapters')
    .exec(function(err,series){
        if(err) res.send(err)
        res.send(series)
    })

})


//area terlarang udah works well!
router.post('/chapter/:id*?', passport.authenticate('jwt', { session: false }), async function(req, res, next)
{
    // const series_id = req.params.id
    console.log(req.user.id)
    // const {_id} = await Image.findOne({uid:req.user.id})
    // console.log(_id)
     const chapterId = req.params.chapterId
    
    const chapter = {
        c_title : req.body.c_title,
        tags : req.body.tags,
        contents : req.body.contents,
        published :req.body.published,
        series_id:req.body.sid
    }
if(chapterId){
    Chapter.findOneAndUpdate({_id:chapterId},{$set:chapter},{new:true,useFindAndModify: false},function (err,updatedChapter) {
        if (err) return console.error(err);       
        res.send({message:"edit success"})  
    })
}else{
   
                
    // const newChapter =new Chapter({
    //     c_title : req.body.c_title,
    //     tags : req.body.tags,
    //     contents : req.body.contents,
    //     published :req.body.published,
    //     chapter_no:count_chapter,
    //     series_id:series_id
    // })
    const series_id = req.body.sid
    const {chapters} = await Series.findById({_id:series_id})
    console.log(chapters.length)

    let c = new Chapter(chapter)
  
   c.chapter_no=chapters.length+1
   console.log(c)
   console.log("connection",mongoose.connection.readyState)
    await c.save(async function(err,c){
        console.log(err)
        if(err)return err
        console.log(c)
        await Series.findById(series_id, function(err,series){
            if(err) res.send(err)
            series.chapters.push(c)
            series.save(function(err){
                if(err) res.send(err)
                res.send({message:"added!"})
            })
        })
    })
}
    // Series.findById(series_id,function(err,series)
    //     {
    //         if(err)res.send(err)
    //         if(req.user.id===series.uid.toString())
    //             {
         

        //         }
        //     else
        //         {
        //             res.send({message:'you are not allowed to edit'})
        //         }
        // })
})

// const newChapter = new Chapter({
//     series_id:series_id, 
//     chapter_no:chapter_no,
//     c_title:c_title,
//     contents:contents,
//     tags:tags,
//     published:published,
// })

//     newChapter.save()
//     .then((chapter) => {
//         if (!chapter) {
//             return res.status(401).json({ success: false, msg: "could not find post" });
//         }
        
//         // Function defined at bottom of app.js
       
//         res.send({chapter:chapter})
//     })
//     .catch((err) => {
//         next(err);
//     });
  
// });

// router.post('/chapter/:id', enc.decrypt,passport.authenticate('jwt', { session: false }), function(req, res, next){
//     const series_id = req.params.id
//     const chapter_no = req.body.chapter_no
//     const c_title = req.body.c_title
//     const tags = req.body.tags
//     const contents = req.body.contents
//     const published = req.body.published

// const newChapter = {
//     chapter_no:chapter_no,
//     c_title:c_title,
//     contents:contents,
//     tags:tags,
//     published:published,
// }

//  Chapter.findOneAndUpdate({_id:req.params.id},{$set:newChapter},{new:true,useFindAndModify: false},function (err,doc) {
//     if (err) return console.error(err);       
//     res.send(doc)  
// })

  
// });

router.get('/chapter/:chapterId',(req,res,next)=>{

    const chapterId = req.params.chapterId
    Chapter.findOne({_id:chapterId})
    .populate('series_id','s_title')
    .exec(function(err,chapter){
        if(err) res.send(err)
        res.send(chapter)
    })
        

})

// router.post('/chapter/:chapterId',passport.authenticate('jwt', { session: false }),(req,res,next)=>{
//     // const seriesId = req.params.seriesId
//     const chapterId = req.params.chapterId

//     const updatedChapter = {
//         c_title:req.body.c_title,
//         contents:req.body.contents,
//         tags:req.body.tags,
//         published:req.body.published,
//     }

    // // Series.findById(seriesId,function(err,series){
    // //     if(err)res.send(err)
    //     // if(series.chapters.includes(chapterId)){
    //         Chapter.findOneAndUpdate({_id:chapterId},{$set:updatedChapter},{new:true,useFindAndModify: false},function (err,updatedChapter) {
    //             if (err) return console.error(err);       
    //             res.send(updatedChapter)  
    //         })
    //     // }
    // // })

// })

// router.get('/editor/:id',(req,res,next)=>{
//     const _id = req.params.id

//     Chapter.findById(_id).then((response)=>{
//         const chapter = response
//         Series.findById(response.series_id).then((series)=>{
//             res.send({series,chapter})
//         })

//     })
// })




module.exports = router
