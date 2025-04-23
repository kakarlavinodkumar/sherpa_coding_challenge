//Master routing file to route all the api's
import express from "express"
import eventRoute from "./event/api/route"
import flightRoutes from "./flight/api/route";
import messageRoutes from "./message/api/route";
import flightEventRoutes from "./flightevent/api/route";
import azureEventBusRoutes from "./azureeventbus/api/route";

const router = express.Router();

//Authorization check for event api's
// app.use("/event", isAuthorized)
// routing for event api's
router.use("/events", eventRoute);
router.use("/flights", flightRoutes);
router.use("/messages", messageRoutes);
router.use("/flightevents", flightEventRoutes);
router.use("/azureeventbus", azureEventBusRoutes);
// router.use("/another_route", anotherRoute); 

export default router;