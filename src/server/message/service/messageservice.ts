

// service to call dbservice and create message
import { CreateMessagePayload, GetMessagesPayload, GetMessageByIDPayload, UpdateMessagePayload, DeleteMessagePayload } from "../struct";
import { saveMessageToDB, fetchMessagesByFlightIDFromDB, fetchMessageByIDFromDB, updateMessageByIDInDB, deleteMessageByIDInDB } from "../db/dbservice"; 
import { CreateMessageResponse, GetMessagesResponse, GetMessageByIDResponse, UpdateMessageResponse, DeleteMessageResponse } from "../struct";

export const createMessageService = async (payload: CreateMessagePayload): Promise<CreateMessageResponse> => {
    // Payload destructuring
    const { flightId, message } = payload;

    // Payload validation
    if (!flightId || !message) {
        throw new Error("All fields are required");
    }

    // Business logic

    // Call DB service
    const result = await saveMessageToDB(payload);

    // Response
    const response: CreateMessageResponse = {
        _id: result._id
    };
    return response;
}

export const getMessagesService = async (payload: GetMessagesPayload): Promise<GetMessagesResponse[]> => {
    // Payload destructuring
    const { flight_id } = payload;

    // Payload validation
    if (!flight_id) {
        throw new Error("Flight ID is required");
    }

    // Business logic

    // Call DB service
    const messages = await fetchMessagesByFlightIDFromDB(payload);

    // Response
    return messages;
}

export const getMessageByIDService = async (payload: GetMessageByIDPayload): Promise<GetMessageByIDResponse> => {
    // Payload destructuring
    const { id } = payload;

    // Payload validation
    if (!id) {
        throw new Error("Message ID is required");
    }

    // Business logic

    // Call DB service
    const message = await fetchMessageByIDFromDB(payload);

    // Response
    return message;
}

export const updateMessageService = async (payload: UpdateMessagePayload): Promise<UpdateMessageResponse> => {
    // Payload destructuring
    const { _id, flightId, message } = payload;

    // Payload validation
    if (!_id || !flightId || !message) {
        throw new Error("All fields are required");
    }

    // Business logic

    // Call DB service
    const result = await updateMessageByIDInDB(payload);

    // Response
    const response: UpdateMessageResponse = {
        _id: result._id,
        message: "Message updated successfully"
    };
    return response;
}

export const deleteMessageService = async (payload: DeleteMessagePayload): Promise<DeleteMessageResponse> => {
    // Payload destructuring
    const { _id } = payload;

    // Payload validation
    if (!_id) {
        throw new Error("Message ID is required");
    }

    // Business logic

    // Call DB service
    const result = await deleteMessageByIDInDB(payload);

    // Response
    const response: DeleteMessageResponse = {
        _id: result._id,
        message: "Message deleted successfully"
    };
    return response;
}