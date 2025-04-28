import { getMongoDBConnection } from "../../../database";
import { CreateFlightEventLogPayload } from "../struct";

const db = getMongoDBConnection();

// Create FlightEventLog
export const saveFlightEventLogToDB = async (payload: CreateFlightEventLogPayload) => {
    // DB logic
    const flightEventLog = new db.models.FlightEventLog(payload);

    // DB operation
    const createdFlightEventLog = await flightEventLog.save();

    // Response
    return createdFlightEventLog;
};
