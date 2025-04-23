import express from "express";
import { config } from "../../../config/config";

const { ServiceBusClient } = require("@azure/service-bus");

const connectionString = config.AZURE_BUS_CONNECTION_STRING;
const topicName = "flightevents"; 

const router = express.Router();

router.post("/", async (req, res) => {
    const sbClient = new ServiceBusClient(connectionString);
    const sender = sbClient.createSender(topicName);

    try {
        const message = {
            body: {
                flightNumber: "AS100",
                airline: "Alaska Airlines",
                departure: "Los Angeles",
                destination: "Seattle",
                departureTime: "2025-04-18T10:00:00",
                arrivalTime: "2025-04-18T12:00:00",
                event: "6 days before pre order food"
            },
            contentType: "application/json",
            label: "FlightEvent",
        };

        await sender.sendMessages(message);
    } catch (err: any) {
        const statusCode = typeof err.code === "number" ? err.code : 500;
        res.status(statusCode).json({ message: err.message || "An error occurred." });
    } finally {
        await sender.close();
        await sbClient.close();
    }

    return res.json({success:1});
});

router.get("/", async (req, res) => {
    const subscriptionName = "FlightEventProcessor"; 

    const sbClient = new ServiceBusClient(connectionString);
    const receiver = sbClient.createReceiver(topicName, subscriptionName);

    try {
        const messages = await receiver.receiveMessages(1, { maxWaitTimeInMs: 5000 });

        for (const message of messages) {
            // Complete the message to remove it from the subscription
            await receiver.completeMessage(message);
        }
    } catch (err: any) {
        const statusCode = typeof err.code === "number" ? err.code : 500;
        res.status(statusCode).json({ message: err.message || "An error occurred." });
    } finally {
        await receiver.close();
        await sbClient.close();
    }
    return res.json({ success: 1 });
});

export default router;