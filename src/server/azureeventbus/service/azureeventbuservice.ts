const { ServiceBusClient } = require("@azure/service-bus");

import { FLIGHT_EVENT_STATUS_PAUSED } from "../../../appconstants/constants";
import { config } from "../../../config/config";
import { GetFlightEventByFiltersService } from "../../flightevent/service/flighteventservice";

export const FlightEventsConsumer = () => {
    try {
        const connectionString = config.AZURE_BUS_CONNECTION_STRING;
        const topicName = "flightevents";
        const subscriptionName = "FlightEventProcessor";

        const sbClient = new ServiceBusClient(connectionString);
        const receiver = sbClient.createReceiver(topicName, subscriptionName);

        receiver.subscribe({
            processMessage: async (message: any) => {
                console.log("Processing message:", message.body);
                const flight_event =  await GetFlightEventByFiltersService(message.body);
                if(flight_event && flight_event.status == FLIGHT_EVENT_STATUS_PAUSED) {
                    
                }
                console.log("flight_event : ", flight_event);
                await receiver.completeMessage(message);
            },
            processError: async (err: any) => {
                console.error("Error occurred while processing messages:", err);
            },
        });
    } catch (err: any) {
        throw err;
    } finally {
 
    }
};