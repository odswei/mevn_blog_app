const mongoose = require('mongoose')
const router = require('express').Router()
const Content = mongoose.model('Content')
const passport = require('passport')
const util = require('../helpers/util')

router.post('/content', passport.authenticate('jwt', { session: false }), function(req, res, next){
    const chapter_id = req.body.chapter_id
    const content = req.body.content

const newContent = new Content({
    chapter_id:chapter_id, 
    content:content,
})

    newContent.save()
    .then((content) => {
        if (!content) {
            return res.status(401).json({ success: false, msg: "could not find post" });
        }
        
        // Function defined at bottom of app.js
       
        res.send({content:content})
    })
    .catch((err) => {
        next(err);
    });
  
});
