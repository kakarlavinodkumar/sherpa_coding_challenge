// Event DB service to perform DB operations on events
import {getDBConnection} from "../../../database";
const db = getDBConnection();

// Get events db service to get the events
export async function getEvents(limit: number, skip: number, from?: number, until?: number) {
    console.log("inside the getEvents DB service");
    let query = `SELECT e.rowid, e.name,e.location,e.date,e.is_outside,
        e.attendees, e.organizer, o.organizer_name FROM event e 
        JOIN organizers o ON e.organizer = o.rowid 
        WHERE date >= ${from}`;
    if(until) {
        query = query + ` AND date <= ${until}`;
    }
    query = query + ` LIMIT ${limit} OFFSET ${skip}`
    return new Promise((resolve, reject) => {
        db.all(query, (err: any, data: any) => {
            if(err) {
                return reject(err);
            } else {
                console.log("data : ", data);
                return resolve(data);
            }
        });    
    })
}
// Get event by id db service to get the event
export async function getEventByID(id:number) {
    console.log("inside the getEventBYID DB service");
    let query = `SELECT e.rowid, e.name,e.location,e.date,
        e.is_outside,e.attendees,e.organizer,e.weather, o.organizer_name FROM event e 
        JOIN organizers o ON e.organizer = o.rowid 
        WHERE e.rowid = ${id}`;
    
    return new Promise((resolve, reject) => {
        db.all(query, (err: any, data: any) => {
            if(err) {
                return reject(err);
            } else {
                console.log("data : ", data);
                return resolve(data);
            }
        });    
    })
}