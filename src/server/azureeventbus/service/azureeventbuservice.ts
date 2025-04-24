const { ServiceBusClient } = require("@azure/service-bus");

import { config } from "../../../config/config";

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
                await receiver.completeMessage(message);
            },
            processError: async (err: any) => {
                console.error("Error occurred while processing messages:", err);
            },
        });
    } catch (err: any) {
        const statusCode = typeof err.code === "number" ? err.code : 500;
        throw err;
    } finally {
 
    }
};