/**
 * Created by rplees on 3/8/16.
 */
const React = require('react-native');
const OSCService = require('../service/OSCService');
const OSCRefreshListView = require('../components/OSCRefreshListView');
const EventCell = require('../components/EventCell');

const PersonalEventComponent = React.createClass({
    reloadPath(page = 1) {
        if(this.props.uId === OSCService.GLOBAL_USER.id) {
            return OSCService.getMyEvents(page);
        } else {
            return OSCService.getPersonalEvents(this.props.uId, page);
        }
    },

    renderRow(rowData, sectionID, rowID, highlightRow) {
        return (
            <EventCell key={rowID} event={rowData} navigator={this.props.navigator}/>
        )
    },

    render() {
        return (
            <OSCRefreshListView renderRow={this.renderRow}
                                reloadPromise={(page) => this.reloadPath(page)}
            />
        );
    },
});

module.exports = PersonalEventComponent;