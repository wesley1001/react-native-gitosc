/**
 * Created by rplees on 3/8/16.
 */
const React = require('react-native');
const Platform = require('Platform');
const Colors = require('../common/Colors');
const DXRNUtils = require('../common/DXRNUtils');
const Utils = require('../common/Utils');
const OSCService = require('../service/OSCService');
const ScrollableTabView = require('react-native-scrollable-tab-view');
const ProjectCategoryComponent = require('./ProjectCategoryComponent');

const {
    View,
    Text,
    } = React;

const ProjectComponent = React.createClass({
    render() {
        let paddingTop = 64;
        if (Platform.OS == 'android') {
            paddingTop = 0;
        }
        return (
            <View style={{backgroundColor: Colors.white, paddingTop: paddingTop, flex:1}}>
                <ScrollableTabView>
                    <ProjectCategoryComponent tabLabel="推荐" category="featured"/>
                    <ProjectCategoryComponent tabLabel="热门" category="popular" />
                    <ProjectCategoryComponent tabLabel="最新更新" category="latest" />
                </ScrollableTabView>
            </View>
        );
    }
});
module.exports = ProjectComponent;