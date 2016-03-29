/**
 * Created by rplees on 3/8/16.
 */
const React = require('react-native');
const OSCService = require('../service/OSCService');
const OSCRefreshListView = require('../components/OSCRefreshListView');
const RepoCell2 = require('../components/repo/RepoCell2');

const PersonalStarComponent = React.createClass({
    reloadPath(page = 1) {
        return OSCService.getPersonalStarProjects(this.props.uId, page);
    },

    renderRow(rowData, sectionID, rowID, highlightRow) {
        return (
            <RepoCell2 key={rowID} repo={rowData} navigator={this.props.navigator}/>
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

module.exports = PersonalStarComponent;