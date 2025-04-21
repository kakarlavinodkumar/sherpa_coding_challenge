import express from "express"
import {Server} from "http";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

import {getDBConnection} from "./database";
import masterRouter from "./server/route"
import { SWAGGER_SCHEMA } from "./swagger/schema";
import { BASE_PATH } from "./appconstants/constants";

export const start = async (): Promise<Server> => new Promise(async (resolve, reject) => {
    try {
        const port = 4040
        
        const app = express();
        app.use(express.json());
        
        const db = getDBConnection()

        // app.use('/', isAuthenticated) --> middleware authentication check
        // add routing for master route for api's

        const swaggerOptions = {
            swaggerDefinition: {
                openapi: "3.0.0",
                info: {
                    title: "API Documentation",
                    version: "1.0.0",
                    description: "API documentation for the project",
                },
                servers: [
                    {
                        url: BASE_PATH,
                    },
                ],
                components: {
                    schemas: {
                        ...SWAGGER_SCHEMA
                    }
                }
            },
            apis: ["./src/server/flight/api/*.ts", "./src/server/message/api/*.ts"], 

        };

        const swaggerDocs = swaggerJsDoc(swaggerOptions);
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
        app.use('/api', masterRouter);
        app.get('/', (req, res) => {
            res.send("Hello");
        })
        
        const server = app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
            resolve(server)
        })
    } catch (err) {
        reject(err)
    }
})
