/*
============================================
; Title:  soto-person-routes.js
; Author: Victor Soto
; Date:   02/11/2024 
; Description: https://github.com/buwebdev/web-420/blob/master/routes/fruit-routes.js
;===========================================
*/

// Import necessary modules
// Create a new router
const express = require("express");
const router = express.Router();
const Person = require("../models/soto-person");

// Operation: GET
// Path: /api/persons
/**
 * @openapi
 * /api/persons:
 *   get:
 *     tags:
 *       - Persons
 *     summary: Retrieve a list of persons
 *     responses:
 *       200:
 *         description: An array of person documents
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */
router.get('/persons', async (req, res) => {
  try {
    const persons = await Person.find();
    res.status(200).json(persons);
  } catch (err) {
    if (err instanceof mongoose.Error) {
      res.status(501).send('MongoDB Exception');
    } else {
      res.status(500).send('Server Exception');
    }
  }
});

// Operation: POST
// Path: /api/persons
/**
 * @openapi
 * /api/persons:
 *   post:
 *     tags:
 *       - Persons
 *     summary: Create a new person
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               roles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *               dependents:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *               birthDate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Array of person documents
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */
router.post('/persons', async (req, res) => {
  try {
    // Create a new object literal named newPerson and map the RequestBody fields to its properties
    const newPerson = new Person({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      roles: req.body.roles,
      dependents: req.body.dependents,
      birthDate: req.body.birthDate
    });

    // Call the create() function on the Person model and add the document to MongoDB
    const person = await Person.create(newPerson);

    // Return the new person document
    res.status(200).json([person]);
  } catch (err) {
    if (err instanceof mongoose.Error) {
      res.status(501).send('MongoDB Exception');
    } else {
      res.status(500).send('Server Exception');
    }
  }
});

// Export the router
module.exports = router;
