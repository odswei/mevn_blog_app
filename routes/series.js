const mongoose = require('mongoose')
const router = require('express').Router()
const Series = mongoose.model('Series')
const Chapter = mongoose.model('Chapter')
const passport = require('passport')
const enc = require('../helpers/encrypt')

router.post('/series',enc.decrypt,passport.authenticate('jwt',{session:false}),function(req, res, next){
    const user_id = req.user.id
    const username = req.user.username
    const s_title = req.body.s_title
    const followers = req.body.followers
    const claps = req.body.claps


const newSeries = new Series({
    username:username,
    uid:user_id,
    s_title:s_title,
    followers:followers,
    claps:claps,

})

    newSeries.save()
    .then((series) => {
        if (!series) {
            return res.status(401).json({ success: false, msg: "could not find post" });
        }
        
        // Function defined at bottom of app.js
        Series.find({uid:user_id}).then(response=>{
            res.send(response)
        })

    })
    .catch((err) => {
        next(err);
    });
  
});




router.get('/series', function(req,res,next){
    Series.find().then(response=>{
        res.send(response)
    })
})

router.get('/myseries',enc.decrypt,passport.authenticate('jwt',{session:false}), function(req,res,next){
    const user_id = req.user.id
    Series.find({uid:user_id}).then(response=>{
        res.send(response)
    })
})


router.get('/series/:id', function(req,res,next){
Series.findById(req.params.id)
    .then(data =>{
        const series = data
        Chapter.find({series_id:req.params.id}).then(chapter=>{
          res.send({series,chapter})
            })

    })
   
})

module.exports = router;