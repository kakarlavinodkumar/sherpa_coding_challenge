import { createFlightResponse, deleteFlightPayload, deleteFlightResponse, getFlightByIDPayload, getFlightByIDResponse, getFlightsPayload, getFlightsResponse, updateFlightPayload, updateFlightResponse } from "../struct";
import { fetchFlightsFromDB, fetchFlightByIDFromDB, updateFlightByIDInDB, deleteFlightByIDInDB } from "../db/dbservice";
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

export const updateFlightService = async (payload: updateFlightPayload): Promise<updateFlightResponse> => {
    // Payload destructuring
    const { _id, flightNumber, airline, departure, destination, departureTime, arrivalTime } = payload;
    
    // Payload validation
    if (!_id || !flightNumber || !airline || !departure || !destination || !departureTime || !arrivalTime) {
        throw new Error("All fields are required");
    }

    // Business logic

    // Call DB service
    const flight = await updateFlightByIDInDB(payload);

    // Response
    const response: updateFlightResponse = {
        flight_id: flight._id,
        message: "Flight updated successfully"
    };
    return response;
};

export const deleteFlightService = async (payload: deleteFlightPayload): Promise<deleteFlightResponse> => {
    // Payload destructuring
    const { _id } = payload;
    
    // Payload validation
    if (!_id) {
        throw new Error("_id is required");
    }

    // Business logic

    // Call DB service
    const flight = await deleteFlightByIDInDB(payload);

    // Response
    const response: deleteFlightResponse = {
        _id: flight._id,
        message: "Flight deleted successfully"
    };
    return response;
};