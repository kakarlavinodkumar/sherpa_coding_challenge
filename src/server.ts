import express from "express"
import {Server} from "http";
import {getDBConnection} from "./database";
import masterRouter from "./server/route"

export const start = async (): Promise<Server> => new Promise(async (resolve, reject) => {
    try {
        const port = 4040
        const app = express()
        const db = getDBConnection()
        // app.use('/', isAuthenticated) --> middleware authentication check
        // add routing for master route for api's
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
