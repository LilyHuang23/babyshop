const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;
const app = express();
const { auth } = require('express-openid-connect');

const config = { 

  authRequired: false, auth0Logout: true,
  
   secret: 'a long, randomly-generated string stored in env', 
  
  baseURL: 'https://bobyshop2.onrender.com', 
  
  clientID: 'O9bZKKGummYzLq8otKJHe1swwYSRcNj3', 
  
  issuerBaseURL: 'https://dev-rpb3yv2pay34uyin.us.auth0.com'
  
   }; 
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on localhost:${port}`);
  }
});
// const db = require('./models');
// db.mongoose
//   .connect(db.url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`DB Connected and server running on ${port}.`);
//     });
//   })
//   .catch((err) => {
//     console.log('Cannot connect to the database!', err);
//     process.exit();
//   });