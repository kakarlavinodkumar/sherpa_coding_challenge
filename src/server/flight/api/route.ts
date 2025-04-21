import express from "express";

import { getFlightsService, getFlightByIDService, createFlightService } from "../service/flightservice";
import { getFlightsPayload, getFlightByIDPayload, createFlightPayload, createFlightResponse, getFlightsResponse, getFlightByIDResponse } from "../struct";
import { HTTP_RESPONSE_CODES } from "../../../appconstants/httpresponsecodes";

const router = express.Router();

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

export default router;