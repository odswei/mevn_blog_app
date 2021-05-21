const mongoose = require('mongoose')
const router = require('express').Router()
const Series = mongoose.model('Series')
const passport = require('passport')

router.post('/series', function(req, res, next){
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
