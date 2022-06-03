// importing elements we need to build the post model
// we need connection to mysql we have in config/connection.js
// and model and datatypes from sequelize package

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// define the post model
// create our post model
class Post extends Model {
    static upvote(body, models) {
        // The only real difference here is that we're using models.Vote instead, and we'll pass the Vote model in as an argument from post-routes.js.
        return models.Vote.create({
            user_id: body.user_id,
            post_id: body.post_id
        }).then(() => {
            return Post.findOne({
                where: {
                    id: body.post_id
                },
                attributes: [
                    'id',
                    'post_url',
                    'title',
                    'created_at',
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post_id = vote.post_id)'),
                        'vote_count'
                    ]
                ]
            });
        });
    }
};

// we defined the columns in the post and pass the current connection instance to initialize the post model.
// create fields/columns for post model
// init() method
Post.init(
    // !first parameter contains post's schema
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        post_url: {
            type: DataTypes.STRING,
            allowNull: false,
            // to validate if it is a link
            validate: {
                isURL: true
            }
        },
        // who posted the new articles
        user_id: {
            type: DataTypes.INTEGER,
            // to establish the relationship between this post and the user.
            references: {
                model: 'user',
                // primary key of the user model
                key: 'id'
            }
            // user_id is fk foreign key
        }

    },
    // !second parameter
    // we configure the metadata, including the naming conventions
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);



// to make the Post model accessible to other parts of the application
module.exports = Post;