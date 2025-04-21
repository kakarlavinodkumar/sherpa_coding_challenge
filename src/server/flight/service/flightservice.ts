import { createFlightResponse, getFlightByIDPayload, getFlightByIDResponse, getFlightsPayload, getFlightsResponse } from "../struct";
import { fetchFlightsFromDB, fetchFlightByIDFromDB } from "../db/dbservice";
import { createFlightPayload } from "../struct";
import { saveFlightToDB } from "../db/dbservice";

export const createFlightService = async (payload: createFlightPayload): Promise<createFlightResponse> => {
    // Payload destructuring
    const { flightNumber, airline, departure, destination, departureTime, arrivalTime } = payload;

    // Payload validation
    if (!flightNumber || !airline || !departure || !destination || !departureTime || !arrivalTime) {
        throw new Error("All fields are required");
    }

    // Business logic

    // Call DB service
    const result = await saveFlightToDB(payload);
    
    // Response
    const response: createFlightResponse = {
        flight_id: result.id
    }
    return response;
};

export const getFlightsService = async (payload: getFlightsPayload): Promise<getFlightsResponse[]> => {
    // Payload destructuring
    const { } = payload;

    // Payload validation

    // Business logic

    // Call DB service
    const flights = await fetchFlightsFromDB(payload);

    // Response
    const response = {
        ...flights
    };
    return response;
};

export const getFlightByIDService = async (payload: getFlightByIDPayload): Promise<getFlightByIDResponse> => {
    // Payload destructuring
    const { id } = payload;

    // Payload validation
    if (!id) {
        throw new Error("Flight ID is required");
    }

    // Business logic

    // Call DB service
    const flight = await fetchFlightByIDFromDB(payload);

    // Response
    return flight;
};