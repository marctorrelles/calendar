import Request from './Request';

class Api {

    constructor(base_url) {
        this.req = new Request(base_url);
    }

    // Unused at the moment
    async getEvent(eventId) {
        const data = await this.req.get('events/' + eventId, {});
        return data;
    }

    async getEvents() {
        const data = await this.req.get('events', null);
        return data;
    }

    async postEvent(event) {
        const data = await this.req.post('events', event);
        return data;
    }

    async editEvent(event) {
        const data = await this.req.put('events/' + event.id, event);
        return data;
    }

    async removeEvent(eventId) {
        const data = await this.req.delete('events/' + eventId, null);
        return data;
    }
}

export { Api as default };
