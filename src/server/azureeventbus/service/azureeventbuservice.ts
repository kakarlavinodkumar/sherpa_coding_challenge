const { ServiceBusClient } = require("@azure/service-bus");

import { FLIGHT_EVENT_STATUS_PAUSED } from "../../../appconstants/constants";
import { config } from "../../../config/config";
import { GetFlightEventByFiltersService } from "../../flightevent/service/flighteventservice";
import { CreateFlightEventLogService } from "../../flighteventlog/service/flighteventlogservice";
import { sendEmail } from "../../../utils/emailservice";

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

                console.log("flight_event : ", flight_event);
                if(flight_event && flight_event.flight_id) {
                    CreateFlightEventLogService({
                        flight_id: flight_event.flight_id._id,
                        event_status: flight_event.status.toLowerCase(),
                        event_type: flight_event.event_type,
                        event_name: flight_event.event_name,
                        event_time: flight_event.time
                    });
                } else {
                    // Send the flight event notification
                    const emailBody = `
                        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                            <h2 style="color: #0078D4;">Flight Event Notification</h2>
                            <p>Dear User,</p>
                            <p>A new flight event has been received with the following details:</p>
                            <table style="border-collapse: collapse; width: 100%; margin-top: 10px;">
                                <tr>
                                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Key</th>
                                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Value</th>
                                </tr>
                                ${Object.entries(message.body).map(([key, value]) => `
                                    <tr>
                                        <td style="border: 1px solid #ddd; padding: 8px;">${key}</td>
                                        <td style="border: 1px solid #ddd; padding: 8px;">${value}</td>
                                    </tr>
                                `).join('')}
                            </table>
                            <p>Thank you,</p>
                            <p>The Flight Event Team</p>
                        </div>
                    `;

                    await sendEmail(
                        "vinodkakarla5642@gmail.com",
                        "Flight Event Notification",
                        "",
                        emailBody
                    );
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