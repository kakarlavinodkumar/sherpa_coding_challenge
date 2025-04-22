import express from "express";


import { HTTP_RESPONSE_CODES } from "../../../appconstants/httpresponsecodes";
import { CreateMessagePayload, DeleteMessagePayload, DeleteMessageResponse, GetMessageByIDPayload, GetMessagesPayload, UpdateMessagePayload, UpdateMessageResponse } from "../struct";
import { createMessageService, deleteMessageService, getMessageByIDService, getMessagesService, updateMessageService } from "../service/messageservice";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: API for managing messages
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMessagePayload'
 *     responses:
 *       201:
 *         description: Message created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all messages
 *     tags: [Messages]
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Filter for messages
 *     responses:
 *       200:
 *         description: List of messages
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a message by ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The message ID
 *     responses:
 *       200:
 *         description: Message details
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /:
 *   patch:
 *     summary: Update a message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateMessagePayload'
 *     responses:
 *       200:
 *         description: Message updated successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /:
 *   delete:
 *     summary: Delete a message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteMessagePayload'
 *     responses:
 *       200:
 *         description: Message deleted successfully
 *       400:
 *         description: Bad request
 */

router.post("/", async (req, res) => {
    try {
        // Payload
        const payload: CreateMessagePayload = req.body;

        // Service call
        const response = await createMessageService(payload);

        // Response
        res.status(HTTP_RESPONSE_CODES.CREATED).json({ message: "Message created successfully" });
    } catch (err: any) {
        res.status(err.code || HTTP_RESPONSE_CODES.BAD_REQUEST).json({ message: err.message ||  "Bad request" });
    }
});

router.get("/", async (req, res) => {
    try {
        // Payload
        const payload: GetMessagesPayload =<any>req.query;

        // Service call
        const response = await getMessagesService(payload);

        // Response
        res.status(HTTP_RESPONSE_CODES.SUCCESS).json(response);
    } catch (err: any) {
        res.status(err.code || HTTP_RESPONSE_CODES.BAD_REQUEST).json({ message: err.message ||  "Bad request" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        // Payload
        const id = req.params.id;
        const payload: GetMessageByIDPayload = { id };

        // Service call
        const response = await getMessageByIDService(payload);

        // Response
        res.status(HTTP_RESPONSE_CODES.SUCCESS).json(response);
    } catch (err: any) {
        res.status(err.code || HTTP_RESPONSE_CODES.BAD_REQUEST).json({ message: err.message ||  "Bad request" });
    }
});

router.patch("/", async (req, res) => {
    try {
        // Payload
        const payload: UpdateMessagePayload = req.body;

        // Service call
        const response: UpdateMessageResponse = await updateMessageService(payload);

        // Response
        res.status(HTTP_RESPONSE_CODES.SUCCESS).json(response);
    } catch (err: any) {
        res.status(err.code || HTTP_RESPONSE_CODES.BAD_REQUEST).json({ message: err.message ||  "Bad request" });
    }
});

router.delete("/", async (req, res) => {
    try {
        // Payload
        const payload: DeleteMessagePayload = req.body;

        // Service call
        const response: DeleteMessageResponse = await deleteMessageService(payload);

        // Response
        res.status(HTTP_RESPONSE_CODES.SUCCESS).json(response);
    } catch (err: any) {
        res.status(err.code || HTTP_RESPONSE_CODES.BAD_REQUEST).json({ message: err.message ||  "Bad request" });
    }
});

export default router;
