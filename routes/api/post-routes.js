// to create Express API endpoints
const router = require('express').Router();
const { Post, User, Vote } = require('../../models');
const sequelize = require('../../config/connection');


// get all users
router.get('/', (req, res) => {
    console.log("=====================");
    Post.findAll({
        // query configuration
        //findAll method
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            //update the get method to display total vote count for a post. it will reflect new data. it should be one of the attributes.
            [
                sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count'
            ]
        ],
        // ORDER BY need to be nested array
        order: [['created_at', 'DESC']],
        // to include the JOIN the user table:
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
        // now we need to add promise that captures the response from the database call.
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get a single post
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            //update the get method to display total vote count for a post. it will reflect new data. it should be one of the attributes.
            [
                sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count'
            ]
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create a post
router.post('/', (req, res) => {
    // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
    Post.create({
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.body.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT /api/post upvote
// create the vote
router.put('/upvote', (req, res) => {
    Vote.create({
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
        .then(() => {
            // then find the post we just voted on
            return Post.findOne({
                where: {
                    id: req.body.post_id
                },
                attributes: [
                    'id',
                    'post_url',
                    'title',
                    'created_at',
                    // use raw MySQL aggregate function query to get a count of how many votes the post has and return it under the name 'vote_count'
                    [
                        // regular sql query
                        sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
                        'vote_count'
                    ]
                ]
            })
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

// update a post
router.put('/:id', (req, res) => {
    Post.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// delete a post
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// to expose the changes to the router by using the express command
module.exports = router;