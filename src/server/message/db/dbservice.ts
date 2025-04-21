import { getMongoDBConnection } from "../../../database";
import { GetMessageByIDPayload, GetMessagesPayload } from "../struct";

const db = getMongoDBConnection();

// Create message
export const saveMessageToDB = async (payload: any) => {
    // DB logic
    const message = new db.models.Message(payload);

    // DB operation
    const createdMessage = await message.save();

    // Response
    return createdMessage;
};

// Fetch Messages by flight ID
export const fetchMessagesByFlightIDFromDB = async (payload: GetMessagesPayload) => {
    // DB logic
    const filters: any = {
        flight_id: payload.flight_id
    };

    // DB operation
    const messages = await db.models.Message.find(filters);

    // Response
    return messages;
}

// Fetch a single message by ID
export const fetchMessageByIDFromDB = async (payload: GetMessageByIDPayload) => {
    // DB logic

    // DB operation
    const message = await db.models.Message.findById(payload.id);

    // Response
    return message;
};

// Update message by ID
export const updateMessageByIDInDB = async (payload: any) => {
    // DB logic

    // DB operation
    const message = await db.models.Message.findByIdAndUpdate(payload._id, payload);

    // Response
    return message;
}

// Delete message by ID
export const deleteMessageByIDInDB = async (payload: any) => {
    // DB logic

    // DB operation
    const message = await db.models.Message.findByIdAndDelete(payload._id);

    // Response
    return message;
};
