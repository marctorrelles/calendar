import Reflux from 'reflux';
import EventActions from '../actions/EventActions';
import Api from '../libs/Api';

const EventStore = Reflux.createStore({

    listenables: EventActions,

    init() {
        this.api = new Api('http://localhost:8000');
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