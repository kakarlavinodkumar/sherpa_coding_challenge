export interface CreateMessagePayload {
    flightId: string; // Flight ID
    message: string; // Message content
}

export interface GetMessagesPayload {
    flight_id: string; // Flight ID
}

export interface GetMessageByIDPayload {
    id: string; // Message ID
}

export interface UpdateMessagePayload {
    _id: string; // Message ID
    flightId: string; // Flight ID
    message: string; // Message content
}

export interface DeleteMessagePayload {
    _id: string; // Message ID
}

export interface CreateMessageResponse {
    _id: string; // ID of the created message
}

export interface GetMessagesResponse {
    _id: string; // Message ID
    flightId: string; // Flight ID
    message: string; // Message content
}

export interface GetMessageByIDResponse {
    _id: string; // Message ID  
    flightId: string; // Flight ID
    message: string; // Message content
}

export interface UpdateMessageResponse {
    _id: string; // ID of the updated message
    message: string; // Success message
}

export interface DeleteMessageResponse {
    _id: string; // ID of the deleted message
    message: string; // Success message
}
