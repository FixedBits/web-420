/*
============================================
; Title:  soto-node-shopper-routes.js
; Author: Victor Soto
; Date:   02/25/2024 
; Source: https://github.com/buwebdev/web-420/blob/master/routes/node-tech-routes.js
;===========================================
*/

const express = require("express");
const router = express.Router();

const Customer = require("../models/soto-customer");

// createCustomer
/**
 * @openapi
 * /api/customers:
 *   post:
 *     tags:
 *       - Customers
 *     name: createCustomer
 *     summary: Create a new customer
 *     requestBody:
 *       description: Create a new customer with three parameters
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - userName
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               userName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/", async (req, res) => {
  try {
    const newCustomer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
    };
    Customer.create(newCustomer, function (err, customer) {
      if (err) {
        res.status(501).send({
          message: `MongoDB Exception:${err}`,
        });
      } else {
        res.json(customer);
      }
    });
  } catch (e) {
    res.status(500).send({
      message: `Server Exception:${e}`,
    });
  }
});

// createInvoiceByUserName
/**
 * @openapi
 * /api/customers/{username}/invoices:
 *   post:
 *     tags:
 *       - Customers
 *     name: createInvoiceByUserName
 *     summary: Create a new invoice for a specific customer
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username of the customer
 *     requestBody:
 *       description: Create a new invoice with five parameters
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - subtotal
 *               - tax
 *               - dateCreated
 *               - dateShipped
 *               - lineItems
 *             properties:
 *               subtotal:
 *                 type: number
 *               tax:
 *                 type: number
 *               dateCreated:
 *                 type: string
 *               dateShipped:
 *                 type: string
 *               lineItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     quantity:
 *                       type: number
 *     responses:
 *       '200':
 *         description: Invoice added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/:username/invoices", async (req, res) => {
  try {
    // Query the customers collection using the findOne() function and the username from the RequestParams object
    const customer = await Customer.findOne({ userName: req.params.username });

    if (!customer) {
      return res.status(404).send({ message: `Customer not found` });
    }

    // Create an object literal named newInvoice and map the values from the RequestBody to its properties
    const newInvoice = {
      subtotal: req.body.subtotal,
      tax: req.body.tax,
      dateCreated: req.body.dateCreated,
      dateShipped: req.body.dateShipped,
      lineItems: req.body.lineItems,
    };

    // Call the push() function off of the invoices array and pass-in the newInvoice object literal
    customer.invoices.push(newInvoice);

    // Call the save() function on the Customer model and save the results to MongoDB
    await customer.save();

    res.status(200).send({ message: `Invoice added to MongoDB` });
  } catch (e) {
    res.status(500).send({
      message: `Server Exception:${e}`,
    });
  }
});

// findAllInvoicesByUserName
/**
 * @openapi
 * /api/customers/{username}/invoices:
 *   get:
 *     tags:
 *       - Customers
 *     name: findAllInvoicesByUserName
 *     summary: Find all invoices for a specific customer
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username of the customer
 *     responses:
 *       '200':
 *         description: Invoices retrieved from MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get("/:username/invoices", async (req, res) => {
  try {
    // Query the customers collection using the findOne() function and the username from the RequestParams object
    const customer = await Customer.findOne({ userName: req.params.username });

    if (!customer) {
      return res.status(404).send({ message: `Customer not found` });
    }

    // Return the results using the res.json() function
    res.status(200).json(customer.invoices);
  } catch (e) {
    res.status(500).send({
      message: `Server Exception:${e}`,
    });
  }
});

module.exports = router;

