/**
 * Created by rplees on 3/8/16.
 */
const React = require('react-native');
const Platform = require('Platform');
const Colors = require('../common/Colors');
const DXRNUtils = require('../common/DXRNUtils');
const OSCService = require('../service/OSCService');
const OSCRefreshListView = require('../components/OSCRefreshListView');
const RepoCell = require('../components/RepoCell');
const RepoCell2 = require('../components/RepoCell2');

const {
    View,
    Text,
    } = React;

const ProjectCategoryComponent = React.createClass({
    reloadPath(page = 1) {
        var p = this.props.category? this.props.category: "featured";
        if(p === "featured") {
            return OSCService.getExploreFeaturedProjectPath(page);
        } else if(p === "popular") {
            return OSCService.getExplorePopularProjectPath(page);
        } else if(p === "latest") {
            return OSCService.getExploreLatestProjectPath(page);
        }
    },

    renderRow(rowData, sectionID, rowID, highlightRow) {
        return (
            <RepoCell2 key={rowID} repo={rowData} navigator={this.props.navigator}/>
        )
    },

    render() {
        return (
            <OSCRefreshListView renderRow={this.renderRow}
                                reloadPromise={(page) => OSCService.fetchPromise(this.reloadPath(page))}
            />
        );
    },
});

module.exports = ProjectCategoryComponent;