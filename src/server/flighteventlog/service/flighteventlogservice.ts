import { saveFlightEventLogToDB } from "../db/dbservice";
import { CreateFlightEventLogPayload } from "../struct";

// Create FlightEvent Log
export const CreateFlightEventLogService = async (payload: CreateFlightEventLogPayload) => {
    // Paylod destructuring
    const { flight_id, event_status, event_type, event_name, event_time } = payload;

    // Payload validation
    if(!flight_id || !event_status || !event_type || !event_name || !event_time) {
        throw new Error("All fields are required");
    }

    // Business Logic

    // DB Call
    const result = await saveFlightEventLogToDB(payload)

    // Response
    return result._id
}   
