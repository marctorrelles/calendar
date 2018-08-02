import Reflux from 'reflux';

const EventActions = Reflux.createActions([
    'get',
    'create',
    'edit',
    'delete'
]);

export default EventActions;