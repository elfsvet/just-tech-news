const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server
// if we change the force  from false to true it will DROP TABLE IF EXISTS This allows the table to be overwritten and re-created.
// but we don't need to drop it every time so we will change it back to false if we don't need to erase the tables
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
// https://peaceful-mountain-59773.herokuapp.com/ | https://git.heroku.com/peaceful-mountain-59773.git