import { getMongoDBConnection } from "../../../database";
import { getFlightByIDPayload, getFlightsPayload } from "../struct";

const db = getMongoDBConnection();

// Create flight
export const saveFlightToDB = async (payload: any) => {
    // DB logic
    const flight = new db.models.Flight(payload);

    // DB operation
    const createdFlight = await flight.save();

    // Response
    return createdFlight;
};

// Fetch all flights
export const fetchFlightsFromDB = async (payload: getFlightsPayload) => {
    // DB logic
    const filters: any = {
        ...payload
    };

    // DB operation
    const flights = await db.models.Flight.find(filters);

    // Response
    return flights;
};

// Fetch a single flight by ID
export const fetchFlightByIDFromDB = async (payload: getFlightByIDPayload) => {
    // DB logic

    // DB operation
    const flight = await db.models.Flight.findById(payload.id);

    // Response
    return flight;
};

// Update flight by ID
export const updateFlightByIDInDB = async (payload: any) => {
    // DB logic

    // DB operation
    const flight = await db.models.Flight.findByIdAndUpdate(payload._id, payload);

    // Response
    return flight;
};

// Delete flight by ID
export const deleteFlightByIDInDB = async (payload: any) => {
    // DB logic

    // DB operation
    const flight = await db.models.Flight.findByIdAndDelete(payload._id);

    // Response
    return flight;
}