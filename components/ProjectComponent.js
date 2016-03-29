/**
 * Created by rplees on 3/8/16.
 */
const React = require('react-native');
const Platform = require('Platform');
const Colors = require('../common/Colors');
const OSCService = require('../service/OSCService');
const ScrollableTabView = require('react-native-scrollable-tab-view');
const ProjectCategoryComponent = require('../components/ProjectCategoryComponent');

const {
    View,
    } = React;

const ProjectComponent = React.createClass({
    render() {
        let paddingTop = 64;
        if (Platform.OS == 'android') {
            paddingTop = 0;
        }
        return (
            <View style={{backgroundColor: Colors.white, paddingTop: paddingTop, flex:1, marginBottom: 49,}}>
                <ScrollableTabView>
                    <ProjectCategoryComponent tabLabel="推荐" category="featured" navigator={this.props.navigator}/>
                    <ProjectCategoryComponent tabLabel="热门" category="popular" navigator={this.props.navigator}/>
                    <ProjectCategoryComponent tabLabel="最新更新" category="latest" navigator={this.props.navigator}/>
                </ScrollableTabView>
            </View>
        );
    }
});
module.exports = ProjectComponent;