import express from "express";
import { CreateFlightEventPayload, CreateFlightEventResponse, DeleteFlightEventPayload, DeleteFlightEventResponse, GetFlightEventByIDPayload, GetFlightEventsPayload, GetFlightEventsResponse, UpdateFlightEventPayload, UpdateFlightEventResponse } from "../struct";
import { CreateFlightEventService, GetFlightEventByIDService, GetFlightEventsService, UpdateFlightEventService } from "../service/flighteventservice";
import { HTTP_RESPONSE_CODES } from "../../../appconstants/httpresponsecodes";
import { deleteFlightService } from "../../flight/service/flightservice";

const router = express.Router();

router.post("/", async (req, res) => {
     try {
        // Payload
        const flightEventPayload: CreateFlightEventPayload = req.body;

        // Service call
        const response: CreateFlightEventResponse = await CreateFlightEventService(flightEventPayload);

        // Response
        return res.status(HTTP_RESPONSE_CODES.CREATED).json(response);
        } catch (err: any) {
            res.status(err.code || 400).json({ message: err.message || "Error occurred while saving flight event data" });
        }
});

router.get("/", async (req, res) => {
    try {
        // Paylod
        const payload: GetFlightEventsPayload = <any>req.query;

        // Service call
        const response: GetFlightEventsResponse[] = await GetFlightEventsService(payload);

        // Response
        return res.status(HTTP_RESPONSE_CODES.SUCCESS).json(response);
    } catch (err: any) {
        res.status(err.code || 400).json({ message: err.message || "Error occurred while getting flight event data" });
    }
});

router.get("/:flightID", async (req, res) => {
    try {
        // Paylod
        const payload: GetFlightEventByIDPayload = <any>req.query;

        // Service call
        const response: GetFlightEventsResponse[] = await GetFlightEventByIDService(payload);

        // Response
        return res.status(HTTP_RESPONSE_CODES.SUCCESS).json(response);
    } catch (err: any) {
        res.status(err.code || 400).json({ message: err.message || "Error occurred while getting flight event data" });
    }
});

// Update FlightEvent
router.patch("/", async (req, res) => { 
    try {
        // Payload
        const payload: UpdateFlightEventPayload = req.body;

        // Service call
        const response: UpdateFlightEventResponse = await UpdateFlightEventService(payload);

        // Response
        return res.json(response);
    } catch (err: any) {
        res.status(err.code || HTTP_RESPONSE_CODES.BAD_REQUEST).json({ message: err.message || "Error occurred while updating data" });
    }
});

// Delete FlightEvent
router.delete("/", async (req, res) => { 
    try {
        // Payload
        const payload: DeleteFlightEventPayload = req.body;

        // Service call
        const response: DeleteFlightEventResponse = await deleteFlightService(payload);

        // Response
        return res.json(response);
    } catch (err: any) {
        res.status(err.code || HTTP_RESPONSE_CODES.BAD_REQUEST).json({ message: err.message || "Error occurred while deleting data" });
    }
});

export default router;