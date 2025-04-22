import mongoose from "mongoose"
import {join} from "path"
import { ref } from "process"
import {Database} from "sqlite3"

let db: Database

const dbLocation = join(__dirname, '../data/myDb.db')

export const getDBConnection = (): Database => {

    if(!db) {
        const sqlite3 = require('sqlite3').verbose();
        db = new sqlite3.Database(dbLocation)
    }
    return db
}

export const getMongoDBConnection = (): mongoose.Connection => {

    const uri = process.env.DB_URI || 'mongodb://localhost:27017/local_db';
    
    const FlightSchema = new mongoose.Schema({
        flightNumber: { type: String, required: true },
        airline: { type: String, required: true },
        departure: { type: String, required: true },
        destination: { type: String, required: true },
        departureTime: { type: Date, required: true },
        arrivalTime: { type: Date, required: true },
    }, { timestamps: true });

    if(!mongoose.models.Flight) {
        mongoose.model('Flight', FlightSchema);
    }

    const MessageSchema = new mongoose.Schema({
        message: { type: String, required: true },
        flight_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' },
    }, { timestamps: true });

    if(!mongoose.models.Message) {
        mongoose.model('Message', MessageSchema);
    }

    const FlightEventSchema = new mongoose.Schema({
        flight_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight'},
        event_type: { type: String, required: true},
        event_name: { type: String, required: true},
        time: { type: Date, required: true},
        status: { type: String, enum: ["Completed", "Paused", "Pending"], required: true }
    }, { timestamps : true });

    if(!mongoose.models.FlightEvent) {
        mongoose.model("FlightEvent", FlightEventSchema);
    }

    mongoose.connect(uri)
        .then(() => 
        {
            console.log('MongoDB connection established successfully');
        })
        .catch((err: any) => {
            console.error('Error connecting to MongoDB:', err);
            process.exit(1); // Exit the process if connection fails
        });
    
    return mongoose.connection;
}
