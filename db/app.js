const express = require("express");
const { getTopics, invalidRoutes } = require("../controlers/topic-controler");
const { customErrorHandler } = require("../errors");
const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);

app.get("*", invalidRoutes);
app.use(customErrorHandler);
module.exports = app;
