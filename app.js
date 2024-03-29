/*
============================================
; Title:  app.js
; Author: Victor Soto
; Date:   01/14/2024
; Updated on: 02/18/2024
;===========================================
*/

// npm packages
// Import routes
const express = require("express");
const http = require("http");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const mongoose = require("mongoose");

const composerAPI = require("./routes/soto-composer-routes");
const personAPI = require("./routes/soto-person-routes");
const userAPI = require("./routes/soto-session-routes"); 
const customerAPI = require("./routes/soto-node-shopper-routes"); 
const teamAPI = require("./routes/soto-team-routes");

// Create a new express application
const app = express();

// Set the port to process.env.PORT or 3000
const port = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// MongoDB connection string
const uri = 'mongodb+srv://web420_user:s3cret@bellevueuniversity.heixdsl.mongodb.net/web420DB?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(uri).then(() => {
    console.log("Connection to web420DB on MongoDB Atlas successful");
}).catch(err => {
    console.log(`MongoDB Error: ${err.message}`);
});

// Swagger definition
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "WEB 420 RESTful APIs",
            version: "1.0.0"
        },
    },
    apis: ["./routes/*.js"] // files containing annotations for the OpenAPI Specification
};

// Initialize Swagger JSDoc
const openapiSpecification = swaggerJsdoc(options);

// Use Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// Use the APIs
app.use("/api/composers", composerAPI);
app.use("/api/persons", personAPI);
app.use("/api/users", userAPI);
app.use("/api/customers", customerAPI);
app.use("/api/teams", teamAPI);

// Root URL handler - Redirects the root URL to '/api-docs' path, 
// allowing the Swagger UI to be displayed when the root URL of the application is accessed in render
app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

// Start the server
http.createServer(app).listen(port, () => {
    console.log(`Application started and listening on port ${port}`);
});