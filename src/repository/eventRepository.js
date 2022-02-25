import {db} from "./init"
import {addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, where} from 'firebase/firestore/lite';

const EVENT_COLLECTION_NAME = "events"
const collectionRef = collection(db, EVENT_COLLECTION_NAME)


class EventRepository {

    constructor(collection) {
        this.collection = collection
    }

    async getAllEvents() {
        return await this.#getEventsWithQuery(this.collection)
    }

    async getEventsFromDate(fromDate) {
        const q = query(this.collection, where("timestamp", ">", fromDate))
        return await this.#getEventsWithQuery(q)
    }

    async getEventsToDate(toDate) {
        const q = query(this.collection, where("timestamp", "<", toDate))
        return await this.#getEventsWithQuery(q)
    }

    async getEventsFromToDate(fromDate, toDate) {
        const q = query(this.collection, where("timestamp", "<", toDate), where("timestamp", ">", fromDate))
        return await this.#getEventsWithQuery(q)
    }

    async #getEventsWithQuery(q) {
        const events = []
        await getDocs(q)
            .then(querySnapshot => querySnapshot.forEach(doc => events.push({id: doc.id, ...doc.data()})))
        return events.map(event => ({
            ...event,
            start: new Date(event.start.seconds * 1000),
            end: new Date(event.end.seconds * 1000)
        }))
    }

    async addEvent(event) {
        event = {
            ...event,
            operationTimestamp: new Date()
        }
        console.log("xd", this)
        await addDoc(this.collection, event)
    }

    async updateEvent(updatedEvent) {
        updatedEvent = {
            ...updatedEvent,
            operationTimestamp: new Date()
        }
        const ref = doc(db, EVENT_COLLECTION_NAME, updatedEvent.id)
        await setDoc(ref, updatedEvent, {merge: true})
    }

    async deleteEvent(event) {
        const ref = doc(db, EVENT_COLLECTION_NAME, event.id)
        await deleteDoc(ref)
    }
}

export const eventsRepository = new EventRepository(collectionRef)
