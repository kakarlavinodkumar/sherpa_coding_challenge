export interface CreateFlightEventPayload {
    flight_id: string; // Reference to Flight
    event_type: string; // Event type (e.g., Pre Travel, Day of Travel)
    event_name: string; // Name of the event
    time: string; // ISO 8601 format
    status: 'Completed' | 'Paused' | 'Pending'; // Status of the event
}

export interface GetFlightEventsPayload {
    flight_id: string
}

export interface GetFlightEventByIDPayload {
    id: string
}

export interface UpdateFlightEventPayload {
    _id: string
    flight_id: string; // Reference to Flight
    event_type: string; // Event type (e.g., Pre Travel, Day of Travel)
    event_name: string; // Name of the event
    time: string; // ISO 8601 format
    status: 'Completed' | 'Paused' | 'Pending'; // Status of the event
}

export interface DeleteFlightEventPayload {
    _id: string
}

export interface CreateFlightEventResponse {
    _id: string // _id of the created flight event
}

export interface GetFlightEventsResponse {
    _id: string
    flight_id: string; // Reference to Flight
    event_type: string; // Event type (e.g., Pre Travel, Day of Travel)
    event_name: string; // Name of the event
    time: string; // ISO 8601 format
    status: 'Completed' | 'Paused' | 'Pending'; // Status of the event
}

export interface GetFlightEventByIDResponse {
    _id: string
    flight_id: string; // Reference to Flight
    event_type: string; // Event type (e.g., Pre Travel, Day of Travel)
    event_name: string; // Name of the event
    time: string; // ISO 8601 format
    status: 'Completed' | 'Paused' | 'Pending'; // Status of the event
}

export interface UpdateFlightEventResponse {
    _id: string
    message: string
}

export interface DeleteFlightEventResponse {
    _id: string
    message: string
}
