const mongoose = require('mongoose')
const router = require('express').Router()
const Series = mongoose.model('Series')
const passport = require('passport')
const enc = require('../helpers/encrypt')

router.post('/series',enc.decrypt,passport.authenticate('jwt',{session:false}),function(req, res, next){
    const user_id = req.user.id
    const s_title = req.body.s_title

const newSeries = new Series({
    user_id:user_id, s_title:s_title
})

    newSeries.save()
    .then((series) => {
        if (!series) {
            return res.status(401).json({ success: false, msg: "could not find post" });
        }
        
        // Function defined at bottom of app.js
       
        res.send({series:series})
    })
    .catch((err) => {
        next(err);
    });
  
});


router.get('/series/:id',enc.decrypt,passport.authenticate('jwt',{session:false}),function(req,res,next){
    const series_id = req.params.id
    Series.findById(series_id).then(response=>{
        res.send(response)
    })
})

router.get('/series', function(req,res,next){
    Series.find().then(response=>{
        res.send(response)
    })
})

module.exports = router;