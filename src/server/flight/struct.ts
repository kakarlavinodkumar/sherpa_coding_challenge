// Create Flight Payload
export interface createFlightPayload {
    flightNumber: string; // Flight number
    airline: string; // Airline name
    departure: string; // Departure location
    destination: string; // Destination location
    departureTime: string; // Departure time in ISO format
    arrivalTime: string; // Arrival time in ISO format
}

// Get Flights Payload
export interface getFlightsPayload {

}

// Get Flight By ID Payload
export interface getFlightByIDPayload {
    id: string;
}

export interface updateFlightPayload {
    _id: string; // Flight ID
    flightNumber: string; // Flight number
    airline: string; // Airline name
    departure: string; // Departure location
    destination: string; // Destination location
    departureTime: string; // Departure time in ISO format
    arrivalTime: string; // Arrival time in ISO format
}

export interface deleteFlightPayload {
    _id: string; // Flight ID to be deleted
}

// Create Flight Response
export interface createFlightResponse {
    flight_id: string; // ID of the created flight
}

// Get Flights Response
export interface getFlightsResponse {
    _id: string; // Flight ID
    flightNumber: string; // Flight number
    airline: string; // Airline name
    departure: string; // Departure location
    destination: string; // Destination location
    departureTime: string; // Departure time in ISO format
    arrivalTime: string; // Arrival time in ISO format
}

// Get Flight By ID Response
export interface getFlightByIDResponse {
    _id: string;
    flightNumber: string; // Flight number
    airline: string; // Airline name
    departure: string; // Departure location
    destination: string; // Destination location
    departureTime: string; // Departure time in ISO format
    arrivalTime: string; // Arrival time in ISO format
}

export interface updateFlightResponse {
    flight_id: string; // ID of the updated flight
    message: string; // Success message
}

export interface deleteFlightResponse {
    _id: string; // ID of the deleted flight
    message: string; // Success message
}