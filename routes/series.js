const mongoose = require('mongoose')
const router = require('express').Router()
const Series = mongoose.model('Series')
const Chapter = mongoose.model('Chapter')
const User = mongoose.model('User')
const passport = require('passport')
const enc = require('../helpers/encrypt')
const { post } = require('./chapter')

//ini udh bnr
router.post('/series',enc.decrypt,passport.authenticate('jwt',{session:false}),function(req, res, next){
    const user_id = req.user.id

    const newSeries = new Series({
        uid:req.user.id,
        s_title:req.body.s_title
    })

    newSeries.save(function(err,series){
        if(err)return res.send(err)
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
router.get('/myseries',enc.decrypt,passport.authenticate('jwt',{session:false}), function(req,res,next){
    const user_id = req.user.id
    Series.find({uid:user_id})
    .populate({
        path:'uid',
        select:'username'
    })
    .populate({
        path:'chapters',
        select:['c_title','tags','chapter_no']
    }).exec(function(err,series){
        if(err )res.send(err)
        res.send(series)
    })
    
})

//return all series for home vue
router.get('/series', function(req,res,next){
    Series.find({})
    .populate({
        path:'uid',
        select:'username'
    })
    .populate({
        path:'chapters',
        select:['c_title','tags','chapter_no']
    })
    .exec(function(err,series){
        if(err) res.send(err)
        res.send(series)
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