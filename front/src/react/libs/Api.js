import Request from './Request';

class Api {

    constructor(base_url) {
        this.base_url = base_url;
        this.req = new Request(base_url);

    }

    async getEvent(eventId) {
        const data = await this.req.get('events/' + eventId, {}, {});
        return data;
    }

    async getEvents() {
        const data = await this.req.get('events', null, {});
        return data;
    }

}

export { Api as default };
