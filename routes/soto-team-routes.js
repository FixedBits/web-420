/*
============================================
; Title:  soto-team-routes.js
; Author: Victor Soto
; Date:   03/08/2024 
; Description: API file with operations: findAllTeams, assignPlayerToTeam, findAllPlayersByTeamId, deleteTeam. 
; Additional information: Created a POST endpoint to create a new team
;===========================================
*/

// Import modules
// Create new router
const express = require('express');
const router = express.Router();
const Team = require('../models/soto-team');

/**
 * @openapi
 * /api/teams:
 *   post:
 *     tags:
 *       - Teams
 *     summary: Create a new team
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               mascot:
 *                 type: string
 *     responses:
 *       200:
 *         description: Team document
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */

// POST endpoint to create a new team
router.post('/', async (req, res) => {
  try {
    // Create a new team with the name and mascot 
    const team = new Team({
      name: req.body.name,
      mascot: req.body.mascot,
    });
    // Save the new team to the database
    const newTeam = await team.save();
    // Respond with the newly created team
    res.status(200).json(newTeam);
  } catch (err) {
    // Log the error and respond with a server exception message
    console.error(err);
    res.status(500).send('Server Exception');
  }
});

/**
 * @openapi
 * /api/teams:
 *   get:
 *     tags:
 *       - Teams
 *     summary: Retrieve a list of all teams
 *     responses:
 *       200:
 *         description: An array of team documents
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */

// GET endpoint to retrieve all teams
router.get('/', async (req, res) => {
  try {
    // Find all teams in the database
    const teams = await Team.find({});
    // Respond with the list of all teams
    res.status(200).json(teams);
  } catch (err) {
    // Log the error and respond with a server exception message
    console.error(err);
    res.status(500).send('Server Exception');
  }
});

/**
 * @openapi
 * /api/teams/{id}/players:
 *   post:
 *     tags:
 *       - Teams
 *     summary: Assign a player to a team
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The team ID
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
 *               salary:
 *                 type: string
 *     responses:
 *       200:
 *         description: Player document
 *       401:
 *         description: Invalid teamId
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
*/

// POST endpoint to assign a player to a team
router.post('/:id/players', async (req, res) => {
  try {
    // Find the team by id
    const team = await Team.findById(req.params.id);
    // If the team does not exist, respond with an invalid teamId message
    if (!team) {
      return res.status(401).send('Invalid teamId');
    }
    // Add the new player to the team's players array
    team.players.push({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      salary: req.body.salary,
    });
    // Save the updated team to the database
    const updatedTeam = await team.save();
    // Respond with the updated team
    res.status(200).json(updatedTeam);
  } catch (err) {
    // Log the error and respond with a server exception message
    console.error(err);
    res.status(500).send('Server Exception');
  }
});

/**
 * @openapi
 * /api/teams/{id}/players:
 *   get:
 *     tags:
 *       - Teams
 *     summary: Retrieve all players by team id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The team ID
 *     responses:
 *       200:
 *         description: Array of player documents
 *       401:
 *         description: Invalid teamId
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */

// GET endpoint to retrieve all players by team id
router.get('/:id/players', async (req, res) => {
  try {
    // Find the team by id
    const team = await Team.findById(req.params.id);
    // If the team does not exist, respond with an invalid teamId message
    if (!team) {
      return res.status(401).send('Invalid teamId');
    }
    // Respond with the team's players
    res.status(200).json(team.players);
  } catch (err) {
    // Log the error and respond with a server exception message
    console.error(err);
    res.status(500).send('Server Exception');
  }
});

/**
 * @openapi
 * /api/teams/{id}:
 *   delete:
 *     tags:
 *       - Teams
 *     summary: Delete a team by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The team ID
 *     responses:
 *       200:
 *         description: Team document
 *       401:
 *         description: Invalid teamId
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */

// DELETE endpoint to delete a team by id
router.delete('/:id', async (req, res) => {
  try {
    // Find the team by id and delete it
    const team = await Team.findByIdAndDelete(req.params.id);
    // If the team does not exist, respond with an invalid teamId message
    if (!team) {
      return res.status(401).send('Invalid teamId');
    }
    // Respond with the deleted team
    res.status(200).json(team);
  } catch (err) {
    // Log the error and respond with a server exception message
    console.error(err);
    res.status(500).send('Server Exception');
  }
});

// Export the router
module.exports = router;