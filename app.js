/*
============================================
; Title:  app.js
; Author: Victor Soto
; Date:   01/14/2024 
;===========================================
*/

// npm packages
const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mongoose = require('mongoose');

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

// Use http library to create a new server that listens on port you set (port 3000)
const server = http.createServer(app);

// Server listens on port and logs a message to the console
server.listen(port, () => {
    console.log(`Application started and listening on port ${port}`);
});