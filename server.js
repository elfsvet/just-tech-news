const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
// pass the helpers to the existing statement 
const hbs = exphbs.create({helpers});
const app = express();
const PORT = process.env.PORT || 3001;
const session = require('express-session');
const { use } = require('./controllers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// built-in Express.js middleware function that can take all of the contents of a folder and serve them as static assets. This is useful for front-end specific files like images, style sheets, and JavaScript files.
app.use(express.static(path.join(__dirname, 'public')));
// turn on routes
app.use(routes);
// turn on connection to db and server
// if we change the force  from false to true it will DROP TABLE IF EXISTS This allows the table to be overwritten and re-created.
// but we don't need to drop it every time so we will change it back to false if we don't need to erase the tables
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});