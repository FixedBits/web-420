/*
============================================
; Title:  soto-session-routes.js
; Author: Victor Soto
; Date:   02/18/2024 
; Source: https://github.com/buwebdev/web-420/blob/master/routes/password-routes.js
;===========================================
*/

// modules to require
const express = require("express");
const router = express.Router();
// the schema for the users collection
const User = require("../models/soto-user");
// Import the bcrypt framework
const bcrypt = require("bcryptjs");

// Create variable saltRound equal to 10
const saltRounds = 10;

/** 
 * @openapi
 * /api/users/signup:
 *   post:
 *     tags:
 *       - NodeSecurity
 *     operationId: signup
 *     description: Create a user document.
 *     summary: Create a new user.
 *     requestBody:
 *       description: Create a new user document
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               Password:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *       required: true 
 *     responses:
 *       "200":
 *         description: Registered user.
 *       "401":
 *         description: Username is already in use.
 *       "500":
 *         description: Server expectations.
 *       "501": 
 *         description: MongoDB expectations.
 */
router.post("/signup", async (req, res) => {
  try {
    // Query the users collection using findOne() with the username from the RequestBody
    const user = await User.findOne({ userName: req.body.userName });

    if (!user) {
      // Create a new user object with hashed password and save to MongoDB
      const hashedPassword = bcrypt.hashSync(req.body.Password, saltRounds);
      const newRegisteredUser = {
        userName: req.body.userName,
        Password: hashedPassword,
        emailAddress: req.body.emailAddress
      };
      await User.create(newRegisteredUser);
      res.status(200).json({ message: "User registered successfully." });
    } else {
      res.status(401).json({ message: "Username already exists." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

/** 
 * @openapi
 * /api/users/login:
 *   post:
 *     tags:
 *       - NodeSecurity
 *     operationId: login
 *     description: Authenticate a user.
 *     summary: Authenticate a user.
 *     requestBody:
 *       description: Authenticate a user
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               Password:
 *                 type: string
 *       required: true 
 *     responses:
 *       "200":
 *         description: User logged in.
 *       "401":
 *         description: Invalid username and/or password.
 *       "500":
 *         description: Server Exception.
 *       "501": 
 *         description: MongoDB Exception.
 */

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    if (user) {
      let passwordIsValid = bcrypt.compareSync(req.body.Password, user.Password);
      if (passwordIsValid) {
        res.status(200).json({ message: "User logged in." });
      } else {
        res.status(401).json({ message: "Invalid password." });
      }
    } else {
      res.status(401).json({ message: "Invalid username." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

// Export the router
module.exports = router;