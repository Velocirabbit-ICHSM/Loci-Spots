const path = require('path');
const express = require('express');
const app = express();
const restoApiRouter = require('./routes/restoApi');
const userVotesRouter = require('./routes/userApi');
const cookieSession = require('cookie-session');
const passport = require('passport');
const { user } = require('pg/lib/defaults');
require('./routes/passport'); // MLCK?
const cors = require('cors');

const PORT = 3000;

// app.use(
//   cors({
//     origin: 'http://localhost:8080',
// }));

/**
 * Handle parsing request body
 */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * handle requests for static files
 */

if (process.env.NODE_ENV === 'production') {
  app.use('/dist', express.static(path.resolve(__dirname, '../dist')));
  app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../dist/index.html')));
}
/**
 * define route handlers
 */

app.use(
  cookieSession({
    name: 'github-auth-session',
    keys: ['key1', 'key2'],
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/success', (req, res) => {
  res.send(`Hello world ${req.user}`);
});

app.get('/auth/error', (req, res) => res.send('Unknown Error'));

app.get('/auth/github', passport.authenticate('github', { scope: ['user'] }));
app.get('/auth/github/callback', passport.authenticate('github'), function (req, res) {
  res.redirect('/');
});

const isLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json('Error: User not authorized');
  }
  return next();
};
app.get('/auth', isLoggedIn, (req, res) => {
  res.status(200).json({ userId: req.user });
});

app.use('/api/resto', restoApiRouter);
app.use('/api/user', userVotesRouter);

/**
 * catch-all for unknown routes
 *
 */
app.use((req, res) => {
  res.status(404).send('This is not the restaurant you are looking for...');
});

/**
 * Express Error Handler
 */

app.use((err, req, res, next) => {
  console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
  console.log(err);
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 *
 * Start server
 */

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
module.exports = app;
