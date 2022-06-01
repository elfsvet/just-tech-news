// creating express router
const router = require('express').Router();
// to properly set up the post and user routes

const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes.js');
// correct url paths
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;