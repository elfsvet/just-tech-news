const User = require('./User');
const Post = require('./Post')

// create associations
// user can have many post
User.hasMany(Post, {
    foreignKey: 'user_id',
});

// defining relationship of the post model to the user
// post can belong to one user.
Post.belongsTo(User, {
    foreignKey: 'user_id',
});


module.exports = { User, Post };