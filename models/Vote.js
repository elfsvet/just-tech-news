const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Vote extends Model { }

Vote.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // What needs to go here?
        // who voted for the post
        user_id: {
            type: DataTypes.INTEGER,
            // to establish the relationship between this post and the user.
            references: {
                model: 'user',
                // primary key of the user model
                key: 'id'
            }
            // user_id is fk foreign key
        },
        // for what post voted
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'vote'
    }
);

module.exports = Vote;