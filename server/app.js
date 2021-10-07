// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const path = require('path')
// Handles the handlebars
// https://www.npmjs.com/package/hbs

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
require('./config/session.config')(app)
require('./config/cors.config')(app)
// require('./config/upload.config')(app)


// default value for title local
const projectName = "web-gestiona";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here

app.get("/", (req, res) => res.sendFile(__dirname + "/public/index.html"))
app.use("/api", require('./routes'))


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes

// DEPLOY


module.exports = app;
