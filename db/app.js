const express = require("express");
const { getTopics, invalidRoutes } = require("../controlers/topic-controler");
const { customErrorHandler } = require("../errors");
const { getEndPoints } = require("../controlers/endpoint-controller")
const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api", getEndPoints)

app.get("*", invalidRoutes);
app.use(customErrorHandler);
module.exports = app;


/*
object which describes all the avaialble endpoints, each  end point is an object with more o*/