const express = require("express");
//may be able to use import; when vid made node didn't allow es6 imports
const bodyParser = require("body-parser");
//nb path is a native node module. Allows us to dynamically build directory when we call it
const path = require("path");

//if in development or testing brings in .env file to access secret key
//NB we aded .env to gitignore
if (process.env.NODE_ENV !== "production") require("dotenv").config();

//this will give us back our object that we can use to make charges
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//NB express is just a libray that enables us to build an API server easily
const app = express();
//setting port to process environment port or 5000 ie a different port to the localhost
//(nb when you deploy to Heroku it sets the port up for you)
//in package json of client added  "proxy": "http://localhost:5000" so create react app can use this
const port = process.env.PORT || 5000;

//bodyParser middleware parses json automatically, then converts to strict url without spaces, etc
//NB this is deprecated. from comments:
/*
express has implemented bodyparser so now we can just use express.json() and express.urlencoded({ extended: true}).
Not that important , just saves a line and a small package installation*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//static allows us to serve a certain file inside the url
//__dirname is part of Node.js
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  //if a user is wanting to "get" any of our files, we want to send them the static file (HTML, CSS, JS)
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});

//making route
app.post("/payment", (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "gbp",
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});
