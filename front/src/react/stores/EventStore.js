import Reflux from 'reflux';
import EventActions from '../actions/EventActions';
import Api from '../libs/Api';
import AppConfig from '../../AppConfig';

const EventStore = Reflux.createStore({

    listenables: EventActions,

    init() {
        this.api = new Api(AppConfig.API_URL);
    },

    async onGet(eventId) {
        if (this.loading) {
            return true;
        }

        this._loading();
        const data = eventId ? await this.api.getEvent(eventId) : await await this.api.getEvents();
        this._loading(false);

        if (data && data.length) {
            eventId ? this.trigger(data, 'event') : this.trigger(data, 'events');
            this.trigger(true, "mustLoadEvents");
        } else {
            console.log("error! " + data);
        }
        return true;
    },

    async onCreate(event, events) {
        if (this.loading) {
            return true;
        }

        delete event.id;

        this._loading();
        const data = await this.api.postEvent(event);
        this._loading(false);

        if (data && data.id) {
            events.push(data);
            this.trigger(events, 'events');
            this.trigger(true, "mustLoadEvents");
        } else {
            console.log("error! " + data);
        }
        return true;
    },

    async onEdit(event, events) {
        if (this.loading) {
            return true;
        }

        this._loading();
        const data = await this.api.editEvent(event);
        this._loading(false);

        if (data && data.id) {
            events = events.filter((someEvent) => someEvent.id !== event.id);
            events.push(data);
            this.trigger(events, 'events');
            this.trigger(true, "mustLoadEvents");
        } else {
            console.log("error! " + data);
        }
        return true;
    },

    async onDelete(eventId, events) {
        if (this.loading) {
            return true;
        }

        this._loading();
        const data = await this.api.removeEvent(eventId);
        this._loading(false);

        if (data && data.id) {
            events = events.filter((someEvent) => someEvent.id !== eventId);
            this.trigger(events, 'events');
            this.trigger(true, "mustLoadEvents");
        } else {
            console.log("error! " + data);
        }
        return true;
    },

    _loading(status = true) {
        this.loading = status;
        this.trigger(this.loading, 'loading');
    }
});

export default EventStore;
