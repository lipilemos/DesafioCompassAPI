require("dotenv").config();
const swaggerUI = require('swagger-ui-express');
const express = require("express");
const path = require("path");
const cors = require("cors");
const swaggerDoc = require('./swagger.json');
const port = process.env.PORT || 5001;

const app = express();

// Config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Solve CORS
//app.use(cors({ credentials: true, origin: "http://localhost:5002" }));
app.use(cors())

// db connection
require("./config/db.js");

// swagger route
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// routes
const router = require("./routes/router.js")

app.use(router);
app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
