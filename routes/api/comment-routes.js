const router = require('express').Router();
const { Comment } = require('../../models');

// need to try finished on my own the get delete here stopped at 13.5.4

router.get('/', (req,res)=>{

});

router.post('/',(req,res)=>{
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

router.delete('/:id', (req,res)=>{

});

module.exports = router;