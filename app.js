/*
============================================
; Title:  app.js
; Author: Victor Soto
; Date:   01/14/2024
; Updated on: 02/04/2024
;===========================================
*/

// npm packages
const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mongoose = require('mongoose');
const composerAPI = require('./routes/soto-composer-routes');

// Create a new express application
const app = express();

// Set the port to process.env.PORT or 3000
const port = process.env.PORT || 3000;

// Set the app to use express.json()
app.use(express.json());

// Set the app to use express.urlencoded({extended: true});
app.use(express.urlencoded({extended: true}));

// Define an object literal named options
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'WEB 420 RESTful APIs',
            version: '1.0.0'
        },
    },
    apis: ['./routes/*.js'] // files containing annotations for the OpenAPI Specification
};

// Create a new variable named openapiSpecification and call the swaggerJSDoc library using the options object literal
const openapiSpecification = swaggerJsdoc(options);

// Wire the openapiSpecification variable to the app variable
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// Use the APIs
app.use('/api/composers', composerAPI);


// connection string for MongoDB
const uri = "mongodb+srv://web420_user:thisismypassword@bellevueuniversity.heixdsl.mongodb.net/web420DB?retryWrites=true&w=majority";

mongoose.connect(uri, {
    promiseLibrary: require('bluebird'),
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log(`Connection to web420DB on MongoDB Atlas successful`);
}).catch(err => {
    console.log(`MongoDB Error: ${err.message}`);
});
