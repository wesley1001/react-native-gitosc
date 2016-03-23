/**
 * Created by rplees on 3/8/16.
 */
const React = require('react-native');
const Colors = require('../common/Colors');
const L = require('../utils/Log');
const OSCService = require('../service/OSCService');
const OSCRefreshListView = require('../components/OSCRefreshListView');
const RepoCell2 = require('../components/repo/RepoCell2');

const ProjectCategoryComponent = React.createClass({
    reloadPath(page = 1) {
        var p = this.props.category? this.props.category: "featured";
        if(p === "featured") {
            return OSCService.getExploreFeaturedProject(page);
        } else if(p === "popular") {
            return OSCService.getExplorePopularProject(page);
        } else if(p === "latest") {
            return OSCService.getExploreLatestProject(page);
        } else {
            L.error("ProjectCategoryComponent.reloadPath不支持的属性category:{}", this.props.category);
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
                                reloadPromise={(page) => this.reloadPath(page)}
            />
        );
    },
});

module.exports = ProjectCategoryComponent;