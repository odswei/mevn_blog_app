const mongoose = require('mongoose')
const router = require('express').Router()
const Comment = mongoose.model('Comment')
const passport = require('passport')
const util = require('../helpers/util')

router.post('/comment', passport.authenticate('jwt', { session: false }), function(req, res, next){
    const chapter_id = req.body.chapter_id
    const comment = req.body.comment
    const c_user_id = req.body.c_user_id

const newComment = new Comment({
    chapter_id:chapter_id,
    c_user_id:c_user_id, 
    comment:comment,
})

    newComment.save()
    .then((comment) => {
        if (!comment) {
            return res.status(401).json({ success: false, msg: "could not find post" });
        }
        
        // Function defined at bottom of app.js
       
        res.send({comment:comment})
    })
    .catch((err) => {
        next(err);
    });
  
});
