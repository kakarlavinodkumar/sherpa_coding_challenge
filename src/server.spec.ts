import { Server } from "http";
import {start} from "../server";
import express from "express"
import axios from "axios"
// const app = express()
import { BASE_PATH } from "../constants";

describe('event apis', () => {
    it('starts server and returns server instance', async () => {
        const response = await axios.get(`${BASE_PATH}/api/events`);
        const events = response.data;
        expect(events).toBe(Array);
    });
});
