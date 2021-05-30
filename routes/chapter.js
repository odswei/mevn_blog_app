const mongoose = require('mongoose')
const router = require('express').Router()
const Chapter = mongoose.model('Chapter')
const passport = require('passport')
const util = require('../helpers/util')
const enc = require('../helpers/encrypt')

router.post('/series/:id', enc.decrypt,passport.authenticate('jwt', { session: false }), function(req, res, next){
    const series_id = req.params.id
    const chapter_no = req.body.chapter_no
    const c_title = req.body.c_title
    const tags = req.body.tags
    const contents = req.body.contents
    const published = req.body.published

const newChapter = new Chapter({
    series_id:series_id, 
    chapter_no:chapter_no,
    c_title:c_title,
    contents:contents,
    tags:tags,
    published:published,
})

    newChapter.save()
    .then((chapter) => {
        if (!chapter) {
            return res.status(401).json({ success: false, msg: "could not find post" });
        }
        
        // Function defined at bottom of app.js
       
        res.send({chapter:chapter})
    })
    .catch((err) => {
        next(err);
    });
  
});

module.exports = router;