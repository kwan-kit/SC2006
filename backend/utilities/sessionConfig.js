const session = require('express-session');

const sessionMiddleware = session({
  secret: 'password123', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set secure: true in production with HTTPS
});

module.exports = sessionMiddleware;
