const mongoose = require('mongoose')
const { authenticate } = require('passport')
const router = require('express').Router()
const Series = mongoose.model('Series')
const Chapter = mongoose.model('Chapter')
const User = mongoose.model('User')
const passport = require('passport')
const enc = require('../helpers/encrypt')
const { post } = require('./chapter')

//ini udh bnr
router.post('/series',passport.authenticate('jwt',{session:false}),function(req, res, next){
    const user_id = req.user.id

    const newSeries = new Series({
        uid:req.user.id,
        s_title:req.body.s_title
    })

    newSeries.save(function(err,series){
        console.log(err)
        if(err)return err
        User.findById(user_id,function(err,user){
            if(err) return res.send(err)
            user.series_id.push(series)
            user.save(function(err){
                if(err)return res.send(err)
                res.json({status:'adding new series successed'})
            })
        })
    })
    // .then((series) => {
    //     if (!series) {
    //         return res.status(401).json({ success: false, msg: "could not find post" });
    //     }
        
    //     // Function defined at bottom of app.js
    //     Series.find({uid:user_id}).then(response=>{
    //         res.send(response)
    //     })

    // })
    // .catch((err) => {
    //     next(err);
    // });
  
});





// router.get('/series/:id', function(req,res,next){
//     Series.findById().then(response=>{
//         res.send(response)
//     })
// })

//ini udh keren
router.get('/myseries',passport.authenticate('jwt',{session:false}), function(req,res,next){
    const user_id = req.user.id
    Series.find({uid:user_id})
    .populate({
        path:'uid',
        select:'username'
    })
    .populate({
        path:'chapters',
        select:['c_title','tags','chapter_no','claps','update','published']
    }).exec(function(err,series){
        if(err )res.send(err)
        res.send(series)
    })
    
})

//return all series for home vue
router.get('/series', function(req,res,next){
    Chapter.find({})
    .populate({
        path:'series_id',
        select:['s_title','followers','claps'],
            populate:[{
            path:'uid',
            select:['username'],
                populate:[{
                    path:'u_img',
                    options: {
                        transform:  (doc,ret) =>"data:"+doc.img.contentType+";base64,"+ new Buffer.from(doc.img.data).toString('base64')
                                }   
                }]
            }]
    })
    // .populate({
    //     path:"u_img",
    //     select:["img"],
       
    //  })                          

    .exec(function(err,chapters){
        if(err) res.send(err)
        res.send(chapters)
    })
})

router.delete("/series/:id",passport.authenticate("jwt",{session:false}),async function(req,res){
        await Chapter.remove({series_id:req.params.id},function(err, chapters){
            if (err) console.log(err)
 
        })
        await User.findById({_id:req.user.id},function(err,series){
            if (err) console.log(err)
            console.log(series.series_id)
            const index = series.series_id.indexOf(req.params.id)

            if(index>-1){
                series.series_id.splice(index,1)
                series.save()
            }
            // User.updateOne({_id:req.user.id},{series_id:})
        })
        await Series.remove({_id:req.params.id},function(err){
                if (err) console.log(err)
                res.json({message:"success!"})
            })
})

// router.get('/series/:id', function(req,res,next){
// Series.findById(req.params.id)
//     .then(data =>{
//         const series = data
//         Chapter.find({series_id:req.params.id}).then(chapter=>{
//           res.send({series,chapter})
//             })

//     })
   
// })

module.exports = router;
