import { updateFlightByIDInDB } from "../../flight/db/dbservice";
import { deleteFlightEventByIDInDB, fetchFlightEventByIDFromDB, fetchFlightEventsByFlightIDFromDB, saveFlightEventToDB } from "../db/dbservice";
import { CreateFlightEventPayload, CreateFlightEventResponse, DeleteFlightEventPayload, DeleteFlightEventResponse, GetFlightEventByIDPayload, GetFlightEventByIDResponse, GetFlightEventsPayload, GetFlightEventsResponse, UpdateFlightEventPayload, UpdateFlightEventResponse } from "../struct";

// Create Flight Event
export const CreateFlightEventService = async (payload: CreateFlightEventPayload): Promise<CreateFlightEventResponse> => {
    // Payload destructuring
    const { flight_id, event_type, event_name, time, status } = payload;

    // Payload validation
    if(!flight_id || !event_type || !event_name || !time || !status) {
        throw new Error("All fields are required");
    }

    // Business Logic

    // DB Call
    const result = await saveFlightEventToDB(payload);

    // Response
    return {
        _id: result.id
    }
}

export const GetFlightEventsService = async (payload: GetFlightEventsPayload): Promise<GetFlightEventsResponse[]> => {
    // Payload destructuring
    const { flight_id } = payload;

    // Payload validation
    if(!flight_id) {
        throw new Error("All fields are required");
    }

    // Business Logic

    // DB Call
    const result = await fetchFlightEventsByFlightIDFromDB(payload);

    // Response
    return result
}

export const GetFlightEventByIDService = async (payload: GetFlightEventByIDPayload): Promise<GetFlightEventByIDResponse[]> => {
    // Payload destructuring
    const { id } = payload;

    // Payload validation
    if (!id) {
        throw new Error("Flight Event ID is required");
    }

    // Business Logic

    // DB Call
    const result = await fetchFlightEventByIDFromDB(payload);

    // Response
    return result;
}

export const UpdateFlightEventService = async (payload: UpdateFlightEventPayload): Promise<UpdateFlightEventResponse> => {
    // Payload destructuring
    const { _id, flight_id, event_type, event_name, time, status } = payload;

    // Payload validation
    if (!_id || !flight_id || !event_type || !event_name || !time || !status) {
        throw new Error("All fields are required");
    }

    // Business Logic

    // DB Call
    const result = await updateFlightByIDInDB(payload);

    // Response
    return {
        _id: result.id,
        message: "Flight event updated successfully"
    };
}

export const DelteFlightEventService = async (payload: DeleteFlightEventPayload): Promise<DeleteFlightEventResponse> => {
    // Payload destructuring
    const { _id } = payload;

    // Payload validation
    if (!_id) {
        throw new Error("Flight Event ID is required");
    }

    // Business Logic

    // DB Call
    const result = await fetchFlightEventByIDFromDB({ id: _id });
    if (!result) {
        throw new Error("Flight event not found");
    }

    // Assuming a deleteFlightEventFromDB function exists in the DB service
    await deleteFlightEventByIDInDB(payload);

    // Response
    return {
        _id,
        message: "Flight event deleted successfully"
    };
}