export const SWAGGER_SCHEMA = {
    createFlightPayload: {
        type: "object",
        properties: {
            flightNumber: { type: "string" },
            airline: { type: "string" },
            departure: { type: "string" },
            destination: { type: "string" },
            departureTime: { type: "string", format: "date-time" },
            arrivalTime: { type: "string", format: "date-time" },
        },
        required: ["flightNumber", "airline", "departure", "destination", "departureTime", "arrivalTime"],
    },
    createFlightResponse: {
        type: "object",
        properties: {
            flight_id: { type: "string" },
        },
    },
    getFlightsPayload: {
        type: "object",
        properties: {
            departureDate: { type: "string", format: "date-time" },
            destination: { type: "string" },
        },
    },
    getFlightsResponse: {
        type: "object",
        properties: {
            flightNumber: { type: "string" },
            airline: { type: "string" },
            departure: { type: "string" },
            destination: { type: "string" },
            departureTime: { type: "string", format: "date-time" },
            arrivalTime: { type: "string", format: "date-time" },
        },
    },
    getFlightByIDResponse: {
        type: "object",
        properties: {
            flightNumber: { type: "string" },
            airline: { type: "string" },
            departure: { type: "string" },
            destination: { type: "string" },
            departureTime: { type: "string", format: "date-time" },
            arrivalTime: { type: "string", format: "date-time" },
        },
    },
    updateFlightPayload: {
        type: "object",
        properties: {
            flight_id: { type: "string" },
            flightNumber: { type: "string" },
            airline: { type: "string" },
            departure: { type: "string" },
            destination: { type: "string" },
            departureTime: { type: "string", format: "date-time" },
            arrivalTime: { type: "string", format: "date-time" },
        },
        required: ["flight_id"],
    },
    updateFlightResponse: {
        type: "object",
        properties: {
            success: { type: "boolean" },
        },
    },
    deleteFlightPayload: {
        type: "object",
        properties: {
            flight_id: { type: "string" },
        },
        required: ["flight_id"],
    },
    deleteFlightResponse: {
        type: "object",
        properties: {
            success: { type: "boolean" },
        },
    },
};