export class EventController {

    constructor(eventManager) {
        eventManager.on('/events', this.handleEvent.bind(this))
        this.eventManager = eventManager
    }

    async handleEvent({ res }) {
        const events = await this.eventManager.eventStore.getAll()
        res.end(JSON.stringify(events))
    }
    
}