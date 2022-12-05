const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
// const sessions = require('express-session')
const db = require('./src/config/database.config.js')
// creating of express app
const app = express();



// const db=require("./src/config/database.config")
// db.authenticate()
// .then(()=>console.log("DataBase Connected"))
// .catch((err)=>console.log("ERROR",err));

// use body parser to decode query params and json body.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// cookie parser middleware
// app.use(cookieParser())

// port set-up
const port = process.env.PORT || 8000;

require("./src/routes/routes")(app, db)
// test database connection
db.query('SELECT * FROM users;', (error, results, fields) => {
  if (error) throw error
  console.log(results)
})



// server listening
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});

