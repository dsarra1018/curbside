const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

//user Router
const userRouter = require('./routes/api/user');

app.use("api/user", userRouter);

app.use(
  bodyParser.urlencoded({extended:false})
);

app.use(bodyParser.json());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/listings", {
});

const db = require('.config/index.').MONGODB_URI;

mongoose.connect(db || 'mongodb://localhost/listings',{
  useNewUrlParser: true
});

//when connected successfully
mongoose.connection.on('connected', () => {
    console.log('Established Mongoose Default Connection');
});

//when connection throws an error
mongoose.connection.on('error', err =>{
  console.log('Mongoose Default Connection Error : ' + err);
});

app.listen(PORT, function() {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
});