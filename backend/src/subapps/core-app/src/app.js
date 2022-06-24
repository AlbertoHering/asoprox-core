const express = require("express");
const app = express();

const routes = require('./routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/core', routes);

module.exports = app;