import { getMongoDBConnection } from "../../../database";
import { CreateFlightEventPayload, CreateFlightEventResponse, DeleteFlightEventPayload, GetFlightEventByIDPayload, GetFlightEventsPayload, UpdateFlightEventPayload } from "../struct";

const db = getMongoDBConnection();

// Create FlightEvent
export const saveFlightEventToDB = async (payload: CreateFlightEventPayload) => {
    // DB logic
    const flightEvent = new db.models.FlightEvent(payload);

    // DB operation
    const createdFlightEvent = await flightEvent.save();

    // Response
    return createdFlightEvent;
};

// Fetch FlightEvents by flight ID
export const fetchFlightEventsByFlightIDFromDB = async (payload: GetFlightEventsPayload) => {
    // DB logic
    const filters: any = {
        flight_id: payload.flight_id
    };

    // DB operation
    const flightEvents = await db.models.FlightEvent.find(filters);

    // Response
    return flightEvents;
}

// Fetch a flight event by ID
export const fetchFlightEventByIDFromDB = async (payload: GetFlightEventByIDPayload) => {
    // DB logic

    // DB operation
    const flightEvent = await db.models.FlightEvent.findById(payload.id);

    // Response
    return flightEvent;
};

// Update flight event by ID
export const updateFlightEventByIDInDB = async (payload: UpdateFlightEventPayload) => {
    // DB logic

    // DB operation
    const flightEvent = await db.models.FlightEvent.findByIdAndUpdate(payload._id, payload);

    // Response
    return flightEvent;
}

// Delete message by ID
export const deleteFlightEventByIDInDB = async (payload: DeleteFlightEventPayload) => {
    // DB logic

    // DB operation
    const flightEvent = await db.models.FlightEvent.findByIdAndDelete(payload._id);

    // Response
    return flightEvent;
};
