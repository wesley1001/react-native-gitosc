/**
 * Created by rplees on 3/8/16.
 */
const React = require('react-native');
const Platform = require('Platform');
const Colors = require('../common/Colors');
const DXRNUtils = require('../common/DXRNUtils');
const Utils = require('../common/Utils');
const L = require('../common/Log');
const Icon = require('react-native-vector-icons/Ionicons');
const OSCService = require('../service/OSCService');

const TABIDS = ['feed', 'watching', 'trend', 'personal'];
const {
    NavigatorIOS,
    Text,
    TabBarIOS
    } = React;

const RootTab = React.createClass({
    getInitialState() {
        return {
            selectedTab:TABIDS[0],
        }
    },

    render() {
        let cp = TABIDS.map((v, i) =>
            <Icon.TabBarItem
                key={'iconTabBarItem_' + v}
                iconName="ios-home-outline"
                selectedIconName="ios-home"
                title={v}
                selected={this.state.selectedTab === v}
                onPress={() => {
                        this.setState({
                          selectedTab: v,
                        });
                      }} >
                <Text> </Text>
            </Icon.TabBarItem>
        );

        return ( <TabBarIOS> {cp}  </TabBarIOS> )
    }
});
module.exports = RootTab;