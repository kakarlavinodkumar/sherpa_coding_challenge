import express from "express";

import { getFlightsService, getFlightByIDService, createFlightService, updateFlightService, deleteFlightService } from "../service/flightservice";
import { getFlightsPayload, getFlightByIDPayload, createFlightPayload, createFlightResponse, getFlightsResponse, getFlightByIDResponse, updateFlightPayload, updateFlightResponse, deleteFlightPayload, deleteFlightResponse } from "../struct";
import { HTTP_RESPONSE_CODES } from "../../../appconstants/httpresponsecodes";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Flights
 *   description: API for managing flights
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new flight
 *     tags: [Flights]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createFlightPayload'
 *     responses:
 *       201:
 *         description: Flight created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/createFlightResponse'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all flights
 *     tags: [Flights]
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           $ref: '#/components/schemas/getFlightsPayload'
 *         required: false
 *         description: Filter criteria for flights
 *     responses:
 *       200:
 *         description: List of flights
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/getFlightsResponse'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /{flightId}:
 *   get:
 *     summary: Get flight by ID
 *     tags: [Flights]
 *     parameters:
 *       - in: path
 *         name: flightId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the flight
 *     responses:
 *       200:
 *         description: Flight details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/getFlightByIDResponse'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /:
 *   patch:
 *     summary: Update a flight
 *     tags: [Flights]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateFlightPayload'
 *     responses:
 *       200:
 *         description: Flight updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/updateFlightResponse'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /:
 *   delete:
 *     summary: Delete a flight
 *     tags: [Flights]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/deleteFlightPayload'
 *     responses:
 *       200:
 *         description: Flight deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/deleteFlightResponse'
 *       400:
 *         description: Bad request
 */

// Create Flight
router.post("/", async (req, res) => {
    try {
        // Payload
        const flightData: createFlightPayload = req.body;

        // Service call
        const response: createFlightResponse = await createFlightService(flightData);

        // Response
        return res.status(HTTP_RESPONSE_CODES.CREATED).json(response);
    } catch (err: any) {
        res.status(err.code || 400).json({ message: err.message || "Error occurred while saving flight data" });
    }
});


// GET Flights
router.get("/", async (req, res) => {
    try {
        // Payload
        const payload: getFlightsPayload = req.query;
        
        // Service call
        const response: getFlightsResponse[] = await getFlightsService(payload);
        
        // Response
        return res.json(response);
    } catch (err: any) {
        res.status(err.code || HTTP_RESPONSE_CODES.BAD_REQUEST).json({ message: err.message || "Error occurred while getting data" });
    }
});

// GET FlightByID
router.get("/:flightId", async (req, res) => {
    try {
        // Payload
        const flight_id = req.params.flightId;
        const payload: getFlightByIDPayload = { id: flight_id };

        // Service call
        const response: getFlightByIDResponse = await getFlightByIDService(payload);

        // Response
        return res.json(response);
    } catch (err: any) {
        res.status(err.code || HTTP_RESPONSE_CODES.BAD_REQUEST).json({ message: err.message || "Error occurred while getting data" });
    }
});

// Update Flight
router.patch("/", async (req, res) => { 
    try {
        // Payload
        const payload: updateFlightPayload = req.body;

        // Service call
        const response: updateFlightResponse = await updateFlightService(payload);

        // Response
        return res.json(response);
    } catch (err: any) {
        res.status(err.code || HTTP_RESPONSE_CODES.BAD_REQUEST).json({ message: err.message || "Error occurred while updating data" });
    }
});

// Delete Flight
router.delete("/", async (req, res) => { 
    try {
        // Payload
        const payload: deleteFlightPayload = req.body;

        // Service call
        const response: deleteFlightResponse = await deleteFlightService(payload);

        // Response
        return res.json(response);
    } catch (err: any) {
        res.status(err.code || HTTP_RESPONSE_CODES.BAD_REQUEST).json({ message: err.message || "Error occurred while deleting data" });
    }
});

export default router;