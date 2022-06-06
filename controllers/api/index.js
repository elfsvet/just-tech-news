// creating express router
const router = require('express').Router();
// to properly set up the post and user routes

// import the modules
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes.js');
const commentRoutes = require('./comment-routes.js');
// instructing the router instance to use :
// correct url paths
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;